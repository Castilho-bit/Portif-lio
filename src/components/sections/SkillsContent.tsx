import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { Globe, Terminal, Cpu, Network, Wrench, CheckCircle2 } from 'lucide-react';

export const SkillsContent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'web-dev':
        return <Globe size={20} color="var(--neon-blue)" />;
      case 'programming':
        return <Terminal size={20} color="var(--neon-purple)" />;
      case 'hardware':
        return <Cpu size={20} color="#34D399" />;
      case 'networking':
        return <Network size={20} color="#FBBF24" />;
      case 'tools':
        return <Wrench size={20} color="#F472B6" />;
      default:
        return <Cpu size={20} color="var(--neon-blue)" />;
    }
  };

  const filteredCategories = selectedCategory === 'all'
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter(cat => cat.id === selectedCategory);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Category selector chips */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setSelectedCategory('all')}
          className={`cyber-button-secondary ${selectedCategory === 'all' ? 'cyber-panel-glow' : ''}`}
          style={{
            fontSize: '0.78rem',
            padding: '0.45rem 0.9rem',
            borderColor: selectedCategory === 'all' ? 'var(--neon-blue)' : 'var(--border-subtle)',
            color: selectedCategory === 'all' ? 'var(--neon-blue)' : 'var(--text-secondary)'
          }}
        >
          Todas as Categorias ({SKILL_CATEGORIES.length})
        </button>
        {SKILL_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className="cyber-button-secondary"
            style={{
              fontSize: '0.78rem',
              padding: '0.45rem 0.9rem',
              borderColor: selectedCategory === cat.id ? 'var(--neon-purple)' : 'var(--border-subtle)',
              color: selectedCategory === cat.id ? 'var(--neon-purple)' : 'var(--text-secondary)'
            }}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Categories Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.2rem'
      }}>
        {filteredCategories.map(cat => (
          <div key={cat.id} className="cyber-panel cyber-corner-brackets" style={{ padding: '1.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.8rem' }}>
              <div style={{
                padding: '0.5rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {getCategoryIcon(cat.id)}
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', color: 'var(--text-main)', margin: 0 }}>
                  {cat.title}
                </h4>
                <span style={{ fontSize: '0.72rem', color: 'var(--neon-blue)', fontFamily: 'var(--font-mono)' }}>
                  ESTRUTURA TÉCNICA
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1rem' }}>
              {cat.description}
            </p>

            {/* Practical Topics List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              {cat.skills.map((skill, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.82rem',
                    color: 'var(--text-main)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '0.4rem 0.7rem',
                    borderRadius: '4px',
                    borderLeft: '2px solid var(--neon-purple)'
                  }}
                >
                  <CheckCircle2 size={14} color="var(--neon-blue)" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>

            {cat.note && (
              <div style={{
                fontSize: '0.72rem',
                color: 'var(--text-dim)',
                fontStyle: 'italic',
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '0.6rem'
              }}>
                {cat.note}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{
        fontSize: '0.75rem',
        color: 'var(--text-dim)',
        fontFamily: 'var(--font-mono)',
        textAlign: 'center',
        padding: '0.5rem'
      }}>
        * Competências fundamentadas em estudos técnicos reais, estruturadas para expansão contínua.
      </div>
    </div>
  );
};

