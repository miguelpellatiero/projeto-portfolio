# Jack's 3D Creator Portfolio

Um portfólio moderno e responsivo desenvolvido com **React**, **TypeScript**, **Tailwind CSS** e **Framer Motion**. A aplicação apresenta animações fluidas, design minimalista e uma experiência de usuário intuitiva.

## 🎨 Características

- **Animações Avançadas** - Powered by Framer Motion
- **Design Responsivo** - Mobile-first com Tailwind CSS
- **Componentes Reutilizáveis** - Estrutura modular e escalável
- **Efeitos Interativos** - Magnet effect, fade-in animations, scroll-based animations
- **TypeScript** - Type safety completo
- **Vite** - Build tool rápido e moderno
- **Modern UI** - Design contemporâneo com gradientes e ícones

## 📋 Requisitos

- Node.js 16+ 
- npm ou yarn

## 🚀 Instalação

1. **Clone ou acesse a pasta do projeto:**
```bash
cd projeto-portfolio
```

2. **Instale as dependências:**
```bash
npm install
```

## 🔧 Scripts Disponíveis

```bash
# Inicia o servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build de produção
npm run preview

# Lint do código
npm run lint
```

## 📁 Estrutura do Projeto

```
projeto-portfolio/
├── src/
│   ├── App.tsx              # Componente principal com todas as seções
│   ├── main.tsx             # Ponto de entrada da aplicação
│   └── index.css            # Estilos globais
├── index.html               # Arquivo HTML principal
├── package.json             # Dependências do projeto
├── tsconfig.json            # Configuração TypeScript
├── tailwind.config.js       # Configuração Tailwind CSS
├── postcss.config.js        # Configuração PostCSS
├── vite.config.ts           # Configuração Vite
└── .gitignore               # Arquivos ignorados pelo Git
```

## 📦 Dependências Principais

- **React** - Framework UI
- **Framer Motion** - Biblioteca de animações
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Ícones SVG
- **TypeScript** - Tipagem estática
- **Vite** - Build tool

## 🎯 Componentes Principais

### HeroSection
Seção principal com navegação, retrato magnético e CTA.

### MarqueeSection
Carousel com imagens que se movem com scroll parallax.

### AboutSection
Descrição com animação de texto por caractere.

### ServicesSection
Lista de serviços com ícones e hover effects.

### ProjectsSection
Cards de projetos com sticky stacking animation.

### ContactFooterSection
Rodapé com informações de contato.

## 🎨 Componentes Reutilizáveis

- **FadeIn** - Animação fade-in ao scrollar
- **Magnet** - Efeito magnético ao mover o mouse
- **AnimatedText** - Animação de texto com scroll
- **ContactButton** - Botão com gradient
- **LiveProjectButton** - Botão outline

## 🔗 URLs de Recursos

- Google Fonts: Kanit
- Imagens: Figma CDN, Higgs AI
- Animações: Framer Motion

## 📝 Customização

### Cores
As cores principais estão definidas no arquivo `App.tsx`:
- Background Dark: `#0C0C0C`
- Text Light: `#D7E2EA`
- Primary Gradient: Múltiplas cores

### Fonts
Personalize a fonte no `GOOGLE_FONTS_LINK` ou `tailwind.config.js`.

### Conteúdo
Edite os dados dos projetos, serviços e textos diretamente no `App.tsx`.

## 🚀 Deploy

### Vercel
```bash
npm run build
```
E faça upload da pasta `dist` para Vercel.

### Netlify
```bash
npm run build
```
Conecte o repositório ao Netlify.

## 📄 Licença

Todos os direitos reservados © 2026 Jack Creative Studio.

## 👤 Autor

Jack - 3D Creator & Designer

---

**Desenvolvido com ❤️ usando React, TypeScript e Tailwind CSS**
