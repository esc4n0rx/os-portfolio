import { Project } from '@/types/project'

export const projectsData: Project[] = [
  {
    id: "poupadin",
    name: "PoupaDin",
    description: "App em React Native para gerenciamento de finanças",
    tech: ["React Native", "TypeScript", "Firebase"],
    type: "folder",
    icon: "💰",
    color: "text-green-500",
    content: {
      overview: `
O PoupaDin é um aplicativo móvel multiplataforma, construído com React Native, projetado para ajudar usuários a assumirem o controle de suas vidas financeiras. O app permite a criação de orçamentos personalizados, o rastreamento detalhado de despesas e receitas, e o planejamento de metas de economia, tudo em uma interface intuitiva e amigável.
      `,
      features: [
        "Criação de orçamento mensal personalizado",
        "Registro rápido de despesas e receitas",
        "Categorização automática de gastos",
        "Definição e acompanhamento de metas de economia",
        "Gráficos e relatórios visuais sobre a saúde financeira",
        "Notificações para lembrar de contas a pagar",
        "Sincronização de dados na nuvem com Firebase"
      ],
      challenges: [
        "Garantir a segurança dos dados financeiros do usuário",
        "Criar uma experiência de usuário fluida e rápida em diferentes dispositivos",
        "Implementar gráficos interativos e performáticos para visualização de dados",
        "Gerenciar o estado global da aplicação de forma eficiente",
        "Configurar a sincronização de dados em tempo real com o Firebase Firestore"
      ],
      technologies: [
        {
          name: "React Native",
          description: "Framework para desenvolvimento de apps móveis nativos com JavaScript",
          category: "frontend"
        },
        {
          name: "TypeScript",
          description: "Superset do JavaScript que adiciona tipagem estática",
          category: "language"
        },
        {
          name: "Expo",
          description: "Plataforma e conjunto de ferramentas para facilitar o desenvolvimento com React Native",
          category: "tools"
        },
        {
          name: "Firebase (Firestore & Authentication)",
          description: "Plataforma BaaS (Backend as a Service) para autenticação e banco de dados NoSQL em tempo real",
          category: "backend"
        },
        {
          name: "Zustand",
          description: "Gerenciador de estado simples e poderoso para React",
          category: "frontend"
        }
      ],
      demo: "https://link-para-o-app-na-loja.com",
      github: "https://github.com/seu-usuario/poupadin",
      learnings: [
        "Desenvolvimento de aplicações móveis multiplataforma com React Native",
        "Uso do Firebase como um backend completo para autenticação e banco de dados",
        "Gerenciamento de estado complexo em aplicações móveis",
        "Publicação de aplicativos nas lojas (Google Play Store e Apple App Store)",
        "Criação de interfaces de usuário responsivas para diversos tamanhos de tela"
      ]
    }
  },
  {
    id: "gtracker",
    name: "Gtracker",
    description: "Web Fórum em Next.js para conteúdo privado",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    type: "folder",
    icon: "🌐",
    color: "text-blue-500",
    content: {
      overview: `
O Gtracker é uma plataforma web exclusiva, desenvolvida com Next.js, que funciona como um fórum para gerenciamento e discussão de conteúdos privados. O sistema foi projetado para comunidades que precisam de um espaço seguro para compartilhar conhecimento, com controle de acesso baseado em papéis e um sistema de tópicos e postagens bem estruturado.
      `,
      features: [
        "Autenticação segura de usuários e gerenciamento de perfis",
        "Criação de tópicos e postagens com editor de texto rico (Markdown)",
        "Sistema de comentários e respostas aninhadas",
        "Controle de acesso a conteúdos baseado em permissões de usuário",
        "Busca avançada por tópicos e conteúdos",
        "Design responsivo otimizado para desktop e mobile"
      ],
      challenges: [
        "Implementar um sistema de autorização robusto para proteger o conteúdo privado",
        "Estruturar o banco de dados com Prisma para suportar relações complexas (usuários, tópicos, posts)",
        "Otimizar a renderização de longas listas de discussão no lado do servidor (SSR)",
        "Garantir a segurança contra ataques comuns em aplicações web (XSS, CSRF)",
        "Desenvolver uma experiência de usuário intuitiva para a navegação no fórum"
      ],
      technologies: [
        {
          name: "Next.js 14",
          description: "Framework React com renderização Server-Side (SSR) e Static Site Generation (SSG)",
          category: "frontend"
        },
        {
          name: "TypeScript",
          description: "Tipagem estática para um código mais robusto e seguro",
          category: "language"
        },
        {
          name: "Prisma",
          description: "ORM (Object-Relational Mapping) de última geração para Node.js e TypeScript",
          category: "database"
        },
        {
          name: "PostgreSQL",
          description: "Banco de dados relacional poderoso e de código aberto",
          category: "database"
        },
        {
          name: "Tailwind CSS",
          description: "Framework CSS utility-first para criação rápida de interfaces",
          category: "frontend"
        },
        {
          name: "NextAuth.js",
          description: "Biblioteca para simplificar a autenticação em projetos Next.js",
          category: "backend"
        }
      ],
      demo: "https://gtracker-demo.vercel.app",
      github: "https://github.com/seu-usuario/gtracker",
      learnings: [
        "Desenvolvimento full-stack com a stack T3 (Next.js, TypeScript, Tailwind, Prisma)",
        "Modelagem de dados complexos e gerenciamento de migrações com Prisma",
        "Implementação de autenticação e autorização seguras em aplicações web",
        "Otimização de performance com estratégias de renderização do Next.js (SSR, ISR)",
        "Criação de APIs internas no Next.js para comunicação com o frontend"
      ]
    }
  },
  {
    id: "wally",
    name: "Wally",
    description: "PWA para download de wallpapers 4K sem anúncios",
    tech: ["React", "PWA", "Firebase"],
    type: "folder",
    icon: "🖼️",
    color: "text-red-500",
    content: {
      overview: `
Wally é um Progressive Web App (PWA) criado para oferecer uma experiência limpa e focada no download de wallpapers de alta resolução (4K). O grande diferencial do projeto é ser totalmente livre de anúncios, proporcionando uma navegação fluida e agradável. Os usuários podem instalar o app em seus dispositivos para acesso rápido e offline.
      `,
      features: [
        "Galeria de wallpapers em alta resolução (4K)",
        "Interface limpa, rápida e sem anúncios",
        "Funcionalidades de Progressive Web App (PWA) para instalação no dispositivo",
        "Busca e sistema de categorias para encontrar wallpapers",
        "Download direto com um clique",
        "Modo offline para visualizar imagens já carregadas"
      ],
      challenges: [
        "Otimizar o carregamento e a exibição de imagens de alta resolução sem comprometer a performance",
        "Implementar a funcionalidade de Service Worker para o PWA funcionar offline",
        "Gerenciar o armazenamento em cache de forma eficiente para economizar dados do usuário",
        "Criar uma interface que seja igualmente funcional em telas de celular, tablet e desktop",
        "Integrar com uma API de imagens ou gerenciar o armazenamento próprio (ex: Firebase Storage)"
      ],
      technologies: [
        {
          name: "React",
          description: "Biblioteca JavaScript para construir interfaces de usuário",
          category: "frontend"
        },
        {
          name: "PWA (Progressive Web App)",
          description: "Conjunto de tecnologias (Service Workers, Manifest) para criar apps web instaláveis",
          category: "frontend"
        },
        {
          name: "Firebase Storage",
          description: "Serviço para armazenamento e gerenciamento de arquivos na nuvem",
          category: "backend"
        },
        {
          name: "CSS Modules",
          description: "Estilização com escopo local para componentes React",
          category: "frontend"
        },
        {
            name: "Vite",
            description: "Ferramenta de build extremamente rápida para desenvolvimento web moderno",
            category: "tools"
        }
      ],
      demo: "https://wally-pwa-demo.netlify.app",
      github: "https://github.com/seu-usuario/wally-pwa",
      learnings: [
        "Construção e configuração de um Progressive Web App (PWA) do zero",
        "Uso avançado de Service Workers para caching e funcionalidades offline",
        "Técnicas de otimização de performance para aplicações com muitas imagens (Lazy Loading)",
        "Publicação de um PWA e promoção da sua instalação",
        "Consumo e gerenciamento de arquivos de um serviço de armazenamento em nuvem"
      ]
    }
  },
  {
    id: "portfolio-os",
    name: "Portfolio OS",
    description: "Portfólio interativo que simula um sistema operacional",
    tech: ["Next.js", "Framer Motion", "Zustand"],
    type: "folder",
    icon: "💻",
    color: "text-purple-500",
    content: {
      overview: `
Este projeto é uma abordagem criativa e técnica para um portfólio pessoal. Ele simula a interface de um sistema operacional desktop, onde cada "programa" ou "arquivo" aberto em uma janela representa um projeto, uma habilidade ou uma informação sobre mim. O objetivo é criar uma experiência imersiva e memorável para o visitante, demonstrando proficiência em desenvolvimento de interfaces complexas e animações.
      `,
      features: [
        "Interface de desktop com ícones arrastáveis",
        "Sistema de janelas que podem ser abertas, fechadas, minimizadas e arrastadas",
        "Menu 'Iniciar' para navegação entre as seções (projetos, sobre, contato)",
        "Barra de tarefas com janelas ativas e relógio funcional",
        "Animações fluidas e performáticas com Framer Motion",
        "Design responsivo que se adapta para uma experiência 'mobile OS'"
      ],
      challenges: [
        "Desenvolver um sistema de gerenciamento de janelas (window manager) do zero",
        "Orquestrar animações complexas com Framer Motion de forma performática",
        "Gerenciar o estado global das janelas (posição, tamanho, estado) com Zustand",
        "Garantir a acessibilidade em uma interface não convencional",
        "Criar uma lógica para sobreposição e foco de janelas (z-index)"
      ],
      technologies: [
        {
          name: "Next.js 14",
          description: "Framework React para renderização otimizada e estrutura de projeto",
          category: "frontend"
        },
        {
          name: "Framer Motion",
          description: "Biblioteca de animação poderosa e declarativa para React",
          category: "frontend"
        },
        {
          name: "Zustand",
          description: "Gerenciador de estado minimalista para React, ideal para gerenciar o estado das janelas",
          category: "frontend"
        },
        {
          name: "Tailwind CSS",
          description: "Framework CSS utility-first para estilização rápida e consistente",
          category: "frontend"
        },
        {
          name: "TypeScript",
          description: "Adiciona tipagem estática ao JavaScript para maior segurança no código",
          category: "language"
        },
        {
          name: "Lucide React",
          description: "Biblioteca de ícones SVG leves e customizáveis",
          category: "tools"
        }
      ],
      github: "https://github.com/seu-usuario/portfolio-os",
      learnings: [
        "Domínio avançado de animações em React com Framer Motion",
        "Criação de interfaces de usuário complexas e altamente interativas (arrastar e soltar, redimensionar)",
        "Arquitetura de componentes para aplicações de grande escala e interatividade",
        "Gerenciamento de estado complexo e não-linear com Zustand",
        "Aplicação de princípios de design de UI/UX de sistemas operacionais"
      ]
    }
  }
]