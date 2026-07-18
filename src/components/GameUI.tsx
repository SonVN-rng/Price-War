import React from 'react';
import { GameState, Action } from '../types/game';
import { TopBar } from './TopBar';
import { TerminalLog } from './TerminalLog';
import { HistoryTable } from './HistoryTable';
import { ActionPanel } from './ActionPanel';
import { EventPanel } from './EventPanel';
import { WinnerScreen } from './WinnerScreen';

interface Props {
  gameState: GameState;
  timeLeft: number;
  onAction: (action: Action) => void;
  onEventChoice: (choiceId: string) => void;
  onRestart: () => void;
}

export const GameUI: React.FC<Props> = ({ gameState, timeLeft, onAction, onEventChoice, onRestart }) => {
  return (
    <div className="h-screen w-full flex flex-col p-4 md:p-6 max-w-7xl mx-auto relative">
      
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyber-blue/5 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyber-red/5 blur-[100px] rounded-full"></div>
      </div>

      <TopBar gameState={gameState} timeLeft={timeLeft} />
      
      <div className="flex-1 flex flex-col md:flex-row gap-4 min-h-0">
        <TerminalLog gameState={gameState} />
        <HistoryTable gameState={gameState} />
      </div>

      {gameState.status === 'EVENT' && gameState.currentEvent ? (
        <EventPanel 
          event={gameState.currentEvent} 
          language={gameState.settings.language} 
          onChoice={onEventChoice} 
        />
      ) : (
        <ActionPanel gameState={gameState} onAction={onAction} />
      )}

      {gameState.status === 'GAME_OVER' && (
        <WinnerScreen gameState={gameState} onRestart={onRestart} />
      )}
    </div>
  );
};
