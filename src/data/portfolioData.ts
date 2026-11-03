import { PersonalInfo, SkillCategory, ProjectItem, StructureMeta } from '../types';

/**
 * =========================================================================
 * GABRIEL.EXE // NEXUS — CONFIGURAÇÃO CENTRAL DE DADOS DO PORTFÓLIO
 * =========================================================================
 * Todas as informações pessoais, projetos, habilidades e estruturas
 * estão centralizadas aqui para fácil edição e manutenção.
 */

export const PERSONAL_INFO: PersonalInfo = {
  name: "Gabriel Castilho Macedo",
  role: "Estudante de TI | 2º ano do Técnico",
  tagline: "Transformando curiosidade em código e ideias em experiências digitais.",
  bio: "Sou Gabriel Castilho Macedo, estudante do 2º ano do curso técnico de TI. Tenho interesse em tecnologia e desenvolvimento de projetos digitais, e estou construindo minha experiência por meio de estudos e experimentação prática.",
  email: "gabrielcmacedo10@gmail.com",
  phone: "+55 19 99486-4670",
  phoneRaw: "5519994864670",
  whatsappUrl: "https://wa.me/5519994864670",
  githubUrl: "https://github.com/Castilho-bit",
  githubUsername: "Castilho-bit"
};

/**
 * AS 5 ESTRUTURAS DO NEXUS
 * Cada estrutura representa uma seção do portfólio no ambiente 3D.
 */
export const NEXUS_STRUCTURES: StructureMeta[] = [
  {
    id: 'about',
    code: 'ESTRUTURA 01',
    name: 'SOBRE MIM',
    subtitle: 'Central de Identidade',
    description: 'Apresentação pessoal, trajetória acadêmica e objetivos na área de Tecnologia da Informação.',
    position3D: [0, 1.2, 0],
    color: '#A855F7',
    accentColor: '#C084FC',
    iconName: 'User'
  },
  {
    id: 'skills',
    code: 'ESTRUTURA 02',
    name: 'HABILIDADES',
    subtitle: 'Laboratório Digital',
    description: 'Competências técnicas fundamentais organizadas por categorias de estudo prático.',
    position3D: [-5.5, 0.8, -3.5],
    color: '#38BDF8',
    accentColor: '#7DD3FC',
    iconName: 'Cpu'
  },
  {
    id: 'projects',
    code: 'ESTRUTURA 03',
    name: 'PROJETOS',
    subtitle: 'Portal de Projetos',
    description: 'Projetos práticos e experimentos interativos desenvolvidos durante os estudos técnicos.',
    position3D: [5.5, 1.4, -3.0],
    color: '#A855F7',
    accentColor: '#38BDF8',
    iconName: 'Sparkles'
  },
  {
    id: 'github',
    code: 'ESTRUTURA 04',
    name: 'GITHUB',
    subtitle: 'Arquivo Digital',
    description: 'Acesso direto ao repositório de código aberto e perfil no GitHub.',
    position3D: [-4.2, 1.8, 4.2],
    color: '#38BDF8',
    accentColor: '#A855F7',
    iconName: 'GitBranch'
  },
  {
    id: 'contact',
    code: 'ESTRUTURA 05',
    name: 'CONTATO',
    subtitle: 'Central de Comunicação',
    description: 'Canais oficiais de comunicação, e-mail direto, WhatsApp e formulário de contato.',
    position3D: [4.8, 0.9, 4.5],
    color: '#A855F7',
    accentColor: '#F4F4F8',
    iconName: 'MessageSquare'
  }
];

