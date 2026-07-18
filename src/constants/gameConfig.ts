import { Action, Payoff } from '../types/game';

export const INITIAL_MONEY = 1000; // $1,000M

export const PAYOFF_MATRIX: Record<Action, Record<Action, Payoff>> = {
  KEEP_PRICE: {
    KEEP_PRICE: { player: 50, bot: 50 },
    PROMOTION: { player: -20, bot: 70 },
    PRICE_WAR: { player: -50, bot: 30 },
  },
  PROMOTION: {
    KEEP_PRICE: { player: 70, bot: -20 },
    PROMOTION: { player: 20, bot: 20 },
    PRICE_WAR: { player: -30, bot: 10 },
  },
  PRICE_WAR: {
    KEEP_PRICE: { player: 30, bot: -50 },
    PROMOTION: { player: 10, bot: -30 },
    PRICE_WAR: { player: -40, bot: -40 },
  },
};
