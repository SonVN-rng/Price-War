import React, { useState } from 'react';
import { GameSettings, GameLanguage } from '../types/game';
import { en } from '../i18n/en';
import { vi } from '../i18n/vi';
import { Terminal, Globe, Clock, Hash, Play, Wifi, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { audio } from '../utils/audio';

interface Props {
  onStart: (settings: GameSettings) => void;
}

export const StartScreen: React.FC<Props> = ({ onStart }) => {
  const [lang, setLang] = useState<GameLanguage>('en');
  const [turns, setTurns] = useState<number>(10);
  const [timer, setTimer] = useState<number>(15);
  const [startingMoney, setStartingMoney] = useState<number>(1000);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(audio.isMuted);

  const t = lang === 'en' ? en : vi;

  const handleConnect = () => {
    audio.init();
    audio.startMenuBGM();
    audio.playGain();
    setIsConnected(true);
  };

  const handleStart = () => {
    audio.playClick();
    onStart({ language: lang, maxTurns: turns, timerSeconds: timer, startingMoney });
  };
  
  const toggleMute = () => {
    setIsMuted(audio.toggleMute());
  };

  return (
    <div 
      className="flex flex-col items-center justify-center h-full w-full p-8 relative bg-cover bg-center"
      style={{ backgroundImage: 'url(/bg.jpg)' }}
    >
      <div className="absolute inset-0 bg-cyber-dark/80 backdrop-blur-sm z-0"></div>
      
      <AnimatePresence mode="wait">
        {!isConnected ? (
          <motion.div
            key="connect"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            className="flex flex-col items-center gap-8 text-center z-10"
          >
            <Wifi className="w-24 h-24 text-cyber-blue animate-pulse" />
            <h1 className="text-3xl font-bold text-glow-blue tracking-widest uppercase">Price War SysOS</h1>
            <button
              onClick={handleConnect}
              className="px-8 py-4 border-2 border-cyber-blue text-cyber-blue font-bold tracking-widest uppercase hover:bg-cyber-blue hover:text-cyber-dark transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)]"
            >
              Establish Secure Connection
            </button>
          </motion.div>
        ) : (
          <motion.div 
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-8 w-full max-w-lg flex flex-col gap-8 relative overflow-hidden z-10 shadow-[0_0_50px_rgba(0,240,255,0.15)]"
          >
            <button 
              onClick={toggleMute}
              className="absolute top-4 right-4 text-gray-500 hover:text-cyber-blue transition-colors z-20"
              title="Toggle Audio"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            {/* Decorative Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            <div className="flex items-center gap-3 justify-center mb-4">
              <Terminal className="text-cyber-blue w-8 h-8" />
              <h1 className="text-2xl font-bold text-center text-glow-blue tracking-widest">{t.title}</h1>
            </div>

            <div className="space-y-6 z-10">
              <div className="flex flex-col gap-2">
                <label className="text-cyber-blue text-sm tracking-widest flex items-center gap-2">
                  <Globe className="w-4 h-4" /> {t.settings.language}
                </label>
                <div className="flex gap-2">
                  <button 
                    onClick={() => { setLang('en'); audio.playTick(); }}
                    className={`flex-1 py-2 rounded-md border ${lang === 'en' ? 'bg-cyber-blue/20 border-cyber-blue text-cyber-blue' : 'border-cyber-border text-gray-400 hover:border-cyber-blue/50'} transition-all`}
                  >
                    ENGLISH
                  </button>
                  <button 
                    onClick={() => { setLang('vi'); audio.playTick(); }}
                    className={`flex-1 py-2 rounded-md border ${lang === 'vi' ? 'bg-cyber-blue/20 border-cyber-blue text-cyber-blue' : 'border-cyber-border text-gray-400 hover:border-cyber-blue/50'} transition-all`}
                  >
                    TIẾNG VIỆT
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-cyber-orange text-sm tracking-widest flex items-center gap-2">
                  <Hash className="w-4 h-4" /> {t.settings.turns}
                </label>
                <input 
                  type="range" 
                  min="5" max="30" step="5"
                  value={turns} 
                  onChange={(e) => { setTurns(Number(e.target.value)); audio.playTick(); }}
                  className="w-full accent-cyber-orange"
                />
                <div className="text-right text-cyber-orange font-bold text-lg">{turns}</div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-cyber-green text-sm tracking-widest flex items-center gap-2">
                  <Clock className="w-4 h-4" /> {t.settings.timer}
                </label>
                <input 
                  type="range" 
                  min="5" max="60" step="5"
                  value={timer} 
                  onChange={(e) => { setTimer(Number(e.target.value)); audio.playTick(); }}
                  className="w-full accent-cyber-green"
                />
                <div className="text-right text-cyber-green font-bold text-lg">{timer}s</div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-cyber-blue text-sm tracking-widest flex items-center gap-2">
                  <span className="text-xl leading-none">💰</span> {(t.settings as any).startingMoney}
                </label>
                <input 
                  type="range" 
                  min="1000" max="3000" step="500"
                  value={startingMoney} 
                  onChange={(e) => { setStartingMoney(Number(e.target.value)); audio.playTick(); }}
                  className="w-full accent-cyber-blue"
                />
                <div className="text-right text-cyber-blue font-bold text-lg">${startingMoney}M</div>
              </div>
            </div>

            <button 
              onClick={handleStart}
              className="mt-4 w-full py-4 bg-cyber-blue/20 hover:bg-cyber-blue/40 border border-cyber-blue rounded-md text-cyber-blue font-bold tracking-widest text-lg flex justify-center items-center gap-2 transition-all group z-10"
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" />
              {t.settings.start}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
