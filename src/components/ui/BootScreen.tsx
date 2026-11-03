import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { sounds } from '../../utils/soundEffects';
import { ArrowRight, Terminal, Sparkles, Monitor } from 'lucide-react';

interface BootScreenProps {
  onEnterUniverse: () => void;
  onEnterTraditional: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({
  onEnterUniverse,
  onEnterTraditional
}) => {
  const [bootStep, setBootStep] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isEntering, setIsEntering] = useState<boolean>(false);

  const bootLines = [
    'INITIALIZING GABRIEL.EXE...',
    'CONNECTING TO NEXUS...',
    'LOADING ENVIRONMENT...',
    'SYSTEM ONLINE.'
  ];

  useEffect(() => {
    // Progressive boot sequence
    const timers: number[] = [];

    // Line 1
    timers.push(window.setTimeout(() => {
      setBootStep(1);
      setProgress(25);
      sounds.playTerminalKey();
    }, 400));

    // Line 2
    timers.push(window.setTimeout(() => {
      setBootStep(2);
      setProgress(55);
      sounds.playTerminalKey();
    }, 1000));

    // Line 3
    timers.push(window.setTimeout(() => {
      setBootStep(3);
      setProgress(85);
      sounds.playTerminalKey();
    }, 1600));

    // Line 4 (System Online)
    timers.push(window.setTimeout(() => {
      setBootStep(4);
      setProgress(100);
      sounds.playSelect();
    }, 2200));

    // Reveal final hero
    timers.push(window.setTimeout(() => {
      setIsReady(true);
    }, 2700));

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const handleEnter3D = () => {
    setIsEntering(true);
    sounds.playWarp();
    setTimeout(() => {
      onEnterUniverse();
    }, 600);
  };

  const handleEnterTrad = () => {
    sounds.playSelect();
    onEnterTraditional();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: '#08080D',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        opacity: isEntering ? 0 : 1,
        transform: isEntering ? 'scale(1.08)' : 'scale(1)',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden'
      }}
    >
      {/* Background cyber grid */}
      <div className="cyber-grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

      <div
        className="cyber-panel cyber-panel-glow cyber-corner-brackets"
        style={{
          width: '100%',
          maxWidth: '680px',
          padding: '2.5rem',
          position: 'relative',
          background: 'rgba(16, 16, 24, 0.92)',
          border: '1px solid var(--border-glow-purple)',
          boxShadow: '0 0 60px rgba(168, 85, 247, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        {/* Boot Terminal Box */}
        <div style={{
          width: '100%',
          background: 'rgba(8, 8, 13, 0.9)',
          padding: '1.2rem',
          borderRadius: '6px',
          border: '1px solid var(--border-subtle)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
          textAlign: 'left',
          marginBottom: '1.8rem',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem', opacity: 0.6 }}>
            <Terminal size={14} color="var(--neon-blue)" />
            <span style={{ fontSize: '0.72rem' }}>BOOT_LOADER // NEXUS_KERNEL_64</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {bootLines.slice(0, bootStep).map((line, idx) => (
              <div
                key={idx}
                style={{
                  color: idx === 3 ? '#34D399' : 'var(--neon-blue)',
                  fontWeight: idx === 3 ? 700 : 400,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span style={{ color: 'var(--neon-purple)' }}>&gt;</span>
                <span>{line}</span>
              </div>
            ))}
          </div>

          {/* Loading bar */}
          <div style={{ marginTop: '1rem', width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #A855F7, #38BDF8)',
                transition: 'width 0.4s ease'
              }}
            />
          </div>
        </div>

        {/* Revealed Content When System Is Online */}
        <div style={{
          opacity: isReady ? 1 : 0,
          transform: isReady ? 'translateY(0)' : 'translateY(15px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <span style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--neon-blue)',
            letterSpacing: '0.2em',
            marginBottom: '0.5rem'
          }}>
            IDENTIFICAÇÃO PRINCIPAL
          </span>

          <h1 style={{
            fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            letterSpacing: '0.04em',
            background: 'linear-gradient(135deg, #FFFFFF 30%, #A855F7 70%, #38BDF8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.4rem',
            lineHeight: 1.2
          }}>
            {PERSONAL_INFO.name.toUpperCase()}
          </h1>

          <div style={{
            fontSize: '1rem',
            fontFamily: 'var(--font-heading)',
            color: 'var(--neon-purple)',
            fontWeight: 600,
            marginBottom: '1rem'
          }}>
            {PERSONAL_INFO.role}
          </div>

          <p style={{
            fontSize: '0.95rem',
            color: 'var(--text-secondary)',
            fontStyle: 'italic',
            maxWidth: '520px',
            lineHeight: '1.6',
            marginBottom: '2rem'
          }}>
            &quot;{PERSONAL_INFO.tagline}&quot;
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%' }}>
            <button
              onClick={handleEnter3D}
              className="cyber-button-primary"
              style={{
                width: '100%',
                maxWidth: '360px',
                padding: '1rem 2rem',
                fontSize: '0.95rem'
              }}
            >
              <Sparkles size={18} />
              ENTRAR NO UNIVERSO
              <ArrowRight size={18} />
            </button>

            {/* Accessible / Traditional Alternative */}
            <button
              onClick={handleEnterTrad}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-dim)',
                fontSize: '0.8rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                textDecoration: 'underline',
                padding: '0.4rem 0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--neon-blue)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}
            >
              <Monitor size={14} />
              Acessar em modo tradicional (modo acessível 2D)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

