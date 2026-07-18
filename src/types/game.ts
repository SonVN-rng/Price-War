export type Action = 'KEEP_PRICE' | 'PROMOTION' | 'PRICE_WAR';

export type BotPersonality = 'NAIVE' | 'AGGRESSIVE' | 'TIT_FOR_TAT' | 'RANDOM' | 'GRUDGER';

export type GameLanguage = 'en' | 'vi';

export type GameStatus = 'START_SCREEN' | 'PLAYING' | 'EVENT' | 'GAME_OVER';

export type AnimationState = 'IDLE' | 'COOPERATION' | 'PLAYER_BETRAY' | 'BOT_BETRAY' | 'MUTUAL_DESTRUCTION' | 'EVENT_RESULT' | 'OLIGOPOLY_COOP' | 'OLIGOPOLY_WAR' | 'OLIGOPOLY_CHAOS';

export interface BilingualText {
  en: string;
  vi: string;
}

export interface KarmaRisk {
  probability: number;
  penalty: number;
  botReward?: number;
  message: BilingualText;
}

export interface EventEffect {
  playerMoneyDelta: number;
  botMoneyDelta: number;
}

export interface EventChoice {
  id: string;
  text: BilingualText;
  effect: EventEffect;
  outcome?: BilingualText;
  triggerOligopoly?: boolean;
  karmaRisk?: KarmaRisk;
}

export interface RandomEvent {
  id: string;
  title: BilingualText;
  description: BilingualText;
  choices: EventChoice[];
}

export interface GameSettings {
  maxTurns: number;
  timerSeconds: number;
  language: GameLanguage;
  startingMoney: number;
}

export interface TurnResult {
  turn: number;
  playerAction: Action;
  botAction?: Action;
  bot2Action?: Action;
  playerProfit: number;
  botProfit: number;
  bot2Profit?: number;
  playerTotal: number;
  botTotal: number;
  bot2Total?: number;
  reportKey: string;
  eventSummary?: BilingualText;
}

export interface GameState {
  status: GameStatus;
  turn: number;
  playerMoney: number;
  botMoney: number;
  bot2Money?: number;
  isOligopoly?: boolean;
  history: TurnResult[];
  botPersonality: BotPersonality;
  bot2Personality?: BotPersonality;
  settings: GameSettings;
  animationState: AnimationState;
  currentEvent?: RandomEvent;
  lastEventDelta?: { player: number; bot: number; bot2?: number };
  pendingKarma?: KarmaRisk;
}

export interface Payoff {
  player: number;
  bot: number;
}
