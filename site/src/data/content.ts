import {
  History,
  Columns3,
  Gauge,
  Filter,
  ShieldCheck,
  Network,
} from 'lucide-react'

export const repo = 'https://github.com/rhyan05/ACOMPANHAMENTO-E-REGISTRO-DE-SERVI-OS-EMPRESARIAIS'

export const nav = [
  { href: '#problema', label: 'Problema' },
  { href: '#recursos', label: 'Recursos' },
  { href: '#telas', label: 'Telas' },
  { href: '#impacto', label: 'Impacto' },
  { href: '#tecnologias', label: 'Tecnologias' },
  { href: '#executar', label: 'Como rodar' },
]

export const hipoteses = [
  {
    sigla: 'H1',
    titulo: 'Rastreabilidade',
    texto:
      'Centralizar e documentar os fluxos de forma estruturada aumenta a rastreabilidade e reduz o tempo de acompanhamento das atividades.',
  },
  {
    sigla: 'H2',
    titulo: 'Decisão com dados',
    texto:
      'Painéis gráficos automatizados melhoram a velocidade e a assertividade da tomada de decisão gerencial.',
  },
  {
    sigla: 'H3',
    titulo: 'Maturidade de processo',
    texto:
      'Uma plataforma digital integrada eleva a maturidade dos processos e o cumprimento de prazos.',
  },
]

export const features = [
  {
    icon: History,
    titulo: 'Rastreabilidade total',
    texto:
      'Cada mudança de status, responsável ou prazo gera um registro imutável no histórico — com autor e timestamp.',
  },
  {
    icon: Columns3,
    titulo: 'Kanban por equipe',
    texto:
      'Visão de fluxo por operação e equipe, com etapas, responsáveis e movimentação de cartões em tempo real.',
  },
  {
    icon: Gauge,
    titulo: 'Indicadores automáticos',
    texto:
      'SLA, tempo médio de ciclo (TMA), carga de trabalho e retrabalho calculados automaticamente, sem planilhas.',
  },
  {
    icon: Filter,
    titulo: 'Painéis de decisão',
    texto:
      'Gráficos de distribuição por status e prioridade, carga por responsável e progresso por fluxo, com filtros dinâmicos.',
  },
  {
    icon: ShieldCheck,
    titulo: 'Perfis de acesso',
    texto:
      'Papéis Operacional e Gestor, com permissões distintas e visão adequada para cada nível de responsabilidade.',
  },
  {
    icon: Network,
    titulo: 'Multi-operações e equipes',
    texto:
      'Organize vários fluxos, times e prazos no mesmo ambiente, com atribuição clara de responsabilidades.',
  },
]

export const screenshots = [
  {
    src: '/screenshots/dashboard.png',
    titulo: 'Dashboard gerencial',
    descricao:
      'KPIs de aderência a prazos, TMA e retrabalho, além de gráficos de status, prioridade e carga por responsável.',
    destaque: true,
  },
  {
    src: '/screenshots/andamento.png',
    titulo: 'Andamento do projeto',
    descricao: 'Progresso consolidado por equipe e por fluxo, etapa a etapa.',
  },
  {
    src: '/screenshots/kanban.png',
    titulo: 'Kanban de tarefas',
    descricao: 'Fluxo visual das tarefas da operação, movimentadas entre etapas e status.',
  },
  {
    src: '/screenshots/operacoes.png',
    titulo: 'Operações',
    descricao: 'Cadastro e acompanhamento das operações e de suas equipes.',
  },
  {
    src: '/screenshots/admin.png',
    titulo: 'Administração',
    descricao: 'Gestão de colaboradores, funções e níveis de acesso.',
  },
  {
    src: '/screenshots/login.png',
    titulo: 'Autenticação',
    descricao: 'Login com JWT e controle de acesso por perfil.',
  },
  {
    src: '/screenshots/dashboard-dark.png',
    titulo: 'Tema escuro',
    descricao: 'Interface adaptável com alternância entre tema claro e escuro.',
  },
]

export const metrics = [
  { valor: '< 3', rotulo: 'cliques para achar responsável, prazo e gargalo', sufixo: '' },
  { valor: '100', rotulo: 'das transições de status registradas com autoria', sufixo: '%' },
  { valor: '0', rotulo: 'planilhas manuais para consolidar indicadores', sufixo: '' },
  { valor: '24/7', rotulo: 'painéis atualizados automaticamente', sufixo: '' },
]

export const tech = [
  {
    area: 'Front-end',
    itens: ['React 19', 'Vite', 'TypeScript', 'Tailwind CSS v4', 'Recharts', 'Lucide'],
  },
  {
    area: 'Back-end',
    itens: ['Node.js', 'Express', 'Prisma ORM', 'JWT', 'Zod'],
  },
  {
    area: 'Dados & Infra',
    itens: ['SQLite', 'Docker', 'Docker Compose', 'Nginx', 'GitHub Actions'],
  },
]
