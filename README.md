# GABRIEL.EXE // NEXUS — Portfólio Digital Interativo

> **"Transformando curiosidade em código e ideias em experiências digitais."**  
> Portfólio pessoal e interativo de **Gabriel Castilho Macedo** (Estudante de TI | 2º ano do Técnico).

---

## 🌌 Visão Geral do Universo NEXUS

O **GABRIEL.EXE // NEXUS** é uma experiência digital imersiva inspirada nos universos de exploração tecnológica, experiências criativas WebGL e projetos de destaque do Awwwards.

O ambiente **NEXUS** é composto por um universo cibernético suspenso no espaço digital, com iluminação neon roxa (`#A855F7`) e azul elétrico (`#38BDF8`), estruturas flutuantes, feixes de energia luminosa, poeira de dados estelar, e 5 estruturas principais exploráveis.

---

## 🏛️ As 5 Estruturas do NEXUS

1. **ESTRUTURA 01 — SOBRE MIM (Central de Identidade)**
   - Apresentação oficial, trajetória acadêmica no 2º ano do técnico em TI, telemetria de estudos e diagnósticos do sistema.
2. **ESTRUTURA 02 — HABILIDADES (Laboratório Digital)**
   - 5 categorias técnicas reais editáveis: *Desenvolvimento Web*, *Programação*, *Hardware e Computadores*, *Redes e Infraestrutura*, e *Ferramentas de Desenvolvimento*.
   - Sem tecnologias ou porcentagens fictícias. Estrutura modular preparada para expansão contínua.
