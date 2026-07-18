import { useState, useEffect, useCallback, useRef } from 'react';
import { Action, GameState, GameSettings, GameStatus } from '../types/game';
import { INITIAL_MONEY, PAYOFF_MATRIX } from '../constants/gameConfig';
import { getBotAction, getRandomBotPersonality, calculateOligopolyPayoff } from '../utils/botLogic';
import { audio } from '../utils/audio';
import { RANDOM_EVENTS } from '../constants/events';

const DEFAULT_SETTINGS: GameSettings = {
  maxTurns: 10,
  timerSeconds: 15,
  language: 'en',
  startingMoney: 1000
};

export const useGameEngine = () => {
  const [gameState, setGameState] = useState<GameState>({
    status: 'START_SCREEN',
    turn: 1,
    playerMoney: INITIAL_MONEY,
    botMoney: INITIAL_MONEY,
    history: [],
    botPersonality: 'NAIVE',
    settings: DEFAULT_SETTINGS,
    animationState: 'IDLE'
  });

  const [timeLeft, setTimeLeft] = useState(DEFAULT_SETTINGS.timerSeconds);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(gameState.settings.timerSeconds);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          audio.playAlarm();
          handleAction('PRICE_WAR', true);
          return 0;
        }
        if (prev <= 6) audio.playTick(); // Tick on last 5 seconds
        return prev - 1;
      });
    }, 1000);
  }, [gameState.settings.timerSeconds]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const startGame = (settings: GameSettings) => {
    audio.init();
    audio.playClick();
    audio.startBGM(); // Start music
    setGameState({
      status: 'PLAYING',
      turn: 1,
      playerMoney: settings.startingMoney || INITIAL_MONEY,
      botMoney: settings.startingMoney || INITIAL_MONEY,
      history: [],
      botPersonality: getRandomBotPersonality(),
      settings,
      animationState: 'IDLE'
    });
  };

  // Start timer when status is playing or turn changes
  useEffect(() => {
    if (gameState.status === 'PLAYING') {
      startTimer();
    } else if (gameState.status === 'GAME_OVER') {
      audio.stopBGM();
      const p = gameState.playerMoney;
      const b = gameState.botMoney;
      const b2 = gameState.bot2Money !== undefined ? gameState.bot2Money : -Infinity;
      
      const maxMoney = gameState.isOligopoly ? Math.max(p, b, b2) : Math.max(p, b);
      
      if (p <= 0 && b <= 0 && (!gameState.isOligopoly || b2 <= 0)) {
        audio.playResultBGM('draw');
      } else if (p === maxMoney && b === maxMoney) {
        audio.playResultBGM('draw');
      } else if (p === maxMoney) {
        audio.playResultBGM('win');
      } else if (b === maxMoney || b2 === maxMoney) {
        audio.playResultBGM('lose');
      } else {
        audio.playResultBGM('draw');
      }
    } else if (gameState.status === 'START_SCREEN') {
      audio.stopBGM();
    }
    return stopTimer;
  }, [gameState.status, gameState.turn, startTimer, stopTimer, gameState.playerMoney, gameState.botMoney]);

  // Adjust tension based on time left
  useEffect(() => {
    if (gameState.status === 'PLAYING') {
      audio.setBGMTension(timeLeft <= 5);
    }
  }, [timeLeft, gameState.status]);

  const determineReportKey = (pAction: Action, bAction?: Action, b2Action?: Action, isTimeout: boolean = false) => {
    if (isTimeout) return 'timeout';
    const effectiveBAction = bAction || b2Action || 'KEEP_PRICE';
    if (pAction === 'KEEP_PRICE' && effectiveBAction === 'KEEP_PRICE') return 'mutual_coop';
    if (pAction === 'PRICE_WAR' && effectiveBAction === 'PRICE_WAR') return 'mutual_war';
    if (pAction === 'PROMOTION' && effectiveBAction === 'PROMOTION') return 'player_promo_mutual';
    if (pAction !== 'KEEP_PRICE' && effectiveBAction === 'KEEP_PRICE') return 'player_steal';
    if (pAction === 'KEEP_PRICE' && effectiveBAction !== 'KEEP_PRICE') return 'bot_steal';
    return 'mutual_war'; // Fallback
  };

  const getAnimationState = (pAction: Action, bAction?: Action, b2Action?: Action) => {
    if (bAction && b2Action) {
      const actions = [pAction, bAction, b2Action];
      const wars = actions.filter(a => a === 'PRICE_WAR').length;
      const coops = actions.filter(a => a === 'KEEP_PRICE').length;
      
      if (wars === 3) return 'OLIGOPOLY_WAR';
      if (coops === 3) return 'OLIGOPOLY_COOP';
      return 'OLIGOPOLY_CHAOS';
    }

    const effectiveBAction = bAction || b2Action || 'KEEP_PRICE';

    if (pAction === 'KEEP_PRICE' && effectiveBAction === 'KEEP_PRICE') return 'COOPERATION';
    if (pAction === 'PRICE_WAR' && effectiveBAction === 'PRICE_WAR') return 'MUTUAL_DESTRUCTION';
    if (pAction !== 'KEEP_PRICE' && effectiveBAction === 'KEEP_PRICE') return 'PLAYER_BETRAY';
    if (pAction === 'KEEP_PRICE' && effectiveBAction !== 'KEEP_PRICE') return 'BOT_BETRAY';
    return 'IDLE';
  };

  const handleAction = useCallback((playerAction: Action, isTimeout = false) => {
    stopTimer();
    audio.playClick();

    setGameState((prev) => {
      const isBotAlive = prev.botMoney > 0;
      const isBot2Alive = prev.isOligopoly && prev.bot2Money !== undefined && prev.bot2Money > 0;

      let botAction: Action | undefined = undefined;
      if (isBotAlive) {
        botAction = getBotAction(prev.botPersonality, prev.turn, prev.history);
      }

      let newPlayerMoney = prev.playerMoney;
      let newBotMoney = prev.botMoney;
      let newBot2Money = prev.bot2Money;
      
      let pProfit = 0;
      let bProfit = 0;
      let b2Profit: number | undefined = undefined;
      let bot2Action: Action | undefined = undefined;

      if (prev.isOligopoly && isBotAlive && isBot2Alive && prev.bot2Personality && prev.bot2Money !== undefined) {
        bot2Action = getBotAction(prev.bot2Personality, prev.turn, prev.history);
        const payoffs = calculateOligopolyPayoff(playerAction, botAction!, bot2Action);
        pProfit = payoffs[0];
        bProfit = payoffs[1];
        b2Profit = payoffs[2];
      } else if (prev.isOligopoly && !isBotAlive && isBot2Alive && prev.bot2Personality && prev.bot2Money !== undefined) {
        bot2Action = getBotAction(prev.bot2Personality, prev.turn, prev.history);
        const payoff = PAYOFF_MATRIX[playerAction][bot2Action];
        pProfit = payoff.player;
        bProfit = 0;
        b2Profit = payoff.bot;
      } else if (prev.isOligopoly && isBotAlive && !isBot2Alive) {
        const payoff = PAYOFF_MATRIX[playerAction][botAction!];
        pProfit = payoff.player;
        bProfit = payoff.bot;
        b2Profit = 0;
      } else {
        // Normal 2-player or both bots dead (which ends game anyway)
        const effectiveBotAction = botAction || 'KEEP_PRICE';
        const payoff = PAYOFF_MATRIX[playerAction][effectiveBotAction];
        pProfit = payoff.player;
        bProfit = isBotAlive ? payoff.bot : 0;
      }

      newPlayerMoney += pProfit;
      if (isBotAlive) newBotMoney += bProfit;
      if (isBot2Alive && newBot2Money !== undefined && b2Profit !== undefined) newBot2Money += b2Profit;
      
      let karmaSummary: { en: string, vi: string } | undefined = undefined;
      if (prev.pendingKarma) {
        newPlayerMoney += prev.pendingKarma.penalty;
        if (prev.pendingKarma.botReward) {
          if (isBotAlive) newBotMoney += prev.pendingKarma.botReward;
          if (isBot2Alive && newBot2Money !== undefined) newBot2Money += prev.pendingKarma.botReward;
        }
        karmaSummary = {
          en: `[KARMA STRIKES] ${prev.pendingKarma.message.en} (Player: ${prev.pendingKarma.penalty}M${prev.pendingKarma.botReward ? `, Bots: +${prev.pendingKarma.botReward}M` : ''})`,
          vi: `[NGHIỆP QUẬT] ${prev.pendingKarma.message.vi} (Bạn: ${prev.pendingKarma.penalty}M${prev.pendingKarma.botReward ? `, Đối thủ: +${prev.pendingKarma.botReward}M` : ''})`
        };
        audio.playAlarm();
      }

      // Play Sound based on profit
      if (!prev.pendingKarma) {
        if (pProfit > 0) audio.playGain();
        else if (pProfit < 0) audio.playLoss();
        if (pProfit <= -100 && bProfit <= -100) audio.playAlarm(); // Mutual War/Destruction
      }

      const animState = getAnimationState(playerAction, botAction, bot2Action);

      const turnResult = {
        turn: prev.turn,
        playerAction,
        botAction,
        bot2Action,
        playerProfit: pProfit,
        botProfit: bProfit,
        bot2Profit: b2Profit,
        playerTotal: newPlayerMoney,
        botTotal: newBotMoney,
        bot2Total: newBot2Money,
        reportKey: determineReportKey(playerAction, botAction, bot2Action, isTimeout),
        eventSummary: karmaSummary
      };

      const botsDead = prev.isOligopoly 
          ? (newBotMoney <= 0 && newBot2Money !== undefined && newBot2Money <= 0)
          : newBotMoney <= 0;

      const isGameOver = prev.turn >= prev.settings.maxTurns || newPlayerMoney <= 0 || botsDead;

      // 15% chance to trigger oligopoly mid-game, 25% for regular events
      const canOligopoly = !prev.isOligopoly && prev.turn >= 4;
      const isOligopolyRoll = canOligopoly && Math.random() < 0.15;
      const shouldTriggerEvent = !isGameOver && (isOligopolyRoll || Math.random() < 0.25);
      
      let nextStatus = isGameOver ? 'GAME_OVER' : (shouldTriggerEvent ? 'EVENT' : 'PLAYING');
      let currentEvent = undefined;

      if (shouldTriggerEvent) {
        if (isOligopolyRoll) {
          currentEvent = RANDOM_EVENTS.find(e => e.id === 'e_oligopoly');
        } else {
          // exclude oligopoly from normal pool
          const normalEvents = RANDOM_EVENTS.filter(e => e.id !== 'e_oligopoly');
          currentEvent = normalEvents[Math.floor(Math.random() * normalEvents.length)];
        }
      }

      return {
        ...prev,
        status: nextStatus as GameStatus,
        turn: isGameOver ? prev.turn : prev.turn + 1,
        playerMoney: newPlayerMoney,
        botMoney: newBotMoney,
        bot2Money: newBot2Money,
        history: [...prev.history, turnResult],
        animationState: animState,
        currentEvent,
        pendingKarma: undefined
      };
    });

    // Reset animation state after 2 seconds
    setTimeout(() => {
      setGameState(prev => ({ ...prev, animationState: 'IDLE' }));
    }, 2000);

  }, [stopTimer]);

  const handleEventChoice = useCallback((choiceId: string) => {
    setGameState((prev) => {
      if (!prev.currentEvent || prev.status !== 'EVENT') return prev;
      
      const choice = prev.currentEvent.choices.find(c => c.id === choiceId);
      if (!choice) return prev;
      
      let newPlayerMoney = prev.playerMoney + choice.effect.playerMoneyDelta;
      let newBotMoney = prev.botMoney;
      if (prev.botMoney > 0) {
        newBotMoney += choice.effect.botMoneyDelta;
      }
      
      let isOligopoly = prev.isOligopoly;
      let bot2Money = prev.bot2Money;
      let bot2Personality = prev.bot2Personality;
      let settings = prev.settings;
      let bot2Delta = 0;
      
      let pendingKarma = prev.pendingKarma;
      if (choice.karmaRisk && Math.random() < choice.karmaRisk.probability) {
        pendingKarma = choice.karmaRisk;
      }

      if (choice.triggerOligopoly) {
        isOligopoly = true;
        bot2Money = 1000 + Math.floor(Math.random() * 2001); // 1000-3000
        bot2Personality = getRandomBotPersonality();
        settings = {
          ...prev.settings,
          maxTurns: prev.settings.maxTurns + Math.floor(Math.random() * 6) + 5 // +5 to +10 turns
        };
      } else if (isOligopoly && bot2Money !== undefined && bot2Money > 0) {
        bot2Delta = choice.effect.botMoneyDelta; // Apply bot's delta to OMEGA as well
        bot2Money += bot2Delta;
      }

      const botsDead = isOligopoly 
          ? (newBotMoney <= 0 && bot2Money !== undefined && bot2Money <= 0)
          : newBotMoney <= 0;

      const isGameOver = newPlayerMoney <= 0 || botsDead;
      
      // Log event summary to the last turn in history
      const history = [...prev.history];
      if (history.length > 0) {
        const enOutcome = choice.outcome ? `\n> ${choice.outcome.en}` : '';
        const viOutcome = choice.outcome ? `\n> ${choice.outcome.vi}` : '';
        
        history[history.length - 1] = {
          ...history[history.length - 1],
          eventSummary: {
            en: `Event: ${prev.currentEvent.title.en} -> ${choice.text.en} (P: ${choice.effect.playerMoneyDelta}, NEO: ${prev.botMoney > 0 ? choice.effect.botMoneyDelta : 0}${isOligopoly && !choice.triggerOligopoly ? `, OMEGA: ${bot2Money !== undefined && prev.bot2Money! > 0 ? bot2Delta : 0}` : ''})${enOutcome}`,
            vi: `Sự kiện: ${prev.currentEvent.title.vi} -> ${choice.text.vi} (Bạn: ${choice.effect.playerMoneyDelta}, NEO: ${prev.botMoney > 0 ? choice.effect.botMoneyDelta : 0}${isOligopoly && !choice.triggerOligopoly ? `, OMEGA: ${bot2Money !== undefined && prev.bot2Money! > 0 ? bot2Delta : 0}` : ''})${viOutcome}`
          }
        };
      }

      if (choice.effect.playerMoneyDelta > 0) audio.playGain();
      else if (choice.effect.playerMoneyDelta < 0) audio.playLoss();

      setTimeout(() => {
        setGameState(prev => ({ ...prev, animationState: 'IDLE' }));
      }, 2000);

      return {
        ...prev,
        status: isGameOver ? 'GAME_OVER' : 'PLAYING',
        playerMoney: newPlayerMoney,
        botMoney: newBotMoney,
        isOligopoly,
        bot2Money,
        bot2Personality,
        settings,
        currentEvent: undefined,
        history,
        animationState: 'EVENT_RESULT',
        lastEventDelta: {
          player: choice.effect.playerMoneyDelta,
          bot: prev.botMoney > 0 ? choice.effect.botMoneyDelta : 0,
          bot2: isOligopoly && prev.bot2Money !== undefined && prev.bot2Money > 0 ? bot2Delta : undefined
        },
        pendingKarma
      };
    });
  }, []);

  return {
    gameState,
    timeLeft,
    startGame,
    handleAction,
    handleEventChoice
  };
};
