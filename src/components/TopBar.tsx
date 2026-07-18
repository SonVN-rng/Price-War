import React, { useState } from 'react';
import { GameState } from '../types/game';
import { en } from '../i18n/en';
import { vi } from '../i18n/vi';
import { Shield, Cpu, Activity, Clock, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { audio } from '../utils/audio';

interface Props {
  gameState: GameState;
  timeLeft: number;
}

export const TopBar: React.FC<Props> = ({ gameState, timeLeft }) => {
  const [isMuted, setIsMuted] = useState(audio.isMuted);

  const toggleMute = () => {
    setIsMuted(audio.toggleMute());
  };
  const t = gameState.settings.language === 'en' ? en : vi;
  
  const pMoneyColor = gameState.playerMoney > 0 ? 'text-cyber-green text-glow-green' : 'text-cyber-red text-glow-red';
  const bMoneyColor = gameState.botMoney > 0 ? 'text-cyber-orange text-glow-orange' : 'text-cyber-red text-glow-red';
  const isTimeCritical = timeLeft <= 5;

  const b2MoneyColor = (gameState.bot2Money || 0) > 0 ? 'text-purple-400 text-glow-purple' : 'text-cyber-red text-glow-red';

  return (
    <div className="glass-panel p-4 flex flex-col gap-4 mb-4 relative w-full">
      {/* Mute Button */}
      <button 
        onClick={toggleMute}
        className="absolute top-4 left-4 md:-left-12 text-gray-500 hover:text-cyber-blue transition-colors"
        title="Toggle Music"
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>

      {/* Top Row: Info */}
      <div className="flex flex-col items-center justify-center border-b border-cyber-border/30 pb-4">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-xs text-cyber-blue/70 tracking-widest mb-1">{t.game.turn}</div>
            <div className="text-xl font-bold text-glow-blue text-cyber-blue">
              {gameState.turn} / {gameState.settings.maxTurns}
            </div>
          </div>
          <div className="text-center">
            <div className={`text-xs tracking-widest mb-1 ${isTimeCritical ? 'text-cyber-red animate-pulse' : 'text-cyber-blue/70'}`}>
              <Clock className="w-3 h-3 inline mr-1" />{t.game.timer}
            </div>
            <div className={`text-3xl font-bold ${isTimeCritical ? 'text-cyber-red text-glow-red scale-110 animate-pulse' : 'text-glow-blue text-cyber-blue'}`}>
              {timeLeft}s
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Stats */}
      <div className="flex flex-row justify-between w-full items-center">
        {/* Player Stats */}
        <div className="flex-1 flex flex-col items-start">
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-1 tracking-widest">
            <Shield className="w-4 h-4 text-cyber-green" /> {t.game.playerMoney}
          </div>
          <AnimatePresence mode="popLayout">
            <motion.div 
              key={gameState.playerMoney}
              initial={{ scale: 1.5, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className={`text-2xl md:text-3xl font-bold ${pMoneyColor}`}
            >
              ${gameState.playerMoney.toLocaleString()}M
            </motion.div>
          </AnimatePresence>
        </div>

        {/* OMEGA_CORP Stats (If Oligopoly) */}
        {gameState.isOligopoly && gameState.bot2Money !== undefined && (
          <div className="flex-1 flex flex-col items-center border-l border-r border-cyber-border/30 px-2">
            <div className="flex items-center gap-2 text-gray-400 text-xs mb-1 tracking-widest">
              OMEGA_CORP <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <AnimatePresence mode="popLayout">
              <motion.div 
                key={gameState.bot2Money}
                initial={{ scale: 1.5, opacity: 0, y: -20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className={`text-2xl md:text-3xl font-bold ${b2MoneyColor}`}
              >
                ${gameState.bot2Money.toLocaleString()}M
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Bot Stats */}
        <div className="flex-1 flex flex-col items-end">
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-1 tracking-widest">
            {t.game.botMoney} <Cpu className="w-4 h-4 text-cyber-orange" />
          </div>
          <AnimatePresence mode="popLayout">
            <motion.div 
              key={gameState.botMoney}
              initial={{ scale: 1.5, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className={`text-2xl md:text-3xl font-bold ${bMoneyColor}`}
            >
              ${gameState.botMoney.toLocaleString()}M
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
