import React from 'react';
import { GameState } from '../types/game';
import { en } from '../i18n/en';
import { vi } from '../i18n/vi';
import { Trophy, RefreshCcw, Skull, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  gameState: GameState;
  onRestart: () => void;
}

export const WinnerScreen: React.FC<Props> = ({ gameState, onRestart }) => {
  const t = gameState.settings.language === 'en' ? en : vi;
  const pMoney = gameState.playerMoney;
  const bMoney = gameState.botMoney;
  const b2Money = gameState.bot2Money || -Infinity;
  const isOligopoly = gameState.isOligopoly;
  
  let winnerText = "";
  let isDraw = false;
  let winnerColor = "";

  const maxMoney = isOligopoly ? Math.max(pMoney, bMoney, b2Money) : Math.max(pMoney, bMoney);

  if (pMoney <= 0 && bMoney <= 0 && (!isOligopoly || b2Money <= 0)) {
    winnerText = t.end.draw;
    isDraw = true;
    winnerColor = "text-cyber-red";
  } else if (pMoney === maxMoney && bMoney === maxMoney) {
    winnerText = t.end.draw;
    isDraw = true;
    winnerColor = "text-cyber-blue";
  } else if (pMoney === maxMoney) {
    winnerText = t.end.playerWin;
    winnerColor = "text-cyber-green";
  } else if (bMoney === maxMoney) {
    winnerText = t.end.botWin;
    winnerColor = "text-cyber-orange";
  } else if (b2Money === maxMoney) {
    winnerText = "OMEGA_CORP WINS!";
    winnerColor = "text-purple-400";
  } else {
    winnerText = t.end.draw;
    isDraw = true;
    winnerColor = "text-cyber-blue";
  }

  // Calculate Stats
  const totalTurns = gameState.history.length;
  const coopCount = gameState.history.filter(h => h.playerAction === 'KEEP_PRICE').length;
  const promoCount = gameState.history.filter(h => h.playerAction === 'PROMOTION').length;
  const warCount = gameState.history.filter(h => h.playerAction === 'PRICE_WAR').length;
  
  const maxProfit = Math.max(0, ...gameState.history.map(h => h.playerProfit));
  const maxLoss = Math.min(0, ...gameState.history.map(h => h.playerProfit));

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-cyber-dark/90 backdrop-blur-sm p-4 overflow-y-auto">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-panel max-w-2xl w-full p-8 relative overflow-hidden my-8"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-blue to-transparent"></div>
        
        <div className="text-center mb-8">
          {isDraw ? (
            <Skull className="w-16 h-16 mx-auto mb-4 text-cyber-red" />
          ) : (
            <Trophy className={`w-16 h-16 mx-auto mb-4 ${winnerColor}`} />
          )}
          <h2 className="text-sm tracking-widest text-cyber-blue/70 mb-2">{t.end.winner}</h2>
          <h1 className={`text-4xl font-bold ${winnerColor}`}>{winnerText}</h1>
        </div>

        <div className={`grid ${isOligopoly ? 'grid-cols-3' : 'grid-cols-2'} gap-4 mb-8`}>
          <div className="glass-panel p-4 text-center border-cyber-green/30">
            <div className="text-xs text-cyber-green/70 mb-1">{t.end.playerWin}</div>
            <div className={`text-2xl md:text-3xl font-bold text-cyber-green`}>${pMoney}M</div>
          </div>
          <div className="glass-panel p-4 text-center border-cyber-orange/30">
            <div className="text-xs text-cyber-orange/70 mb-1">{t.end.botWin}</div>
            <div className={`text-2xl md:text-3xl font-bold text-cyber-orange`}>${bMoney}M</div>
          </div>
          {isOligopoly && (
            <div className="glass-panel p-4 text-center border-purple-400/30">
              <div className="text-xs text-purple-400/70 mb-1">OMEGA_CORP</div>
              <div className={`text-2xl md:text-3xl font-bold text-purple-400`}>${gameState.bot2Money}M</div>
            </div>
          )}
        </div>

        <div className="glass-panel p-6 mb-8 border-cyber-border/30 bg-cyber-panel/50">
          <div className="flex items-center gap-2 text-cyber-blue mb-4">
            <BarChart2 className="w-5 h-5" />
            <h3 className="font-bold tracking-widest uppercase">{t.end.stats}</h3>
          </div>
          <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm font-mono">
            <div className="flex justify-between">
              <span className="text-gray-400">{t.end.coopRate}:</span>
              <span className="text-cyber-green">{Math.round((coopCount/totalTurns)*100 || 0)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{t.end.maxProfit}:</span>
              <span className="text-cyber-green">+{maxProfit}M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{t.end.promoRate}:</span>
              <span className="text-cyber-blue">{Math.round((promoCount/totalTurns)*100 || 0)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{t.end.maxLoss}:</span>
              <span className="text-cyber-red">{maxLoss}M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{t.end.warRate}:</span>
              <span className="text-cyber-red">{Math.round((warCount/totalTurns)*100 || 0)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{t.end.botRevealed}:</span>
              <span className="text-cyber-orange font-bold">{gameState.botPersonality}</span>
            </div>
          </div>
        </div>

        <button 
          onClick={onRestart}
          className="w-full py-4 bg-cyber-blue/10 hover:bg-cyber-blue/20 border border-cyber-blue rounded-md text-cyber-blue font-bold tracking-widest flex justify-center items-center gap-2 transition-all group"
        >
          <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          {t.end.restart}
        </button>
      </motion.div>
    </div>
  );
};
