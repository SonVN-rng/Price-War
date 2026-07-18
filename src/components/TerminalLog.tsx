import React, { useEffect, useState } from 'react';
import { GameState } from '../types/game';
import { en } from '../i18n/en';
import { vi } from '../i18n/vi';
import { TerminalSquare, Handshake, Swords, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  gameState: GameState;
}

export const TerminalLog: React.FC<Props> = ({ gameState }) => {
  const t = gameState.settings.language === 'en' ? en : vi;
  const history = gameState.history;
  const lastEvent = history.length > 0 ? history[history.length - 1] : null;
  
  let reportText = "SYSTEM READY. WAITING FOR INPUT...";
  if (lastEvent) {
    const pActionName = (t.game.actions as any)[lastEvent.playerAction];
    const bActionName = lastEvent.botAction ? (t.game.actions as any)[lastEvent.botAction] : 'OFFLINE - BANKRUPT';
    let flavorText = (t.reports as any)[lastEvent.reportKey];
    
    reportText = `[CORP_X]: ${pActionName}\n[NEO_CORP]: ${bActionName}`;
    if (gameState.isOligopoly) {
      if (lastEvent.bot2Total !== undefined) {
        const b2ActionName = lastEvent.bot2Action ? (t.game.actions as any)[lastEvent.bot2Action] : 'OFFLINE - BANKRUPT';
        reportText += `\n[OMEGA_CORP]: ${b2ActionName}`;
        
        const actions = [lastEvent.playerAction, lastEvent.botAction, lastEvent.bot2Action].filter(Boolean);
        const wars = actions.filter(a => a === 'PRICE_WAR').length;
        
        if (actions.length === 3) {
          if (wars === 3) {
            flavorText = gameState.settings.language === 'en' ? "MUTUAL DESTRUCTION: All 3 corps entered a price war. Market collapses!" : "HỦY DIỆT LẪN NHAU: Cả 3 công ty đều giảm giá sốc. Thị trường sụp đổ!";
          } else if (wars === 2) {
            flavorText = gameState.settings.language === 'en' ? "HEAVY CROSSFIRE: Two corps are dragging the market down." : "GIAO TRANH ÁC LIỆT: Hai tập đoàn đang kéo cả thị trường đi xuống.";
          } else {
            flavorText = gameState.settings.language === 'en' ? "3-WAY MARKET CHAOS: OMEGA_Corp's presence creates unpredictable ripples." : "HỖN LOẠN 3 BÊN: Sự can thiệp của OMEGA_Corp tạo ra những biến động khó lường.";
          }
        } else if (actions.length === 2) {
          const normalFlavor = (t.reports as any)[lastEvent.reportKey];
          if (!lastEvent.botAction) {
             flavorText = gameState.settings.language === 'en' 
                ? `[NEO_Corp Eliminated - Duel vs OMEGA_Corp]\n${normalFlavor}`
                : `[NEO_Corp Đã Phá Sản - Quyết chiến với OMEGA_Corp]\n${normalFlavor}`;
          } else if (!lastEvent.bot2Action) {
             flavorText = gameState.settings.language === 'en'
                ? `[OMEGA_Corp Eliminated - Duel vs NEO_Corp]\n${normalFlavor}`
                : `[OMEGA_Corp Đã Phá Sản - Trở lại đấu với NEO_Corp]\n${normalFlavor}`;
          }
        }
      } else {
        reportText += `\n[OMEGA_CORP]: SYSTEM INITIALIZING...`;
      }
    }
    
    reportText += `\n\n>> ${flavorText}`;
    
    if (lastEvent.eventSummary) {
      const eventText = lastEvent.eventSummary[gameState.settings.language];
      reportText += `\n\n[!] ${eventText}`;
    }
  }

  const [displayedText, setDisplayedText] = useState('');
  
  // Typewriter effect
  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const interval = setInterval(() => {
      if (i < reportText.length) {
        const nextChar = reportText.charAt(i);
        setDisplayedText(prev => prev + nextChar);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [reportText]);

  // Effects based on state
  let effectClass = "";
  if (gameState.animationState === 'MUTUAL_DESTRUCTION' || gameState.animationState === 'OLIGOPOLY_WAR') {
    effectClass = "animate-glitch text-cyber-red text-glow-red border-cyber-red bg-cyber-red/10";
  } else if (gameState.animationState === 'PLAYER_BETRAY' || gameState.animationState === 'BOT_BETRAY' || gameState.animationState === 'OLIGOPOLY_CHAOS') {
    effectClass = "border-cyber-orange bg-cyber-orange/10 text-cyber-orange";
  } else if (gameState.animationState === 'COOPERATION' || gameState.animationState === 'OLIGOPOLY_COOP') {
    effectClass = "border-cyber-green bg-cyber-green/10 text-cyber-green text-glow-green shadow-[0_0_20px_rgba(57,255,20,0.2)]";
  }

  // Icon Overlay rendering
  const renderIconOverlay = () => {
    if (gameState.animationState === 'IDLE') return null;

    let IconComponent = null;
    let iconColor = '';
    let animationProps = {};

    if (gameState.animationState === 'COOPERATION' || gameState.animationState === 'OLIGOPOLY_COOP') {
      IconComponent = Handshake;
      iconColor = 'text-cyber-green text-glow-green';
      animationProps = {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: [1, 1.2, 1], opacity: [0, 1, 0] },
        transition: { duration: 1.5, ease: 'easeInOut' }
      };
    } else if (gameState.animationState === 'PLAYER_BETRAY' || gameState.animationState === 'BOT_BETRAY' || gameState.animationState === 'OLIGOPOLY_CHAOS') {
      IconComponent = Swords;
      iconColor = 'text-cyber-orange text-glow-orange';
      animationProps = {
        initial: { scale: 3, opacity: 0, rotate: -45, x: -100 },
        animate: { scale: 1, opacity: [0, 1, 0], rotate: 0, x: 0 },
        transition: { duration: 0.8, ease: 'easeOut' }
      };
    } else if (gameState.animationState === 'MUTUAL_DESTRUCTION' || gameState.animationState === 'OLIGOPOLY_WAR') {
      IconComponent = Flame;
      iconColor = 'text-cyber-red text-glow-red';
      animationProps = {
        initial: { scale: 0.5, opacity: 0 },
        animate: { scale: [1, 2.5, 2], opacity: [0, 1, 0], rotate: [0, -10, 10, -10, 10, 0] },
        transition: { duration: 1, ease: 'backOut' }
      };
    }

    if (!IconComponent) return null;

    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <motion.div {...animationProps}>
          <IconComponent className={`w-48 h-48 ${iconColor} opacity-20`} />
        </motion.div>
      </div>
    );
  };

  return (
    <div className={`glass-panel p-4 flex-1 flex flex-col overflow-hidden transition-all duration-300 relative ${effectClass}`}>
      {renderIconOverlay()}
      
      <div className="flex items-center gap-2 text-cyber-blue/70 text-xs mb-4 uppercase tracking-widest border-b border-cyber-border/30 pb-2 z-20">
        <TerminalSquare className="w-4 h-4" />
        {t.game.terminal}
      </div>
      
      <div className="flex-1 overflow-y-auto font-mono text-sm leading-relaxed whitespace-pre-wrap">
        <AnimatePresence>
          <motion.div 
            key={gameState.turn}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={gameState.animationState === 'MUTUAL_DESTRUCTION' || gameState.animationState === 'OLIGOPOLY_WAR' ? 'text-cyber-red font-bold text-lg' : 'text-gray-300'}
          >
            <span className="text-cyber-blue mr-2">[{gameState.turn}] {'>'}</span> 
            {displayedText}
            <span className="animate-pulse bg-cyber-blue w-2 h-4 inline-block ml-1 align-middle"></span>
          </motion.div>
        </AnimatePresence>

        {/* Floating profit indicators */}
        {gameState.animationState !== 'IDLE' && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-10">
            {gameState.animationState === 'EVENT_RESULT' && gameState.lastEventDelta ? (
              <>
                <motion.div 
                  initial={{ y: 20, opacity: 0 }} 
                  animate={{ y: -20, opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className={`text-2xl font-bold ${gameState.lastEventDelta.player > 0 ? 'text-cyber-green' : 'text-cyber-red'}`}
                >
                  {gameState.lastEventDelta.player > 0 ? '+' : ''}{gameState.lastEventDelta.player}M
                </motion.div>
                {gameState.isOligopoly && gameState.lastEventDelta.bot2 !== undefined && (
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }} 
                    animate={{ y: -20, opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className={`text-2xl font-bold ${gameState.lastEventDelta.bot2 > 0 ? 'text-purple-400' : 'text-red-500'}`}
                  >
                    {gameState.lastEventDelta.bot2 > 0 ? '+' : ''}{gameState.lastEventDelta.bot2}M
                  </motion.div>
                )}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }} 
                  animate={{ y: -20, opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className={`text-2xl font-bold ${gameState.lastEventDelta.bot > 0 ? 'text-cyber-blue' : 'text-cyber-red'}`}
                >
                  {gameState.lastEventDelta.bot > 0 ? '+' : ''}{gameState.lastEventDelta.bot}M
                </motion.div>
              </>
            ) : lastEvent ? (
              <>
                <motion.div 
                  initial={{ y: 20, opacity: 0 }} 
                  animate={{ y: -20, opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className={`text-2xl font-bold ${lastEvent.playerProfit > 0 ? 'text-cyber-green' : 'text-cyber-red'}`}
                >
                  {lastEvent.playerProfit > 0 ? '+' : ''}{lastEvent.playerProfit}M
                </motion.div>
                {gameState.isOligopoly && lastEvent.bot2Profit !== undefined && (
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }} 
                    animate={{ y: -20, opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className={`text-2xl font-bold ${lastEvent.bot2Profit > 0 ? 'text-purple-400' : 'text-red-500'}`}
                  >
                    {lastEvent.bot2Profit > 0 ? '+' : ''}{lastEvent.bot2Profit}M
                  </motion.div>
                )}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }} 
                  animate={{ y: -20, opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className={`text-2xl font-bold ${lastEvent.botProfit > 0 ? 'text-cyber-blue' : 'text-cyber-red'}`}
                >
                  {lastEvent.botProfit > 0 ? '+' : ''}{lastEvent.botProfit}M
                </motion.div>
              </>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
