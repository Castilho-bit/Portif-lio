import React from 'react';
import { PROJECTS_LIST, PERSONAL_INFO } from '../../data/portfolioData';
import { ExternalLink, Sparkles, Terminal, Code, Layers } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { sounds } from '../../utils/soundEffects';

export const ProjectsContent: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {PROJECTS_LIST.map(project => (
        <div
          key={project.id}
          className="cyber-panel cyber-panel-glow cyber-corner-brackets"
          style={{
            padding: '1.8rem',
            background: 'linear-gradient(135deg, rgba(20, 20, 29, 0.85) 0%, rgba(10, 10, 16, 0.95) 100%)',
            border: '1px solid rgba(168, 85, 247, 0.35)',
            boxShadow: '0 0 35px rgba(168, 85, 247, 0.15)'
          }}
        >
          {/* Header Badge */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '0.6rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span className="beacon-ring" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38BDF8', display: 'inline-block' }} />
              <span style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                color: '#38BDF8',
                letterSpacing: '0.12em',
                background: 'rgba(56, 189, 248, 0.12)',
                padding: '0.25rem 0.75rem',
                borderRadius: '4px',
                border: '1px solid rgba(56, 189, 248, 0.3)'
              }}>
                {project.badge}
              </span>
            </div>

            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
              DEPLOY ATIVO // VERCEL CLOUD
            </span>
          </div>

          {/* Futuristic Visual Showcase Frame */}
          <div
            style={{
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
              marginBottom: '1.5rem',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.15) 0%, rgba(8, 8, 13, 0.95) 75%)',
              minHeight: '190px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem 1.5rem',
              textAlign: 'center'
            }}
          >
            {/* Holographic grid inside frame */}
            <div className="cyber-grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3, pointerEvents: 'none' }} />

            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(56, 189, 248, 0.3))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              border: '1px solid var(--neon-blue)',
              boxShadow: '0 0 20px var(--neon-blue-glow)'
            }}>
              <Sparkles size={28} color="#38BDF8" />
            </div>

            <h3 style={{
              fontSize: '1.6rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              color: 'var(--text-main)',
              letterSpacing: '0.04em',
              marginBottom: '0.5rem',
              textShadow: '0 0 15px rgba(255, 255, 255, 0.3)'
            }}>
              {project.title}
            </h3>

            <div style={{
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--neon-blue)',
              background: 'rgba(0, 0, 0, 0.5)',
              padding: '0.3rem 0.8rem',
              borderRadius: '4px',
              border: '1px dashed rgba(56, 189, 248, 0.4)'
            }}>
              {project.url}
            </div>
          </div>

          {/* Description */}
          <p style={{
            fontSize: '0.95rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
            marginBottom: '1.2rem',
            fontFamily: 'var(--font-heading)'
          }}>
            {project.description}
          </p>

          {/* Technology Badges */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.6rem' }}>
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-main)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '4px',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playSelect()}
              className="cyber-button-primary"
              style={{ flex: '1', minWidth: '180px' }}
            >
              <ExternalLink size={16} />
              Acessar Projeto
            </a>

            <a
              href={project.githubUrl || PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playSelect()}
              className="cyber-button-secondary"
              style={{ flex: '1', minWidth: '160px' }}
            >
              <GithubIcon size={16} />
              Ver no GitHub
            </a>
          </div>
        </div>
      ))}

      {/* Expansion Slot for Future Projects */}
      <div
        className="cyber-panel"
        style={{
          padding: '1.4rem',
          border: '1px dashed rgba(168, 85, 247, 0.3)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.6rem'
        }}
      >
        <Layers size={22} color="var(--neon-purple)" />
        <div style={{ fontSize: '0.9rem', fontFamily: 'var(--font-display)', color: 'var(--text-main)' }}>
          ESPAÇO PREPARADO PARA NOVOS PROJETOS
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: '480px' }}>
          Estrutura modular pronta para receber novas publicações e experimentos práticos. Basta adicionar novos itens no arquivo de configuração <code style={{ color: 'var(--neon-blue)', background: 'rgba(255,255,255,0.05)', padding: '0.1rem 0.3rem' }}>src/data/portfolioData.ts</code>.
        </p>
      </div>
    </div>
  );
};
