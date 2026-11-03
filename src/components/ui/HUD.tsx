import React, { useState } from 'react';
import { ViewMode, ThemeMode, StructureId } from '../../types';
import { NEXUS_STRUCTURES } from '../../data/portfolioData';
import { sounds } from '../../utils/soundEffects';
import {
  Compass,
  Monitor,
  Box,
  Terminal as TerminalIcon,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  RotateCcw,
  Menu,
  X,
  Code
} from 'lucide-react';

interface HUDProps {
  viewMode: ViewMode;
  theme: ThemeMode;
  activeStructure: StructureId | null;
  onSelectStructure: (id: StructureId) => void;
  onResetView: () => void;
  onToggleViewMode: () => void;
  onToggleTheme: () => void;
  onOpenTerminal: () => void;
  onTriggerEasterEgg: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  viewMode,
  theme,
  activeStructure,
  onSelectStructure,
  onResetView,
  onToggleViewMode,
  onToggleTheme,
  onOpenTerminal,
  onTriggerEasterEgg
}) => {
  const [isMuted, setIsMuted] = useState(sounds.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [secretClickCount, setSecretClickCount] = useState(0);

  const handleToggleSound = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  const handleSecretClick = () => {
    sounds.playHover();
    const next = secretClickCount + 1;
    setSecretClickCount(next);
    if (next >= 3) {
      setSecretClickCount(0);
      onTriggerEasterEgg();
    }
  };

  const currentStructureObj = NEXUS_STRUCTURES.find(s => s.id === activeStructure);

  return (
    <header
      role="banner"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 50,
        pointerEvents: 'none',
        padding: '0.8rem 1.4rem'
      }}
    >
      <div
        className="cyber-panel cyber-corner-brackets"
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.6rem 1.2rem',
          background: 'var(--bg-glass-heavy)',
          border: '1px solid var(--border-subtle)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)'
        }}
      >
        {/* Brand & Area Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
          <button
            onClick={() => {
              sounds.playSelect();
              onResetView();
            }}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-main)',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '0.95rem',
              letterSpacing: '0.08em',
              textDecoration: 'none'
            }}
          >
            <span style={{ color: 'var(--neon-purple)' }}>GABRIEL</span>
            <span style={{ color: 'var(--neon-blue)' }}>.EXE</span>
          </button>

          {/* Secret Easter Egg Terminal Glyph */}
          <button
            onClick={handleSecretClick}
            title="Símbolo do Terminal de Coordenadas"
            aria-label="Símbolo secreto do terminal"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '4px',
              padding: '2px 5px',
              color: secretClickCount > 0 ? 'var(--neon-purple)' : 'var(--text-dim)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Code size={13} />
          </button>

          {/* Area Status Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(0,0,0,0.3)',
              padding: '0.2rem 0.6rem',
              borderRadius: '4px',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: currentStructureObj ? currentStructureObj.color : '#10B981'
              }}
            />
            <span style={{ color: 'var(--text-secondary)' }}>
              {currentStructureObj ? currentStructureObj.name : 'VISÃO GERAL'}
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          role="navigation"
          aria-label="Navegação Principal"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem'
          }}
          className="hidden-on-mobile"
        >
          <button
            onClick={() => {
              sounds.playSelect();
              onResetView();
            }}
            className="cyber-button-secondary"
            style={{
              fontSize: '0.78rem',
              padding: '0.4rem 0.8rem',
              borderColor: !activeStructure ? 'var(--neon-blue)' : 'transparent',
              color: !activeStructure ? 'var(--neon-blue)' : 'var(--text-secondary)'
            }}
          >
            Início
          </button>

          {NEXUS_STRUCTURES.map(struct => {
            const isActive = activeStructure === struct.id;
            return (
              <button
                key={struct.id}
                onClick={() => {
                  sounds.playSelect();
                  onSelectStructure(struct.id);
                }}
                className="cyber-button-secondary"
                style={{
                  fontSize: '0.78rem',
                  padding: '0.4rem 0.8rem',
                  borderColor: isActive ? struct.color : 'transparent',
                  color: isActive ? struct.color : 'var(--text-secondary)'
                }}
              >
                {struct.name}
              </button>
            );
          })}
        </nav>

        {/* Global Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Terminal Launcher */}
          <button
            onClick={() => {
              sounds.playSelect();
              onOpenTerminal();
            }}
            className="cyber-button-secondary"
            style={{
              fontSize: '0.78rem',
              padding: '0.4rem 0.8rem',
              color: 'var(--neon-blue)',
              borderColor: 'var(--border-glow-blue)'
            }}
            title="Abrir Terminal Holográfico"
          >
            <TerminalIcon size={14} />
            <span className="hidden-on-mobile">Terminal</span>
          </button>

          {/* Mode Switcher: 3D Universe vs Traditional */}
          <button
            onClick={() => {
              sounds.playSelect();
              onToggleViewMode();
            }}
            className="cyber-button-secondary"
            style={{
              fontSize: '0.78rem',
              padding: '0.4rem 0.8rem',
              color: 'var(--neon-purple)',
              borderColor: 'var(--border-glow-purple)'
            }}
            title={viewMode === '3d' ? 'Alternar para Modo Tradicional' : 'Alternar para Universo 3D'}
          >
            {viewMode === '3d' ? <Monitor size={14} /> : <Box size={14} />}
            <span className="hidden-on-mobile">
              {viewMode === '3d' ? 'Modo Tradicional' : 'Universo 3D'}
            </span>
          </button>

          {/* Theme Toggle (Dark/Light) */}
          <button
            onClick={() => {
              sounds.playSelect();
              onToggleTheme();
            }}
            className="cyber-button-secondary"
            style={{ padding: '0.4rem 0.6rem' }}
            title={theme === 'dark' ? 'Alternar para Tema Claro' : 'Alternar para Tema Escuro'}
            aria-label="Alternar tema de cores"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className="cyber-button-secondary"
            style={{ padding: '0.4rem 0.6rem' }}
            title={isMuted ? 'Ativar Efeitos Sonoros' : 'Silenciar'}
            aria-label="Alternar efeitos de som"
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          {/* Mobile menu hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="cyber-button-secondary show-on-mobile"
            style={{ padding: '0.4rem 0.6rem' }}
            aria-label="Menu de Navegação"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          className="cyber-panel cyber-panel-glow"
          style={{
            pointerEvents: 'auto',
            marginTop: '0.5rem',
            padding: '1rem',
            background: 'var(--bg-glass-heavy)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}
        >
          <button
            onClick={() => {
              sounds.playSelect();
              onResetView();
              setMobileMenuOpen(false);
            }}
            className="cyber-button-secondary"
            style={{ width: '100%', justifyContent: 'flex-start' }}
          >
            Início / Visão Geral
          </button>
          {NEXUS_STRUCTURES.map(struct => (
            <button
              key={struct.id}
              onClick={() => {
                sounds.playSelect();
                onSelectStructure(struct.id);
                setMobileMenuOpen(false);
              }}
              className="cyber-button-secondary"
              style={{ width: '100%', justifyContent: 'flex-start', color: struct.color }}
            >
              {struct.code} — {struct.name}
            </button>
          ))}
        </div>
      )}

      {/* Media query styling helper */}
      <style>{`
        @media (max-width: 860px) {
          .hidden-on-mobile { display: none !important; }
        }
        @media (min-width: 861px) {
          .show-on-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
};

