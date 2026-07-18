import React, { useEffect, useRef } from 'react';
import { GameState, Action } from '../types/game';
import { en } from '../i18n/en';
import { vi } from '../i18n/vi';
import { Database, Handshake, TrendingUp, Flame } from 'lucide-react';

interface Props {
  gameState: GameState;
}

const ActionIcon = ({ action }: { action: Action }) => {
  if (action === 'KEEP_PRICE') return <Handshake className="w-4 h-4 text-cyber-green inline-block" />;
  if (action === 'PROMOTION') return <TrendingUp className="w-4 h-4 text-cyber-blue inline-block" />;
  if (action === 'PRICE_WAR') return <Flame className="w-4 h-4 text-cyber-red inline-block" />;
  return null;
};

export const HistoryTable: React.FC<Props> = ({ gameState }) => {
  const t = gameState.settings.language === 'en' ? en : vi;
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [gameState.history]);

  return (
    <div className="glass-panel p-4 flex-1 md:w-96 flex flex-col h-64 md:h-auto">
      <div className="flex items-center gap-2 text-cyber-blue/70 text-xs mb-4 uppercase tracking-widest border-b border-cyber-border/30 pb-2">
        <Database className="w-4 h-4" />
        {t.game.history}
      </div>
      
      <div className="flex-1 overflow-y-auto text-xs font-mono pr-2" ref={historyRef}>
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-cyber-panel/95 text-cyber-blue/70 border-b border-cyber-border/50">
            <tr>
              <th className="py-2">{t.game.historyCols.turn}</th>
              <th className="py-2 text-center" title="Player Action">P</th>
              <th className="py-2 text-center" title="NEO_Corp Action">N</th>
              {gameState.isOligopoly && <th className="py-2 text-center" title="OMEGA_Corp Action">O</th>}
              <th className="py-2 text-cyber-green text-right">{t.game.historyCols.pProfit}</th>
              <th className="py-2 text-cyber-orange text-right">{t.game.historyCols.bProfit}</th>
              {gameState.isOligopoly && <th className="py-2 text-purple-400 text-right">OMEGA</th>}
            </tr>
          </thead>
          <tbody>
            {gameState.history.map((row, idx) => (
              <tr key={idx} className="border-b border-cyber-border/10 hover:bg-cyber-blue/5 transition-colors">
                <td className="py-2 text-gray-400">#{row.turn}</td>
                <td className="py-2 text-center"><ActionIcon action={row.playerAction} /></td>
                <td className="py-2 text-center">{row.botAction ? <ActionIcon action={row.botAction} /> : <span className="text-gray-500">-</span>}</td>
                {gameState.isOligopoly && (
                  <td className="py-2 text-center">
                    {row.bot2Action && <ActionIcon action={row.bot2Action} />}
                  </td>
                )}
                <td className={`py-2 text-right ${row.playerProfit > 0 ? 'text-cyber-green' : 'text-cyber-red'}`}>
                  {row.playerProfit > 0 ? '+' : ''}{row.playerProfit}
                </td>
                <td className={`py-2 text-right ${row.botProfit > 0 ? 'text-cyber-orange' : 'text-cyber-red'}`}>
                  {row.botProfit > 0 ? '+' : ''}{row.botProfit}
                </td>
                {gameState.isOligopoly && (
                  <td className={`py-2 text-right ${(row.bot2Profit || 0) > 0 ? 'text-purple-400' : 'text-cyber-red'}`}>
                    {(row.bot2Profit || 0) > 0 ? '+' : ''}{row.bot2Profit || 0}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
