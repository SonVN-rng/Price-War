import React from 'react';
import { RandomEvent, GameLanguage } from '../types/game';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { audio } from '../utils/audio';

interface Props {
  event: RandomEvent;
  language: GameLanguage;
  onChoice: (choiceId: string) => void;
}

export const EventPanel: React.FC<Props> = ({ event, language, onChoice }) => {
  const handleChoice = (choiceId: string) => {
    audio.playClick();
    onChoice(choiceId);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel p-6 flex flex-col items-center justify-center h-full w-full relative overflow-hidden border-red-500/50 border"
    >
      <div className="absolute inset-0 bg-red-900/10 pointer-events-none animate-pulse"></div>
      
      <div className="flex flex-col items-center text-center z-10 max-w-lg">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-4 animate-bounce" />
        
        <h2 className="text-2xl font-bold text-red-400 mb-2 uppercase tracking-wider">
          {event.title[language]}
        </h2>
        
        <p className="text-gray-300 mb-8 h-20">
          {event.description[language]}
        </p>

        <div className="flex flex-col gap-4 w-full">
          {event.choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => handleChoice(choice.id)}
              className="px-6 py-3 border border-red-500/50 text-red-400 font-bold uppercase tracking-wide hover:bg-red-500/20 hover:border-red-400 transition-all text-sm w-full relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-red-500/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
              <span className="relative z-10">{choice.text[language]}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
