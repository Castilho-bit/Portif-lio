import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { fetchGitHubData, GitHubFetchResult } from '../../utils/githubService';
import { ExternalLink, RefreshCw, GitFork, Star, Code2, AlertCircle, CheckCircle } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { sounds } from '../../utils/soundEffects';

export const GitHubContent: React.FC = () => {
  const [data, setData] = useState<GitHubFetchResult>({
    user: null,
    repos: [],
    status: 'idle'
  });

  const loadData = async () => {
    setData(prev => ({ ...prev, status: 'loading' }));
    sounds.playSelect();
    const res = await fetchGitHubData(PERSONAL_INFO.githubUsername);
    setData(res);
  };

  useEffect(() => {
    // Attempt auto-query once on mount
    loadData();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
      {/* Profile Overview Card */}
      <div className="cyber-panel cyber-corner-brackets" style={{ padding: '1.6rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-blue))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px var(--neon-blue-glow)',
              overflow: 'hidden'
            }}>
              {data.user?.avatar_url ? (
                <img src={data.user.avatar_url} alt={PERSONAL_INFO.githubUsername} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <GithubIcon size={32} color="#ffffff" />
              )}
            </div>

            <div>
              <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-heading)', color: 'var(--text-main)', margin: 0 }}>
                {data.user?.name || PERSONAL_INFO.name}
              </h3>
              <div style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--neon-blue)' }}>
                @{PERSONAL_INFO.githubUsername}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playSelect()}
              className="cyber-button-primary"
              style={{ fontSize: '0.8rem', padding: '0.6rem 1.2rem' }}
            >
              <ExternalLink size={15} />
              Abrir Perfil
            </a>

            <button
              onClick={loadData}
              disabled={data.status === 'loading'}
              className="cyber-button-secondary"
              style={{ fontSize: '0.8rem', padding: '0.6rem 1rem' }}
              title="Consultar dados da API do GitHub"
            >
              <RefreshCw size={15} className={data.status === 'loading' ? 'animate-spin' : ''} />
              Consultar Repositórios
            </button>
          </div>
        </div>

        {/* Real Verified Stats If Loaded */}
        {data.user && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '0.8rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-subtle)'
          }}>
            <div style={{ textAlign: 'center', padding: '0.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
              <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)', color: 'var(--neon-purple)', fontWeight: 700 }}>
                {data.user.public_repos}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Repositórios Públicos</div>
            </div>

            <div style={{ textAlign: 'center', padding: '0.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
              <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)', color: 'var(--neon-blue)', fontWeight: 700 }}>
                {data.user.followers}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Seguidores</div>
            </div>

            <div style={{ textAlign: 'center', padding: '0.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
              <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                {data.user.following}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Seguindo</div>
            </div>
          </div>
        )}
      </div>

      {/* Repositories / Status Area */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
          <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-display)', color: 'var(--text-main)', letterSpacing: '0.05em' }}>
            CONSULTA DE REPOSITÓRIOS
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
            DADOS PÚBLICOS OFICIAIS
          </span>
        </div>

        {data.status === 'loading' && (
          <div className="cyber-panel" style={{ padding: '2rem', textAlign: 'center', color: 'var(--neon-blue)' }}>
            <RefreshCw size={24} className="animate-spin" style={{ margin: '0 auto 0.6rem' }} />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>Conectando aos servidores do GitHub...</div>
          </div>
        )}

        {data.status === 'success' && data.repos.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {data.repos.map(repo => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playSelect()}
                className="cyber-panel"
                style={{
                  padding: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'transform 0.2s ease, border-color 0.2s ease'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--neon-blue)', marginBottom: '0.2rem' }}>
                    {repo.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {repo.description || 'Repositório público de código.'}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  {repo.language && (
                    <span style={{ color: 'var(--neon-purple)', fontFamily: 'var(--font-mono)' }}>
                      {repo.language}
                    </span>
                  )}
                  {repo.stargazers_count > 0 && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <Star size={13} color="#FBBF24" /> {repo.stargazers_count}
                    </span>
                  )}
                  <ExternalLink size={14} color="var(--text-dim)" />
                </div>
              </a>
            ))}
          </div>
        )}

        {data.status === 'success' && data.repos.length === 0 && (
          <div className="cyber-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.8rem' }}>
              Nenhum repositório público listado no momento ou em fase de publicação.
            </p>
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-button-secondary"
              style={{ fontSize: '0.8rem' }}
            >
              <GithubIcon size={15} /> Acessar @{PERSONAL_INFO.githubUsername} no GitHub
            </a>
          </div>
        )}

        {(data.status === 'rate_limited' || data.status === 'error' || data.status === 'idle') && (
          <div className="cyber-panel" style={{ padding: '1.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', marginBottom: '1rem' }}>
              <AlertCircle size={20} color="var(--neon-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                  Acesso Direto ao GitHub Verificado
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  {data.errorMessage || 'Os repositórios e atividades podem ser visualizados diretamente na página oficial do GitHub de Gabriel Castilho Macedo.'}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playSelect()}
                className="cyber-button-primary"
                style={{ fontSize: '0.82rem' }}
              >
                <ExternalLink size={15} />
                Navegar em https://github.com/Castilho-bit
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
