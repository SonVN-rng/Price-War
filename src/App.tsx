import { useGameEngine } from './hooks/useGameEngine';
import { StartScreen } from './components/StartScreen';
import { GameUI } from './components/GameUI';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const { gameState, timeLeft, startGame, handleAction, handleEventChoice } = useGameEngine();

  return (
    <main className="w-full h-screen overflow-hidden bg-cyber-dark selection:bg-cyber-blue/30">
      <AnimatePresence mode="wait">
        {gameState.status === 'START_SCREEN' ? (
          <motion.div
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full h-full"
          >
            <StartScreen onStart={startGame} />
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full"
          >
            <GameUI 
              gameState={gameState} 
              timeLeft={timeLeft} 
              onAction={handleAction}
              onEventChoice={handleEventChoice}
              onRestart={() => window.location.reload()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
