import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Terminal, Code2, Sparkles, BookOpen, Cpu, ShieldCheck } from 'lucide-react';

export const AboutContent: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
      {/* Code Editor Style Header */}
      <div className="cyber-panel cyber-corner-brackets" style={{ padding: '1.2rem', background: 'rgba(10, 10, 16, 0.8)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444', display: 'inline-block' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B', display: 'inline-block' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>
              identity.config.ts — Gabriel.exe
            </span>
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--neon-blue)', fontFamily: 'var(--font-mono)' }}>
            STATUS: ATIVO
          </span>
        </div>

        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.7',
          color: 'var(--text-main)',
          fontFamily: 'var(--font-heading)',
          fontWeight: 400
        }}>
          "{PERSONAL_INFO.bio}"
        </p>
      </div>

      {/* Developer Interface Telemetry Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem'
      }}>
        <div className="cyber-panel" style={{ padding: '1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem', color: 'var(--neon-purple)' }}>
            <BookOpen size={18} />
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>FORMAÇÃO TÉCNICA</span>
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
            Curso Técnico em TI
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            2º ano em andamento • Foco em desenvolvimento de software, computação e sistemas.
          </div>
        </div>

        <div className="cyber-panel" style={{ padding: '1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem', color: 'var(--neon-blue)' }}>
            <Cpu size={18} />
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>ÁREAS DE INTERESSE</span>
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
            Tecnologia & Inovação
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Desenvolvimento Web, Programação, Arquitetura de Computadores e Redes.
          </div>
        </div>

        <div className="cyber-panel" style={{ padding: '1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem', color: 'var(--accent-cyan)' }}>
            <Sparkles size={18} />
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>FILOSOFIA</span>
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
            Construção Contínua
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            "{PERSONAL_INFO.tagline}"
          </div>
        </div>
      </div>

      {/* Terminal Inspection Box */}
      <div className="cyber-panel" style={{ padding: '1.2rem', borderLeft: '3px solid var(--neon-purple)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
          <Code2 size={18} color="var(--neon-purple)" />
          <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-display)', color: 'var(--text-main)' }}>
            DIAGNÓSTICO DO SISTEMA
          </span>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <div><span style={{ color: 'var(--neon-blue)' }}>const</span> developer = <span style={{ color: '#FCD34D' }}>&apos;Gabriel Castilho Macedo&apos;</span>;</div>
          <div><span style={{ color: 'var(--neon-blue)' }}>const</span> currentPhase = <span style={{ color: '#FCD34D' }}>&apos;2º Ano Técnico de TI&apos;</span>;</div>
          <div><span style={{ color: 'var(--neon-blue)' }}>const</span> objective = <span style={{ color: '#A7F3D0' }}>&apos;Construir experiência prática através de estudos e código&apos;</span>;</div>
        </div>
      </div>
    </div>
  );
};

