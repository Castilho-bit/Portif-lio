import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { EASTER_EGG_MESSAGE } from '../../data/portfolioData';
import { sounds } from '../../utils/soundEffects';
import { Sparkles, X, Terminal, Cpu } from 'lucide-react';

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EasterEggModal: React.FC<EasterEggModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      sounds.playEasterEgg();
      // Celebratory cyber confetti burst
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#A855F7', '#38BDF8', '#C084FC', '#F4F4F8']
        });
      } catch {
        // Confetti fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Protocolo Secreto Desbloqueado"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        background: 'rgba(8, 8, 13, 0.85)',
        backdropFilter: 'blur(12px)'
      }}
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="cyber-panel cyber-panel-glow cyber-corner-brackets glitch-effect"
        style={{
          width: '100%',
          maxWidth: '560px',
          padding: '2.2rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(20, 20, 32, 0.95) 0%, rgba(10, 10, 18, 0.98) 100%)',
          border: '1px solid var(--neon-purple)',
          boxShadow: '0 0 50px rgba(168, 85, 247, 0.4), inset 0 0 30px rgba(56, 189, 248, 0.2)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.2rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-blue))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 25px var(--neon-purple-glow)'
          }}>
            <Sparkles size={32} color="#ffffff" />
          </div>
        </div>

        <div style={{
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--neon-blue)',
          letterSpacing: '0.18em',
          marginBottom: '0.6rem'
        }}>
          // PROTOCOLO SECRETO DESBLOQUEADO //
        </div>

        <h3 style={{
          fontSize: '1.6rem',
          fontFamily: 'var(--font-display)',
          color: 'var(--text-main)',
          marginBottom: '1rem',
          textShadow: '0 0 15px rgba(168, 85, 247, 0.6)'
        }}>
          NEXUS EASTER EGG
        </h3>

        <div style={{
          background: 'rgba(0, 0, 0, 0.5)',
          padding: '1.2rem',
          borderRadius: '8px',
          border: '1px dashed var(--neon-blue)',
          marginBottom: '1.8rem'
        }}>
          <p style={{
            fontSize: '1.1rem',
            lineHeight: '1.6',
            color: '#F4F4F8',
            fontFamily: 'var(--font-heading)',
            fontWeight: 500
          }}>
            &quot;{EASTER_EGG_MESSAGE}&quot;
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button
            onClick={() => {
              sounds.playSelect();
              onClose();
            }}
            className="cyber-button-primary"
            style={{ padding: '0.75rem 2rem' }}
          >
            Continuar Explorando
          </button>
        </div>
      </div>
    </div>
  );
};

