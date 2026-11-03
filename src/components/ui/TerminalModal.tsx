import React, { useState, useRef, useEffect } from 'react';
import { TerminalEntry } from '../../types';
import { PERSONAL_INFO, PROJECTS_LIST, SKILL_CATEGORIES, TERMINAL_COMMANDS_HELP, EASTER_EGG_MESSAGE } from '../../data/portfolioData';
import { Terminal as TerminalIcon, X, Minus, Square, CornerDownLeft, Sparkles } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerEasterEgg: () => void;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({
  isOpen,
  onClose,
  onTriggerEasterEgg
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalEntry[]>([
    {
      id: 'init-1',
      type: 'system',
      content: 'GABRIEL.EXE // NEXUS OS [Versão 2.4.0-release]\nDigite "help" para visualizar a lista de comandos suportados.'
    }
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandList, setCommandList] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    sounds.playSelect();
    setCommandList(prev => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const userEntry: TerminalEntry = {
      id: `cmd-${Date.now()}`,
      type: 'command',
      content: rawCmd
    };

    let responseEntry: TerminalEntry;

    switch (cmd) {
      case 'help':
        responseEntry = {
          id: `res-${Date.now()}`,
          type: 'output',
          content: Object.entries(TERMINAL_COMMANDS_HELP)
            .map(([c, desc]) => `  ${c.padEnd(12)} - ${desc}`)
            .join('\n')
        };
        break;

      case 'whoami':
        responseEntry = {
          id: `res-${Date.now()}`,
          type: 'output',
          content: `NOME:     ${PERSONAL_INFO.name}\nSTATUS:   ${PERSONAL_INFO.role}\nLEMA:     "${PERSONAL_INFO.tagline}"\nBIO:      ${PERSONAL_INFO.bio}`
        };
        break;

      case 'projects':
        responseEntry = {
          id: `res-${Date.now()}`,
          type: 'output',
          content: PROJECTS_LIST.map((p, i) =>
            `[0${i + 1}] ${p.title} (${p.badge})\n    URL: ${p.url}\n    DESC: ${p.description}`
          ).join('\n\n')
        };
        break;

      case 'github':
        responseEntry = {
          id: `res-${Date.now()}`,
          type: 'output',
          content: `PERFIL GITHUB: ${PERSONAL_INFO.githubUrl}\nUSUÁRIO:       @${PERSONAL_INFO.githubUsername}\nREPOSITÓRIOS:  Consulte através do portal 3D ou acesse o link acima.`
        };
        break;

      case 'contact':
        responseEntry = {
          id: `res-${Date.now()}`,
          type: 'output',
          content: `E-MAIL:    ${PERSONAL_INFO.email}\nWHATSAPP:  ${PERSONAL_INFO.phone}\nLINK WPP:  ${PERSONAL_INFO.whatsappUrl}`
        };
        break;

      case 'skills':
        responseEntry = {
          id: `res-${Date.now()}`,
          type: 'output',
          content: SKILL_CATEGORIES.map(c => `• ${c.title}:\n    ${c.skills.join(', ')}`).join('\n\n')
        };
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'easteregg':
      case 'secret':
        onTriggerEasterEgg();
        responseEntry = {
          id: `res-${Date.now()}`,
          type: 'output',
          content: `>>> PROTOCOLO SECRETO DESBLOQUEADO <<<\n${EASTER_EGG_MESSAGE}`
        };
        break;

      case 'exit':
        onClose();
        return;

      default:
        sounds.playGlitch();
        responseEntry = {
          id: `res-${Date.now()}`,
          type: 'error',
          content: `Comando não reconhecido: "${rawCmd}". Digite "help" para ver os comandos válidos.`
        };
    }

    setHistory(prev => [...prev, userEntry, responseEntry]);
    setInputVal('');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    sounds.playTerminalKey();

    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandList.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandList.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandList[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex < commandList.length) {
        setHistoryIndex(nextIndex);
        setInputVal(commandList[nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInputVal('');
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-label="Terminal Interativo Gabriel.exe"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(8, 8, 13, 0.75)',
        backdropFilter: 'blur(8px)'
      }}
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="cyber-panel cyber-panel-glow cyber-corner-brackets"
        style={{
          width: '100%',
          maxWidth: '740px',
          height: '520px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(12, 12, 18, 0.95)',
          border: '1px solid var(--border-glow-blue)',
          boxShadow: '0 0 40px rgba(56, 189, 248, 0.25)'
        }}
      >
        {/* Terminal Title Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1rem',
          background: 'rgba(20, 20, 29, 0.8)',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <TerminalIcon size={16} color="var(--neon-blue)" />
            <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--text-main)', fontWeight: 600 }}>
              terminal@gabriel.exe: ~/nexus
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
              title="Fechar Terminal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Terminal Output Area */}
        <div
          ref={bodyRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.2rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            lineHeight: '1.6',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem'
          }}
          onClick={() => inputRef.current?.focus()}
        >
          {history.map(item => {
            if (item.type === 'command') {
              return (
                <div key={item.id} style={{ display: 'flex', gap: '0.5rem', color: 'var(--neon-blue)' }}>
                  <span style={{ color: 'var(--neon-purple)' }}>nexus@gabriel:~$</span>
                  <span>{item.content}</span>
                </div>
              );
            }
            if (item.type === 'error') {
              return (
                <div key={item.id} style={{ color: '#F87171', whiteSpace: 'pre-wrap' }}>
                  {item.content}
                </div>
              );
            }
            if (item.type === 'system') {
              return (
                <div key={item.id} style={{ color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>
                  {item.content}
                </div>
              );
            }
            return (
              <div key={item.id} style={{ color: 'var(--text-main)', whiteSpace: 'pre-wrap' }}>
                {item.content}
              </div>
            );
          })}
        </div>

        {/* Suggestion Chips */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.5rem 1rem',
          background: 'rgba(15, 15, 22, 0.8)',
          borderTop: '1px solid var(--border-subtle)',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginRight: '0.4rem' }}>
            SUGESTÕES:
          </span>
          {['help', 'whoami', 'projects', 'github', 'contact', 'clear'].map(cmd => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              style={{
                background: 'rgba(56, 189, 248, 0.08)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                color: 'var(--neon-blue)',
                padding: '0.2rem 0.55rem',
                borderRadius: '3px',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Input Line */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          padding: '0.8rem 1rem',
          background: 'rgba(10, 10, 15, 0.95)',
          borderTop: '1px solid var(--border-subtle)'
        }}>
          <span style={{ color: 'var(--neon-purple)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 600 }}>
            nexus@gabriel:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Digite um comando..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-main)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.88rem'
            }}
          />
          <button
            onClick={() => handleCommand(inputVal)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--neon-blue)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
            title="Executar"
          >
            <CornerDownLeft size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

