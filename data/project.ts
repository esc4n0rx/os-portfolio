import { Project } from '@/types/project'

export const projectsData: Project[] = [
  {
    id: "ecommerce",
    name: "E-commerce Platform",
    description: "Plataforma completa de e-commerce",
    tech: ["Next.js", "TypeScript", "Stripe", "Prisma"],
    type: "folder",
    icon: "🛒",
    color: "text-blue-500",
    content: {
      overview: `
Este projeto é uma plataforma completa de e-commerce desenvolvida com as mais modernas tecnologias web. 
O objetivo foi criar uma experiência de compra fluida e segura, com foco na performance e usabilidade.

A aplicação permite que usuários naveguem por produtos, adicionem itens ao carrinho, 
realizem pagamentos seguros e acompanhem seus pedidos em tempo real.
      `,
      features: [
        "Catálogo de produtos com filtros avançados",
        "Carrinho de compras persistente",
        "Sistema de pagamento integrado com Stripe",
        "Painel administrativo para gestão de produtos",
        "Sistema de autenticação e autorização",
        "Notificações em tempo real",
        "Design responsivo e otimizado",
        "SEO otimizado para produtos"
      ],
      challenges: [
        "Implementação de pagamentos seguros com webhooks do Stripe",
        "Otimização de performance para catálogos grandes",
        "Gerenciamento de estado complexo do carrinho",
        "Implementação de filtros dinâmicos sem reload da página",
        "Sincronização de estoque em tempo real"
      ],
      technologies: [
        {
          name: "Next.js 14",
          description: "Framework React com App Router para renderização server-side",
          category: "frontend"
        },
        {
          name: "TypeScript",
          description: "Tipagem estática para maior segurança e produtividade",
          category: "frontend"
        },
        {
          name: "Tailwind CSS",
          description: "Framework CSS utilitário para design consistente",
          category: "frontend"
        },
        {
          name: "Prisma",
          description: "ORM moderno para interação com banco de dados",
          category: "database"
        },
        {
          name: "PostgreSQL",
          description: "Banco de dados relacional para dados estruturados",
          category: "database"
        },
        {
          name: "Stripe",
          description: "Plataforma de pagamentos online",
          category: "backend"
        },
        {
          name: "Vercel",
          description: "Plataforma de deploy otimizada para Next.js",
          category: "deployment"
        }
      ],
      demo: "https://ecommerce-demo.vercel.app",
      github: "https://github.com/usuario/ecommerce-platform",
      learnings: [
        "Domínio completo do ecossistema Next.js 14 com App Router",
        "Implementação de sistemas de pagamento seguros",
        "Otimização de performance em aplicações React",
        "Gerenciamento de estado complexo com Zustand",
        "Práticas de SEO para e-commerce"
      ]
    }
  },
  {
    id: "taskmanager",
    name: "Task Management App",
    description: "App de gerenciamento de tarefas colaborativo",
    tech: ["React", "Node.js", "MongoDB", "Socket.io"],
    type: "folder",
    icon: "📋",
    color: "text-green-500",
    content: {
      overview: `
Aplicação de gerenciamento de tarefas colaborativo inspirada em ferramentas como Trello e Asana. 
O foco foi criar uma interface intuitiva para equipes organizarem seus projetos e acompanharem 
o progresso em tempo real.

A aplicação oferece funcionalidades de kanban board, chat em tempo real, 
notificações push e relatórios de produtividade.
      `,
      features: [
        "Kanban board com drag & drop",
        "Colaboração em tempo real",
        "Sistema de comentários nas tarefas",
        "Notificações push",
        "Relatórios de produtividade",
        "Filtros e busca avançada",
        "Calendário integrado",
        "Anexos em tarefas"
      ],
      challenges: [
        "Sincronização em tempo real entre múltiplos usuários",
        "Implementação de drag & drop performático",
        "Gerenciamento de permissões de acesso",
        "Otimização de queries no MongoDB",
        "Implementação de notificações push"
      ],
      technologies: [
        {
          name: "React 18",
          description: "Biblioteca para construção de interfaces de usuário",
          category: "frontend"
        },
        {
          name: "Node.js",
          description: "Runtime JavaScript server-side",
          category: "backend"
        },
        {
          name: "Express.js",
          description: "Framework web minimalista para Node.js",
          category: "backend"
        },
        {
          name: "MongoDB",
          description: "Banco de dados NoSQL orientado a documentos",
          category: "database"
        },
        {
          name: "Socket.io",
          description: "Biblioteca para comunicação em tempo real",
          category: "backend"
        },
        {
          name: "JWT",
          description: "Tokens para autenticação segura",
          category: "backend"
        }
      ],
      demo: "https://taskmanager-demo.netlify.app",
      github: "https://github.com/usuario/task-manager",
      learnings: [
        "Desenvolvimento full-stack com JavaScript",
        "Implementação de funcionalidades em tempo real",
        "Gerenciamento de estado complexo em React",
        "Otimização de performance em aplicações colaborativas",
        "Padrões de arquitetura escalável"
      ]
    }
  },
  {
    id: "portfolio",
    name: "Portfolio OS",
    description: "Portfólio em formato de sistema operacional",
    tech: ["Next.js", "Framer Motion", "Zustand", "Tailwind"],
    type: "folder",
    icon: "💻",
    color: "text-purple-500",
    content: {
      overview: `
Este é o projeto atual que você está visualizando! Um portfólio único que simula 
um sistema operacional completo, incluindo boot screen, login, desktop com ícones, 
janelas arrastáveis e um menu iniciar funcional.

O objetivo foi criar uma experiência imersiva e interativa que demonstrasse 
habilidades técnicas de forma criativa e memorável.
      `,
      features: [
        "Simulação completa de boot do sistema",
        "Tela de login animada",
        "Desktop interativo com ícones",
        "Sistema de janelas arrastáveis",
        "Menu iniciar funcional",
        "Taskbar com relógio",
        "Animações fluidas",
        "Gerenciamento de estado de janelas"
      ],
      challenges: [
        "Criação de um sistema de janelas complexo",
        "Animações performáticas com Framer Motion",
        "Gerenciamento de estado de múltiplas janelas",
        "Design system consistente",
        "Otimização para diferentes dispositivos"
      ],
      technologies: [
        {
          name: "Next.js 14",
          description: "Framework React com App Router",
          category: "frontend"
        },
        {
          name: "Framer Motion",
          description: "Biblioteca de animações para React",
          category: "frontend"
        },
        {
          name: "Zustand",
          description: "Gerenciamento de estado leve e flexível",
          category: "frontend"
        },
        {
          name: "Tailwind CSS",
          description: "Framework CSS utilitário",
          category: "frontend"
        },
        {
          name: "TypeScript",
          description: "Superset tipado do JavaScript",
          category: "frontend"
        },
        {
          name: "Lucide React",
          description: "Biblioteca de ícones moderna",
          category: "tools"
        }
      ],
      github: "https://github.com/usuario/portfolio-os",
      learnings: [
        "Criação de interfaces complexas e interativas",
        "Domínio avançado do Framer Motion",
        "Padrões de design de sistemas operacionais",
        "Otimização de performance em animações",
        "Arquitetura de componentes escalável"
      ]
    }
  }
]