import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { AboutContent } from '../sections/AboutContent';
import { SkillsContent } from '../sections/SkillsContent';
import { ProjectsContent } from '../sections/ProjectsContent';
import { GitHubContent } from '../sections/GitHubContent';
import { ContactContent } from '../sections/ContactContent';
import { sounds } from '../../utils/soundEffects';
import { ArrowUp, Box, Terminal, Sparkles, Send } from 'lucide-react';

interface TraditionalViewProps {
  onSwitchTo3D: () => void;
  onOpenTerminal: () => void;
}

export const TraditionalView: React.FC<TraditionalViewProps> = ({
  onSwitchTo3D,
  onOpenTerminal
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    sounds.playSelect();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: '5.5rem', paddingBottom: '5rem', background: 'var(--bg-primary)' }}>
      {/* Background cyber grid */}
      <div className="cyber-grid-bg" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', opacity: 0.3 }} />

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 10 }}>
        {/* Hero Section */}
        <section
          id="hero"
          style={{
            padding: '3rem 0 4rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'rgba(168, 85, 247, 0.1)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            padding: '0.35rem 0.9rem',
            borderRadius: '20px',
            marginBottom: '1.2rem'
          }}>
            <span className="beacon-ring" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38BDF8' }} />
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--neon-blue)', letterSpacing: '0.1em' }}>
              PORTFÓLIO DIGITAL // MODO NAVEGAÇÃO ACESSÍVEL
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 6vw, 3.8rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            letterSpacing: '0.04em',
            background: 'linear-gradient(135deg, #FFFFFF 25%, #A855F7 70%, #38BDF8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.6rem',
            lineHeight: 1.15
          }}>
            {PERSONAL_INFO.name.toUpperCase()}
          </h1>

          <div style={{
            fontSize: '1.2rem',
            fontFamily: 'var(--font-heading)',
            color: 'var(--neon-purple)',
            fontWeight: 600,
            marginBottom: '1rem'
          }}>
            {PERSONAL_INFO.role}
          </div>

          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            fontStyle: 'italic',
            maxWidth: '640px',
            lineHeight: '1.6',
            marginBottom: '2rem'
          }}>
            &quot;{PERSONAL_INFO.tagline}&quot;
          </p>

          {/* Hero CTAs */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => {
                sounds.playWarp();
                onSwitchTo3D();
              }}
              className="cyber-button-primary"
            >
              <Box size={16} />
              Explorar no Universo 3D
            </button>

            <button
              onClick={() => {
                sounds.playSelect();
                onOpenTerminal();
              }}
              className="cyber-button-secondary"
            >
              <Terminal size={16} />
              Terminal Interativo
            </button>

            <a
              href="#contact"
              onClick={() => sounds.playSelect()}
              className="cyber-button-secondary"
            >
              <Send size={16} />
              Entrar em Contato
            </a>
          </div>
        </section>

        {/* Section 01: Sobre Mim */}
        <section id="about" style={{ marginBottom: '5rem', scrollMarginTop: '6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.6rem' }}>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--neon-purple)' }}>01.</span>
            <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-display)', color: 'var(--text-main)', margin: 0 }}>
              SOBRE MIM
            </h2>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)', marginLeft: '1rem' }} />
          </div>
          <AboutContent />
        </section>

        {/* Section 02: Habilidades */}
        <section id="skills" style={{ marginBottom: '5rem', scrollMarginTop: '6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.6rem' }}>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--neon-blue)' }}>02.</span>
            <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-display)', color: 'var(--text-main)', margin: 0 }}>
              HABILIDADES TÉCNICAS
            </h2>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)', marginLeft: '1rem' }} />
          </div>
          <SkillsContent />
        </section>

        {/* Section 03: Projetos */}
        <section id="projects" style={{ marginBottom: '5rem', scrollMarginTop: '6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.6rem' }}>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--neon-purple)' }}>03.</span>
            <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-display)', color: 'var(--text-main)', margin: 0 }}>
              PORTAL DE PROJETOS
            </h2>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)', marginLeft: '1rem' }} />
          </div>
          <ProjectsContent />
        </section>

        {/* Section 04: GitHub */}
        <section id="github" style={{ marginBottom: '5rem', scrollMarginTop: '6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.6rem' }}>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--neon-blue)' }}>04.</span>
            <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-display)', color: 'var(--text-main)', margin: 0 }}>
              ARQUIVO DIGITAL // GITHUB
            </h2>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)', marginLeft: '1rem' }} />
          </div>
          <GitHubContent />
        </section>

        {/* Section 05: Contato */}
        <section id="contact" style={{ marginBottom: '3rem', scrollMarginTop: '6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.6rem' }}>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--neon-purple)' }}>05.</span>
            <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-display)', color: 'var(--text-main)', margin: 0 }}>
              CENTRAL DE COMUNICAÇÃO
            </h2>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)', marginLeft: '1rem' }} />
          </div>
          <ContactContent />
        </section>

        {/* Footer */}
        <footer style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '2.5rem',
          textAlign: 'center',
          color: 'var(--text-dim)',
          fontSize: '0.82rem',
          fontFamily: 'var(--font-mono)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.8rem'
        }}>
          <div>
            GABRIEL CASTILHO MACEDO // PROJETO GABRIEL.EXE — NEXUS
          </div>
          <div>
            Desenvolvido com React, TypeScript, Three.js &amp; WebGL • Pronto para deploy na Vercel
          </div>
          <button
            onClick={() => {
              sounds.playWarp();
              onSwitchTo3D();
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--neon-blue)',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 'inherit'
            }}
          >
            ← Voltar ao ambiente explorável 3D
          </button>
        </footer>
      </main>

      {/* Back to Top floating button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="cyber-button-primary"
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '46px',
            height: '46px',
            padding: 0,
            borderRadius: '50%',
            zIndex: 45,
            boxShadow: '0 0 25px var(--neon-blue-glow)'
          }}
          title="Voltar ao Topo"
          aria-label="Voltar ao topo da página"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
};
