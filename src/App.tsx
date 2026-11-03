import React, { useState, useEffect } from 'react';
import { ViewMode, ThemeMode, StructureId } from './types';
import { BootScreen } from './components/ui/BootScreen';
import { HUD } from './components/ui/HUD';
import { ParticleCursor } from './components/ui/ParticleCursor';
import { NexusCanvas } from './components/3d/NexusCanvas';
import { StructureModal } from './components/ui/StructureModal';
import { TerminalModal } from './components/ui/TerminalModal';
import { EasterEggModal } from './components/ui/EasterEggModal';
import { TraditionalView } from './components/traditional/TraditionalView';
import { sounds } from './utils/soundEffects';

export const App: React.FC = () => {
  const [hasBooted, setHasBooted] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<ViewMode>('3d');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [activeStructure, setActiveStructure] = useState<StructureId | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState<boolean>(false);

  // Sync theme with document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if typing inside an input/textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key.toLowerCase() === 't') {
        setIsTerminalOpen(prev => !prev);
      } else if (e.key === '1') {
        handleSelectStructure('about');
      } else if (e.key === '2') {
        handleSelectStructure('skills');
      } else if (e.key === '3') {
        handleSelectStructure('projects');
      } else if (e.key === '4') {
        handleSelectStructure('github');
      } else if (e.key === '5') {
        handleSelectStructure('contact');
      } else if (e.key === 'Escape') {
        setActiveStructure(null);
        setIsTerminalOpen(false);
        setIsEasterEggOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode]);

  const handleSelectStructure = (id: StructureId) => {
    sounds.playSelect();
    if (viewMode === '3d') {
      setActiveStructure(id);
    } else {
      // Traditional mode: smooth scroll to section
      setActiveStructure(id);
      const elem = document.getElementById(id);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleResetView = () => {
    setActiveStructure(null);
    if (viewMode === 'traditional') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleToggleViewMode = () => {
    setActiveStructure(null);
    setViewMode(prev => (prev === '3d' ? 'traditional' : '3d'));
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Interactive glowing particle cursor */}
      <ParticleCursor />

      {/* Cybernetic scanline CRT effect */}
      <div className="cyber-scanlines" aria-hidden="true" />

      {/* Initial Boot Sequence / Entrance Screen */}
      {!hasBooted && (
        <BootScreen
          onEnterUniverse={() => {
            setHasBooted(true);
            setViewMode('3d');
          }}
          onEnterTraditional={() => {
            setHasBooted(true);
            setViewMode('traditional');
          }}
        />
      )}

      {/* HUD Navigation (Always visible once booted) */}
      {hasBooted && (
        <HUD
          viewMode={viewMode}
          theme={theme}
          activeStructure={activeStructure}
          onSelectStructure={handleSelectStructure}
          onResetView={handleResetView}
          onToggleViewMode={handleToggleViewMode}
          onToggleTheme={handleToggleTheme}
          onOpenTerminal={() => {
            sounds.playSelect();
            setIsTerminalOpen(true);
          }}
          onTriggerEasterEgg={() => {
            setIsEasterEggOpen(true);
          }}
        />
      )}

      {/* Main View Area: 3D Universe or Traditional View */}
      {hasBooted && (
        viewMode === '3d' ? (
          <main style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <NexusCanvas
              activeStructure={activeStructure}
              onSelectStructure={handleSelectStructure}
              onOpenTerminal={() => {
                sounds.playSelect();
                setIsTerminalOpen(true);
              }}
            />

            {/* Structure Modal in 3D Mode */}
            <StructureModal
              structureId={activeStructure}
              onClose={() => setActiveStructure(null)}
              onSelectStructure={handleSelectStructure}
            />
          </main>
        ) : (
          <TraditionalView
            onSwitchTo3D={() => setViewMode('3d')}
            onOpenTerminal={() => {
              sounds.playSelect();
              setIsTerminalOpen(true);
            }}
          />
        )
      )}

      {/* Interactive Holographic Terminal Modal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onTriggerEasterEgg={() => {
          setIsTerminalOpen(false);
          setIsEasterEggOpen(true);
        }}
      />

      {/* Hidden Easter Egg Modal */}
      <EasterEggModal
        isOpen={isEasterEggOpen}
        onClose={() => setIsEasterEggOpen(false)}
      />
    </div>
  );
};
export default App;

