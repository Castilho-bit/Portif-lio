import React, { useState } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Mail, Phone, MessageCircle, Copy, Check, Send, AlertTriangle, ArrowRight } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { sounds } from '../../utils/soundEffects';

export const ContactContent: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'validated'>('idle');

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Por favor, informe seu nome (mínimo de 2 caracteres).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Por favor, informe um endereço de e-mail válido.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Por favor, escreva uma mensagem com pelo menos 10 caracteres.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playSelect();

    if (validate()) {
      setSubmissionStatus('validated');
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    sounds.playSelect();
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const mailtoLinkWithForm = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(`Contato via Portfólio - ${formData.name}`)}&body=${encodeURIComponent(`Nome: ${formData.name}\nE-mail: ${formData.email}\n\nMensagem:\n${formData.message}`)}`;

  const whatsappLinkWithForm = `https://wa.me/${PERSONAL_INFO.phoneRaw}?text=${encodeURIComponent(`Olá Gabriel! Sou ${formData.name}. ${formData.message}`)}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Official Identity & Channels Banner */}
      <div className="cyber-panel cyber-corner-brackets" style={{ padding: '1.6rem' }}>
        <div style={{ marginBottom: '1.2rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', color: 'var(--text-main)', marginBottom: '0.2rem' }}>
            {PERSONAL_INFO.name}
          </h3>
          <div style={{ fontSize: '0.88rem', color: 'var(--neon-blue)', fontFamily: 'var(--font-mono)' }}>
            {PERSONAL_INFO.role}
          </div>
        </div>

        {/* Quick Contact Buttons */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          {/* Email button */}
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            onClick={() => sounds.playSelect()}
            className="cyber-panel"
            style={{
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              textDecoration: 'none',
              color: 'inherit',
              border: '1px solid var(--border-glow-purple)'
            }}
          >
            <div style={{ padding: '0.6rem', borderRadius: '8px', background: 'rgba(168, 85, 247, 0.15)' }}>
              <Mail size={20} color="var(--neon-purple)" />
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>E-mail Direto</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {PERSONAL_INFO.email}
              </div>
            </div>
          </a>

          {/* WhatsApp button */}
          <a
            href={PERSONAL_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playSelect()}
            className="cyber-panel"
            style={{
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              textDecoration: 'none',
              color: 'inherit',
              border: '1px solid var(--border-glow-blue)'
            }}
          >
            <div style={{ padding: '0.6rem', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.15)' }}>
              <MessageCircle size={20} color="var(--neon-blue)" />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>WhatsApp</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                {PERSONAL_INFO.phone}
              </div>
            </div>
          </a>

          {/* GitHub button */}
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playSelect()}
            className="cyber-panel"
            style={{
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <div style={{ padding: '0.6rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.08)' }}>
              <GithubIcon size={20} color="var(--text-main)" />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>GitHub Oficial</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                @{PERSONAL_INFO.githubUsername}
              </div>
            </div>
          </a>
        </div>

        {/* Copy email action */}
        <div style={{ marginTop: '1.2rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={handleCopyEmail}
            className="cyber-button-secondary"
            style={{ fontSize: '0.78rem', padding: '0.45rem 0.9rem' }}
          >
            {copiedEmail ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
            {copiedEmail ? 'E-mail copiado!' : 'Copiar endereço de e-mail'}
          </button>
        </div>
      </div>

      {/* Validated Contact Form */}
      <div className="cyber-panel" style={{ padding: '1.8rem' }}>
        <div style={{ marginBottom: '1.4rem' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--neon-purple)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
            TRANSMISSÃO DE MENSAGEM
          </span>
          <h4 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: 'var(--text-main)', marginTop: '0.2rem' }}>
            Formulário de Comunicação
          </h4>
        </div>

        {submissionStatus === 'validated' ? (
          <div style={{
            background: 'rgba(168, 85, 247, 0.1)',
            border: '1px solid var(--neon-purple)',
            borderRadius: '8px',
            padding: '1.6rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
              <AlertTriangle size={24} color="#FBBF24" />
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Campos validados com sucesso!
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Como este portfólio opera de forma estática no navegador (sem backend ou servidor SMTP de envio de e-mails conectado), selecione uma das opções abaixo para despachar sua mensagem diretamente:
            </p>

            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <a
                href={mailtoLinkWithForm}
                className="cyber-button-primary"
                style={{ fontSize: '0.85rem' }}
              >
                <Mail size={16} /> Abrir no Aplicativo de E-mail
              </a>

              <a
                href={whatsappLinkWithForm}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-button-secondary"
                style={{ fontSize: '0.85rem' }}
              >
                <MessageCircle size={16} /> Enviar via WhatsApp
              </a>

              <button
                type="button"
                onClick={() => setSubmissionStatus('idle')}
                className="cyber-button-secondary"
                style={{ fontSize: '0.85rem', borderColor: 'var(--border-subtle)' }}
              >
                Editar Mensagem
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {/* Name */}
            <div>
              <label htmlFor="contact-name" style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                NOME COMPLETO *
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder="Seu nome ou organização"
                value={formData.name}
                onChange={e => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  background: 'rgba(10, 10, 16, 0.7)',
                  border: `1px solid ${errors.name ? '#EF4444' : 'var(--border-subtle)'}`,
                  borderRadius: '4px',
                  color: 'var(--text-main)',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              {errors.name && (
                <span style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.3rem', display: 'block' }}>
                  {errors.name}
                </span>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="contact-email" style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                E-MAIL PARA CONTATO *
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="seuemail@exemplo.com"
                value={formData.email}
                onChange={e => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  background: 'rgba(10, 10, 16, 0.7)',
                  border: `1px solid ${errors.email ? '#EF4444' : 'var(--border-subtle)'}`,
                  borderRadius: '4px',
                  color: 'var(--text-main)',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              {errors.email && (
                <span style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.3rem', display: 'block' }}>
                  {errors.email}
                </span>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="contact-message" style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                MENSAGEM *
              </label>
              <textarea
                id="contact-message"
                rows={4}
                placeholder="Escreva sua mensagem, proposta ou dúvida..."
                value={formData.message}
                onChange={e => {
                  setFormData({ ...formData, message: e.target.value });
                  if (errors.message) setErrors({ ...errors, message: '' });
                }}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  background: 'rgba(10, 10, 16, 0.7)',
                  border: `1px solid ${errors.message ? '#EF4444' : 'var(--border-subtle)'}`,
                  borderRadius: '4px',
                  color: 'var(--text-main)',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
              {errors.message && (
                <span style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.3rem', display: 'block' }}>
                  {errors.message}
                </span>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                * Validação em tempo real sem envio simulado
              </span>

              <button
                type="submit"
                className="cyber-button-primary"
              >
                <Send size={16} /> Validar e Enviar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
