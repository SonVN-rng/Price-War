export const en = {
  title: "PRICE WAR: THE PRISONER'S DILEMMA",
  settings: {
    start: "INITIALIZE SYSTEM",
    language: "LANGUAGE",
    turns: "TOTAL TURNS",
    timer: "TURN TIME (SEC)",
    startingMoney: "STARTING FUNDS ($M)",
  },
  game: {
    turn: "TURN",
    timer: "TIME REMAINING",
    playerMoney: "CORP_X ASSETS",
    botMoney: "NEO_CORP ASSETS",
    marketStatus: "MARKET STATUS",
    terminal: "SYS_LOG",
    history: "HISTORY",
    actions: {
      KEEP_PRICE: "KEEP PRICE",
      PROMOTION: "PROMOTION",
      PRICE_WAR: "PRICE WAR"
    },
    historyCols: {
      turn: "Trn",
      player: "You",
      bot: "Bot",
      pProfit: "Y.Profit",
      bProfit: "B.Profit",
      pTotal: "Y.Total",
      bTotal: "B.Total"
    }
  },
  reports: {
    mutual_coop: "Both companies kept prices high. Hidden collusion generated large profits.",
    player_steal: "Your promotion/war stole market share from NEO_Corp.",
    bot_steal: "NEO_Corp's aggressive pricing affected your market share.",
    mutual_war: "A destructive price war erupted. Both firms are bleeding. Customers shifted rapidly.",
    player_promo_mutual: "Both firms launched promotions. Market share remained stable with slight gains.",
    timeout: "Time expired. Auto-engaged PRICE WAR."
  },
  end: {
    winner: "WINNER",
    draw: "MUTUAL DESTRUCTION (DRAW)",
    playerWin: "CORP_X (YOU)",
    botWin: "NEO_CORP (AI)",
    finalAssets: "FINAL ASSETS",
    botRevealed: "NEO_CORP AI PROFILE",
    stats: "STATISTICS",
    coopRate: "Cooperation Rate",
    promoRate: "Promotion Rate",
    warRate: "Price War Rate",
    maxProfit: "Largest Single Profit",
    maxLoss: "Largest Single Loss",
    restart: "REBOOT SYSTEM"
  }
};
