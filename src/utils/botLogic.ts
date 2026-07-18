import { Action, BotPersonality, TurnResult } from '../types/game';

export const getBotAction = (
  personality: BotPersonality,
  currentTurn: number,
  history: TurnResult[]
): Action => {
  switch (personality) {
    case 'NAIVE':
      // Randomly choose KEEP_PRICE or PROMOTION, never PRICE_WAR
      return Math.random() > 0.5 ? 'KEEP_PRICE' : 'PROMOTION';

    case 'GRUDGER':
      // Starts cooperative. Always KEEP PRICE. 
      // If player ever chooses PRICE WAR, switch to PRICE WAR permanently.
      const playerEverWarred = history.some(h => h.playerAction === 'PRICE_WAR');
      if (playerEverWarred) {
        return 'PRICE_WAR';
      }
      return 'KEEP_PRICE';

    case 'TIT_FOR_TAT':
      // Turn 1 KEEP PRICE. From Turn 2 onward repeat exactly what player played in previous turn.
      if (currentTurn === 1 || history.length === 0) {
        return 'KEEP_PRICE';
      }
      return history[history.length - 1].playerAction;

    default:
      return 'KEEP_PRICE';
  }
};

export const getRandomBotPersonality = (): BotPersonality => {
  const personalities: BotPersonality[] = ['NAIVE', 'GRUDGER', 'TIT_FOR_TAT'];
  const randomIndex = Math.floor(Math.random() * personalities.length);
  return personalities[randomIndex];
};

export const calculateOligopolyPayoff = (a1: Action, a2: Action, a3: Action): [number, number, number] => {
  const actions = [a1, a2, a3];
  const numWar = actions.filter(a => a === 'PRICE_WAR').length;
  const numPromo = actions.filter(a => a === 'PROMOTION').length;
  const numKeep = actions.filter(a => a === 'KEEP_PRICE').length;

  const payoffs: [number, number, number] = [0, 0, 0];

  actions.forEach((a, i) => {
    if (numWar === 3) {
      // Severe punishment for 3-way price war
      payoffs[i] = -250;
    } else if (numWar === 2) {
      if (a === 'PRICE_WAR') payoffs[i] = -50;
      else if (a === 'PROMOTION') payoffs[i] = -100;
      else if (a === 'KEEP_PRICE') payoffs[i] = -200;
    } else if (numWar === 1) {
      if (numPromo === 2) {
        if (a === 'PRICE_WAR') payoffs[i] = 150;
        else payoffs[i] = -50;
      } else if (numPromo === 1 && numKeep === 1) {
        if (a === 'PRICE_WAR') payoffs[i] = 180;
        else if (a === 'PROMOTION') payoffs[i] = 30;
        else payoffs[i] = -150;
      } else if (numKeep === 2) {
        if (a === 'PRICE_WAR') payoffs[i] = 250;
        else payoffs[i] = -120;
      }
    } else if (numWar === 0) {
      if (numPromo === 3) payoffs[i] = 50;
      else if (numPromo === 2 && numKeep === 1) {
        if (a === 'PROMOTION') payoffs[i] = 90;
        else payoffs[i] = -50;
      } else if (numPromo === 1 && numKeep === 2) {
        if (a === 'PROMOTION') payoffs[i] = 150;
        else payoffs[i] = 0;
      } else if (numKeep === 3) {
        payoffs[i] = 100;
      }
    }
  });

  return payoffs;
};
