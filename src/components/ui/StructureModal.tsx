import React, { useEffect } from 'react';
import { StructureId, StructureMeta } from '../../types';
import { NEXUS_STRUCTURES } from '../../data/portfolioData';
import { AboutContent } from '../sections/AboutContent';
import { SkillsContent } from '../sections/SkillsContent';
import { ProjectsContent } from '../sections/ProjectsContent';
import { GitHubContent } from '../sections/GitHubContent';
import { ContactContent } from '../sections/ContactContent';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

interface StructureModalProps {
  structureId: StructureId | null;
  onClose: () => void;
  onSelectStructure: (id: StructureId) => void;
}

export const StructureModal: React.FC<StructureModalProps> = ({
  structureId,
  onClose,
  onSelectStructure
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && structureId) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [structureId, onClose]);

  if (!structureId) return null;

  const currentIdx = NEXUS_STRUCTURES.findIndex(s => s.id === structureId);
  const currentStructure = NEXUS_STRUCTURES[currentIdx] || NEXUS_STRUCTURES[0];

  const handlePrev = () => {
    const prevIdx = (currentIdx - 1 + NEXUS_STRUCTURES.length) % NEXUS_STRUCTURES.length;
    sounds.playSelect();
    onSelectStructure(NEXUS_STRUCTURES[prevIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (currentIdx + 1) % NEXUS_STRUCTURES.length;
    sounds.playSelect();
    onSelectStructure(NEXUS_STRUCTURES[nextIdx].id);
  };

  const renderContent = () => {
    switch (structureId) {
      case 'about':
        return <AboutContent />;
      case 'skills':
        return <SkillsContent />;
      case 'projects':
        return <ProjectsContent />;
      case 'github':
        return <GitHubContent />;
      case 'contact':
        return <ContactContent />;
      default:
        return null;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${currentStructure.name} - ${currentStructure.subtitle}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.2rem',
        background: 'rgba(8, 8, 13, 0.7)',
        backdropFilter: 'blur(10px)'
      }}
      onClick={e => {
        if (e.target === e.currentTarget) {
          sounds.playSelect();
          onClose();
        }
      }}
    >
      <div
        className="cyber-panel cyber-panel-glow cyber-corner-brackets"
        style={{
          width: '100%',
          maxWidth: '900px',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(16, 16, 24, 0.94)',
          border: `1px solid ${currentStructure.color}55`,
          boxShadow: `0 0 50px ${currentStructure.color}25`
        }}
      >
        {/* Header Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.2rem 1.6rem',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'rgba(20, 20, 29, 0.7)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
              <span style={{
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                color: currentStructure.color,
                letterSpacing: '0.12em',
                fontWeight: 600
              }}>
                {currentStructure.code} //
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {currentStructure.subtitle}
              </span>
            </div>
            <h2 style={{
              fontSize: '1.6rem',
              fontFamily: 'var(--font-display)',
              color: 'var(--text-main)',
              margin: 0,
              fontWeight: 700
            }}>
              {currentStructure.name}
            </h2>
          </div>

          {/* Quick Structure Switchers & Close */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={handlePrev}
              className="cyber-button-secondary"
              style={{ padding: '0.5rem 0.7rem' }}
              title="Estrutura anterior"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              className="cyber-button-secondary"
              style={{ padding: '0.5rem 0.7rem' }}
              title="Próxima estrutura"
            >
              <ChevronRight size={16} />
            </button>
            <button
              onClick={() => {
                sounds.playSelect();
                onClose();
              }}
              className="cyber-button-secondary"
              style={{ padding: '0.5rem 0.8rem', borderColor: 'var(--neon-purple)' }}
              title="Voltar ao Universo"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.8rem'
        }}>
          {renderContent()}
        </div>

        {/* Footer info bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.8rem 1.6rem',
          borderTop: '1px solid var(--border-subtle)',
          background: 'rgba(12, 12, 18, 0.85)',
          fontSize: '0.75rem',
          color: 'var(--text-dim)',
          fontFamily: 'var(--font-mono)'
        }}>
          <div>
            NEXUS STRUCTURE {currentIdx + 1} DE {NEXUS_STRUCTURES.length}
          </div>
          <button
            onClick={() => {
              sounds.playSelect();
              onClose();
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--neon-blue)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: 'inherit',
              fontSize: 'inherit'
            }}
          >
            <Eye size={14} /> Voltar à Visão Panorâmica 3D [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};