3. **ESTRUTURA 03 — PROJETOS (Portal de Projetos)**
   - Apresentação em destaque do projeto publicado [Meu Projeto Web](https://jogo-zeta-blush.vercel.app/) com moldura futurista, iluminação especial e links diretos para a aplicação e para o repositório no GitHub.
   - Espaço pré-configurado para adição de futuros projetos.
4. **ESTRUTURA 04 — GITHUB (Arquivo Digital)**
   - Integração com o perfil oficial [@Castilho-bit](https://github.com/Castilho-bit).
   - Botão para consulta em tempo real da API pública do GitHub ou navegação direta no perfil verificado.
5. **ESTRUTURA 05 — CONTATO (Central de Comunicação)**
   - Canais diretos: E-mail (`gabrielcmacedo10@gmail.com`), WhatsApp (`+55 19 99486-4670`) e GitHub.
   - Botão para copiar e-mail com 1 clique.
   - Formulário com validação real de campos e encaminhamento direto sem simulações falsas de envio.

---

## ⚡ Recursos Interativos & Funcionalidades

- **Sequência de Inicialização (Boot Screen):**  
  Animação em estilo terminal executando `INITIALIZING GABRIEL.EXE... CONNECTING TO NEXUS... LOADING ENVIRONMENT... SYSTEM ONLINE.` com barra de progresso e efeito glitch sutil.
- **Terminal Interativo Holográfico:**  
  Acessível via console 3D ou atalho na barra superior. Suporta comandos reais:
  - `help` — Lista os comandos disponíveis.
  - `whoami` — Exibe dados de identidade de Gabriel.
  - `projects` — Lista os projetos publicados.
  - `github` — Informações do perfil oficial.
  - `contact` — Exibe e-mail e WhatsApp.
  - `skills` — Lista as categorias de habilidades.
  - `clear` — Limpa o histórico do terminal.
  - `easteregg` — Desbloqueia o protocolo secreto.
  - Suporte a histórico de comandos (setas para cima/baixo) e sugestões clicáveis.
- **Segredo / Easter Egg:**  
  Clicar 3 vezes no símbolo de terminal `<>` no topo da interface ou digitar `easteregg` no terminal desbloqueia uma mensagem especial com animação de glitch, chuva de partículas holográficas e sintetizador de som:
  > *"Você encontrou um segredo. Continue explorando e transformando ideias em código."*
- **Sintetizador de Áudio Web Audio API:**  
  Efeitos sonoros procedurais (clicks, whoosh de teletransporte, beeps do terminal e arpeggio do segredo) sem depender de arquivos externos de áudio, com botão de mudo no HUD.
- **Cursor de Partículas Luminosas:**  
  Rastro suave de partículas neon que seguem o cursor, respeitando `prefers-reduced-motion` e desativando-se automaticamente em dispositivos touch.
- **Alternância entre Modos:**  
  Permite alternar a qualquer momento entre a exploração 3D e o **Modo Tradicional** (versão 2D rápida, acessível, com botão de voltar ao topo e navegação por rolagem suave).
- **Alternância de Tema:**  
  Suporte a tema escuro (Cyberpunk Nexus) e tema claro (Tech Clean).
- **Atalhos de Teclado:**  
  - `T`: Abre/fecha o Terminal.
  - `1` a `5`: Seleciona diretamente as estruturas 01 a 05.
  - `ESC`: Fecha qualquer modal e retorna à visão panorâmica.

---

## 🚀 Como Executar Localmente

### 1. Pré-requisitos
- Node.js instalado (versão 18 ou superior).
- npm, pnpm ou yarn.

### 2. Instalação das dependências
Abra o terminal na pasta do projeto e execute:
```bash
npm install
```

### 3. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```
O Vite iniciará o servidor local. Acesse pelo navegador:
```
http://localhost:5173/
```

### 4. Gerar build de produção
Para testar a compilação final otimizada para publicação:
```bash
npm run build
npm run preview
```

---

## 🛠️ Como Editar Suas Informações e Adicionar Projetos

Todas as informações pessoais, biografia, links, categorias de habilidades e lista de projetos estão centralizadas em um único arquivo:

📂 **`src/data/portfolioData.ts`**

Para alterar qualquer dado:
- **Dados pessoais e redes:** Edite o objeto `PERSONAL_INFO`.
- **Habilidades técnicas:** Edite o array `SKILL_CATEGORIES`.
- **Projetos:** Adicione novos itens no array `PROJECTS_LIST`:
  ```ts
  {
    id: 'novo-projeto',
    title: 'Título do Seu Novo Projeto',
    badge: 'PROJETO WEB',
    url: 'https://seulink.vercel.app/',
    githubUrl: 'https://github.com/Castilho-bit/seu-repo',
    description: 'Descrição detalhada do projeto.',
    technologies: ['React', 'TypeScript', 'Node.js'],
    isHighlight: false
  }
  ```

---

## 📤 Como Enviar os Arquivos Manualmente para o seu GitHub

Conforme solicitado, **todo o envio é feito exclusivamente por você**, mantendo o total controle do seu perfil [github.com/Castilho-bit](https://github.com/Castilho-bit).

Siga os passos abaixo no terminal do seu computador (PowerShell ou Git Bash) dentro da pasta deste projeto:

1. **Crie um novo repositório no seu GitHub:**
   - Acesse [github.com/new](https://github.com/new).
   - Dê um nome ao repositório (por exemplo: `portfolio-nexus` ou `gabriel-exe`).
   - Mantenha como Público e **não** marque as opções de adicionar README ou .gitignore (eles já estão prontos aqui).
   - Clique em **Create repository**.

2. **Inicie o Git localmente e envie os arquivos:**
   ```bash
   # 1. Iniciar o repositório git local (se ainda não iniciado)
   git init

   # 2. Adicionar todos os arquivos ao controle de versão
   git add .

   # 3. Criar o commit inicial
   git commit -m "feat: initial commit - GABRIEL.EXE NEXUS portfolio"

   # 4. Definir a branch principal como main
   git branch -M main

   # 5. Conectar com o seu repositório remoto no GitHub
   # (substitua SEU-REPOSITORIO pelo nome criado)
   git remote add origin https://github.com/Castilho-bit/SEU-REPOSITORIO.git

   # 6. Fazer o envio para o GitHub
   git push -u origin main
   ```

---

## 🌐 Como Publicar na Vercel

O projeto já inclui o arquivo `vercel.json` pré-configurado para deploy imediato:

1. Acesse [vercel.com](https://vercel.com/) e faça login com sua conta do GitHub.
2. Clique em **Add New...** > **Project**.
3. Selecione o repositório que você enviou para o seu GitHub (`Castilho-bit/SEU-REPOSITORIO`).
4. A Vercel detectará automaticamente o framework Vite:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Clique em **Deploy**. Em menos de 1 minuto, seu portfólio estará online com certificado SSL gratuito e alta velocidade global!

---

## 🎨 Paleta de Cores e Identidade

| Elemento | Código HEX | Amostra |
| :--- | :--- | :--- |
| **Preto Espacial** | `#08080D` | Fundo principal do universo |
| **Cinza Escuro** | `#14141D` | Painéis e cartões holográficos |
| **Roxo Neon** | `#A855F7` | Iluminação primária e estruturas |
| **Azul Elétrico** | `#38BDF8` | Destaques cibernéticos e conexões |
| **Branco Suave** | `#F4F4F8` | Tipografia com legibilidade máxima |

---

*Desenvolvido com dedicação, criatividade e código limpo para Gabriel Castilho Macedo.*