/**
 * CATEGORIAS DE HABILIDADES
 * Conforme especificação: sem percentuais inventados ou certificações fictícias.
 * Estrutura preparada para expansão com as tecnologias reais de estudo.
 */
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'web-dev',
    title: 'Desenvolvimento Web',
    description: 'Criação de páginas, estruturação semântica, estilos visuais e lógica interativa para web.',
    skills: [
      'HTML5 semântico',
      'CSS3 moderno e layouts responsivos',
      'JavaScript para interatividade web',
      'Integrações com APIs e serviços web'
    ],
    note: 'Estrutura preparada para inclusão de novos frameworks e bibliotecas conforme avanço nos estudos.'
  },
  {
    id: 'programming',
    title: 'Programação',
    description: 'Fundamentos de lógica algorítmica, estruturas de controle e resolução estruturada de problemas.',
    skills: [
      'Lógica de programação e algoritmos',
      'Estruturas de dados básicas',
      'Paradigma estruturado e orientado a objetos',
      'Depuração e testes de código'
    ],
    note: 'Foco constante na consolidação da base de ciência da computação e raciocínio lógico.'
  },
  {
    id: 'hardware',
    title: 'Hardware e Computadores',
    description: 'Arquitetura de sistemas computacionais, montagem, diagnóstico físico e manutenção preventiva.',
    skills: [
      'Arquitetura de computadores e componentes',
      'Montagem, upgrade e manutenção preventiva de hardware',
      'Diagnóstico de falhas e análise de desempenho',
      'Instalação de periféricos e sistemas operacionais'
    ],
    note: 'Conhecimentos práticos integrados ao currículo do curso técnico de TI.'
  },
  {
    id: 'networking',
    title: 'Redes e Infraestrutura',
    description: 'Fundamentos de telecomunicações, protocolos de rede, cabeamento e configuração de dispositivos.',
    skills: [
      'Modelos de rede OSI e TCP/IP',
      'Endereçamento IPv4 e noções de IPv6',
      'Configuração básica de roteadores e switches',
      'Cabeamento estruturado e conectividade local'
    ],
    note: 'Compreensão de como os dados trafegam e como sistemas se comunicam de forma segura.'
  },
  {
    id: 'tools',
    title: 'Ferramentas de Desenvolvimento',
    description: 'Ecossistema de produtividade, controle de versão e ambientes de desenvolvimento.',
    skills: [
      'Git e controle de versão',
      'GitHub para hospedagem de repositórios',
      'VS Code e extensões de desenvolvimento',
      'Linha de comando (Terminal / PowerShell / Bash)'
    ],
    note: 'Adoção de boas práticas no fluxo de trabalho técnico desde os primeiros projetos.'
  }
];

/**
 * LISTA DE PROJETOS
 * O projeto em destaque é o solicitado na especificação com link real e editável.
 */
export const PROJECTS_LIST: ProjectItem[] = [
  {
    id: 'project-zeta-game',
    title: 'Meu Projeto Web',
    badge: 'PROJETO PUBLICADO',
    url: 'https://jogo-zeta-blush.vercel.app/',
    githubUrl: 'https://github.com/Castilho-bit',
    description: 'Projeto desenvolvido durante minha jornada de aprendizado em tecnologia. Aplicação web interativa com foco em lógica de funcionamento, experiência do usuário e publicação em nuvem.',
    technologies: ['HTML / CSS', 'JavaScript', 'Deploy Vercel', 'Interatividade Web'],
    isHighlight: true
  }
];

/**
 * TEXTOS DO TERMINAL E COMANDOS
 */
export const TERMINAL_COMMANDS_HELP: Record<string, string> = {
  help: 'Lista todos os comandos disponíveis no terminal.',
  whoami: 'Exibe a identidade e informações de Gabriel Castilho Macedo.',
  projects: 'Apresenta os projetos desenvolvidos e links de acesso.',
  github: 'Exibe o perfil e dados do GitHub @Castilho-bit.',
  contact: 'Mostra todos os canais de contato e comunicação.',
  skills: 'Exibe as categorias do laboratório de habilidades técnicas.',
  clear: 'Limpa o histórico da tela do terminal.',
  easteregg: 'Tenta acionar o protocolo secreto do NEXUS.'
};

export const EASTER_EGG_MESSAGE = "Você encontrou um segredo. Continue explorando e transformando ideias em código.";

