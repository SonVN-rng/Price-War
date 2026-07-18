import React, { useEffect } from 'react';
import { Action, GameState } from '../types/game';
import { en } from '../i18n/en';
import { vi } from '../i18n/vi';
import { Handshake, TrendingUp, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  gameState: GameState;
  onAction: (action: Action) => void;
}

export const ActionPanel: React.FC<Props> = ({ gameState, onAction }) => {
  const t = gameState.settings.language === 'en' ? en : vi;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.status !== 'PLAYING') return;
      if (e.key === '1') onAction('KEEP_PRICE');
      if (e.key === '2') onAction('PROMOTION');
      if (e.key === '3') onAction('PRICE_WAR');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.status, onAction]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {/* Keep Price Button */}
      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onAction('KEEP_PRICE')}
        disabled={gameState.status !== 'PLAYING'}
        className="relative overflow-hidden group glass-panel p-6 border-cyber-green/50 hover:border-cyber-green transition-colors disabled:opacity-50"
      >
        <div className="absolute inset-0 bg-cyber-green/5 group-hover:bg-cyber-green/10 transition-colors"></div>
        <div className="relative flex flex-col items-center gap-3">
          <Handshake className="w-8 h-8 text-cyber-green group-hover:animate-pulse" />
          <div className="text-xl font-bold text-cyber-green tracking-widest uppercase">{t.game.actions.KEEP_PRICE}</div>
          <div className="text-xs text-cyber-green/50 font-mono">[1] KEY</div>
        </div>
      </motion.button>

      {/* Promotion Button */}
      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onAction('PROMOTION')}
        disabled={gameState.status !== 'PLAYING'}
        className="relative overflow-hidden group glass-panel p-6 border-cyber-blue/50 hover:border-cyber-blue transition-colors disabled:opacity-50"
      >
        <div className="absolute inset-0 bg-cyber-blue/5 group-hover:bg-cyber-blue/10 transition-colors"></div>
        <div className="relative flex flex-col items-center gap-3">
          <TrendingUp className="w-8 h-8 text-cyber-blue group-hover:animate-bounce" />
          <div className="text-xl font-bold text-cyber-blue tracking-widest uppercase">{t.game.actions.PROMOTION}</div>
          <div className="text-xs text-cyber-blue/50 font-mono">[2] KEY</div>
        </div>
      </motion.button>

      {/* Price War Button */}
      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onAction('PRICE_WAR')}
        disabled={gameState.status !== 'PLAYING'}
        className="relative overflow-hidden group glass-panel p-6 border-cyber-red/50 hover:border-cyber-red transition-colors disabled:opacity-50"
      >
        <div className="absolute inset-0 bg-cyber-red/5 group-hover:bg-cyber-red/10 transition-colors"></div>
        <div className="relative flex flex-col items-center gap-3">
          <Flame className="w-8 h-8 text-cyber-red group-hover:animate-pulse" />
          <div className="text-xl font-bold text-cyber-red tracking-widest uppercase">{t.game.actions.PRICE_WAR}</div>
          <div className="text-xs text-cyber-red/50 font-mono">[3] KEY</div>
        </div>
      </motion.button>
    </div>
  );
};
