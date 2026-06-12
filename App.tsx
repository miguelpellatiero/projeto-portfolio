import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Menu, X, Layers, Paintbrush, Video, Compass, Monitor } from 'lucide-react';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

interface ProjectData {
  id: string;
  title: string;
  category: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
}

// ============================================================================
// STYLES & CONFIGURATIONS
// ============================================================================
const GOOGLE_FONTS_LINK = "https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;700;900&display=swap";

// 21 GIF URLs from motionsites.ai
const MARQUEE_IMAGES = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif"
];

const GLOBAL_INLINE_STYLES = `
  @import url('${GOOGLE_FONTS_LINK}');
  html, body, #root {
    background-color: #0C0C0C;
    color: #D7E2EA;
    font-family: 'Kanit', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  .hero-heading {
    background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #0C0C0C;
  }
  ::-webkit-scrollbar-thumb {
    background: #2A2A2A;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #404040;
  }
`;

// ============================================================================
// REUSABLE COMPONENTS
// ============================================================================

export const ContactButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-white transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none"
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
    >
      Contact Me
    </button>
  );
};

export const LiveProjectButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="rounded-full border-2 border-[#D7E2EA] px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest text-[#D7E2EA] transition-all duration-300 hover:bg-[#D7E2EA]/10 active:scale-95 focus:outline-none"
    >
      Live Project
    </button>
  );
};

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = 'div',
  className = '',
}) => {
  const Component = motion[as] as any;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </Component>
  );
};

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: 'translate3d(0px, 0px, 0px)',
    willChange: 'transform',
    transition: inactiveTransition,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      if (
        Math.abs(distanceX) < rect.width / 2 + padding &&
        Math.abs(distanceY) < rect.height / 2 + padding
      ) {
        setStyle({
          transform: `translate3d(${distanceX / strength}px, ${distanceY / strength}px, 0px)`,
          willChange: 'transform',
          transition: activeTransition,
        });
      } else {
        setStyle({
          transform: 'translate3d(0px, 0px, 0px)',
          willChange: 'transform',
          transition: inactiveTransition,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
};

export const AnimatedText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = useMemo(() => text.split(' '), [text]);
  const totalChars = text.length;
  
  let accumulatedIndex = 0;

  return (
    <p ref={containerRef} className={`${className} flex flex-wrap justify-center`}>
      {words.map((word, wordIndex) => {
        return (
          <span key={wordIndex} className="mr-[0.35em] inline-flex whitespace-nowrap">
            {word.split('').map((char) => {
              const charIndex = accumulatedIndex++;
              const startRange = charIndex / totalChars;
              const endRange = (charIndex + 1) / totalChars;
              
              return (
                <CharacterSpan
                  key={charIndex}
                  char={char}
                  progress={scrollYProgress}
                  range={[startRange, endRange]}
                />
              );
            })}
          </span>
        );
      })}
    </p>
  );
};

const CharacterSpan: React.FC<{
  char: string;
  progress: any;
  range: [number, number];
}> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative inline-block">
      <span className="opacity-20">{char}</span>
      <motion.span style={{ opacity }} className="absolute top-0 left-0 text-[#D7E2EA]">
        {char}
      </motion.span>
    </span>
  );
};

// ============================================================================
// CORE PORTFOLIO SECTIONS
// ============================================================================

const HeroSection: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative flex h-screen w-full flex-col justify-between overflow-x-clip px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 bg-[#0C0C0C]">
      {/* Navbar */}
      <FadeIn delay={0} y={-20} as="nav" className="flex w-full items-center justify-between pt-6 md:pt-8 z-20">
        {['About', 'Price', 'Projects', 'Contact'].map((link) => (
          <button
            key={link}
            onClick={() => scrollToSection(link === 'Price' ? 'services' : link.toLowerCase())}
            className="text-sm md:text-lg lg:text-[1.4rem] font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
          >
            {link}
          </button>
        ))}
      </FadeIn>

      {/* Hero Portrait - Magnetic Centered */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 z-10">
        <FadeIn delay={0.6} y={30}>
          <Magnet
            padding={150}
            strength={3}
            className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] aspect-[4/5] overflow-hidden rounded-[2rem]"
          >
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
              alt="Jack Portrait"
              className="h-full w-full object-cover pointer-events-none scale-105"
              loading="eager"
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* Hero Heading Container */}
      <div className="relative w-full z-0 flex justify-center items-center flex-1">
        <div className="overflow-hidden w-full mt-6 sm:mt-4 md:-mt-5">
          <FadeIn delay={0.15} y={40} as="div">
            <h1 className="hero-heading text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] font-black uppercase tracking-tight leading-none text-center whitespace-nowrap select-none w-full">
              Hi, i&apos;m jack
            </h1>
          </FadeIn>
        </div>
      </div>

      {/* Bottom Layout Row */}
      <div className="relative flex w-full items-end justify-between z-20 mt-auto">
        <FadeIn delay={0.35} y={20} className="w-1/2">
          <p 
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20} className="w-1/2 flex justify-end">
          <ContactButton onClick={() => scrollToSection('contact')} />
        </FadeIn>
      </div>
    </section>
  );
};

const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const topOfSection = window.scrollY + rect.top;
      const offsetCalculated = (window.scrollY - topOfSection + window.innerHeight) * 0.3;
      setScrollOffset(offsetCalculated);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger initial position setup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const row1Images = useMemo(() => [...MARQUEE_IMAGES.slice(0, 11), ...MARQUEE_IMAGES.slice(0, 11), ...MARQUEE_IMAGES.slice(0, 11)], []);
  const row2Images = useMemo(() => [...MARQUEE_IMAGES.slice(11), ...MARQUEE_IMAGES.slice(11), ...MARQUEE_IMAGES.slice(11)], []);

  const translateRow1 = scrollOffset - 200;
  const translateRow2 = -(scrollOffset - 200);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10">
      <div className="flex flex-col gap-3">
        {/* Row 1 - Moves Right */}
        <div 
          className="flex gap-3 transition-transform duration-75 ease-out"
          style={{ 
            transform: `translateX(${translateRow1}px)`,
            willChange: 'transform'
          }}
        >
          {row1Images.map((src, idx) => (
            <div key={`r1-${idx}`} className="w-[420px] h-[270px] shrink-0 rounded-2xl overflow-hidden bg-[#1A1A1A]">
              <img src={src} alt="3D Showcase Minimalist" className="h-full w-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>

        {/* Row 2 - Moves Left */}
        <div 
          className="flex gap-3 transition-transform duration-75 ease-out"
          style={{ 
            transform: `translateX(${translateRow2}px)`,
            willChange: 'transform'
          }}
        >
          {row2Images.map((src, idx) => (
            <div key={`r2-${idx}`} className="w-[420px] h-[270px] shrink-0 rounded-2xl overflow-hidden bg-[#1A1A1A]">
              <img src={src} alt="3D Motion Graphic Render" className="h-full w-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C]">
      {/* Decorative 3D Corner Graphics */}
      <FadeIn delay={0.1} x={-80} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="3D Floating Moon Element"
          className="w-[120px] sm:w-[160px] md:w-[210px] object-contain drop-shadow-2xl animate-pulse"
          style={{ animationDuration: '4s' }}
        />
      </FadeIn>

      <FadeIn delay={0.25} x={-80} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-10">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt="Abstract 3D Shape Asset"
          className="w-[100px] sm:w-[140px] md:w-[180px] object-contain dynamic-rotation"
        />
      </FadeIn>

      <FadeIn delay={0.15} x={80} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt="3D Geometric Block Module"
          className="w-[120px] sm:w-[160px] md:w-[210px] object-contain"
        />
      </FadeIn>

      <FadeIn delay={0.3} x={80} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-10">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt="3D Floating Group Composition"
          className="w-[130px] sm:w-[170px] md:w-[220px] object-contain scale-110"
        />
      </FadeIn>

      {/* Main Container Layout */}
      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16 max-w-4xl text-center z-20">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
            About me
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24 w-full">
          <AnimatedText 
            text="With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!"
            className="font-medium text-[#D7E2EA] leading-relaxed max-w-[560px]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />
          
          <ContactButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} />
        </div>
      </div>
    </section>
  );
};

const ServicesSection: React.FC = () => {
  const services = [
    { num: "01", name: "3D Modeling", desc: "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.", icon: Layers },
    { num: "02", name: "Rendering", desc: "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.", icon: Paintbrush },
    { num: "03", name: "Motion Design", desc: "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.", icon: Video },
    { num: "04", name: "Branding", desc: "Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.", icon: Compass },
    { num: "05", name: "Web Design", desc: "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.", icon: Monitor }
  ];

  return (
    <section id="services" className="relative w-full bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 z-20">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <h2 className="font-black uppercase centered tracking-tight leading-none mb-16 sm:mb-20 md:mb-28 text-[#0C0C0C]" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
          Services
        </h2>

        <div className="w-full flex flex-col border-t border-black/15">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <FadeIn 
                key={service.num} 
                delay={index * 0.1} 
                y={30}
                className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-black/15 py-8 sm:py-10 md:py-12 gap-6 md:gap-12 group hover:bg-black/[0.02] px-4 transition-colors duration-300"
              >
                <div className="flex items-center gap-6 sm:gap-10">
                  <span className="font-black leading-none text-[#0C0C0C]" style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}>
                    {service.num}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-medium uppercase flex items-center gap-3 text-[#0C0C0C]" style={{ fontSize: 'clamp(1.1rem, 2.2vw, 2.1rem)' }}>
                      {service.name}
                      <Icon className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-black/60 hidden sm:inline" />
                    </h3>
                    <p className="font-light leading-relaxed max-w-2xl text-black/60" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}>
                      {service.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: ProjectData; index: number; totalCards: number; progress: any }> = ({
  project,
  index,
  totalCards,
  progress
}) => {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / totalCards, 1], [1, targetScale]);

  return (
    <div className="sticky h-[85vh] w-full flex items-center justify-center" style={{ top: `calc(5rem + ${index * 28}px)` }}>
      <motion.div 
        style={{ scale }}
        className="w-full h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.8)]"
      >
        {/* Card Header Structure */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D7E2EA]/10 pb-4 md:pb-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="font-black text-white leading-none" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}>
              {project.id}
            </span>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/50">{project.category}</span>
              <h3 className="text-lg sm:text-2xl md:text-3xl font-bold uppercase text-white tracking-wide">{project.title}</h3>
            </div>
          </div>
          <LiveProjectButton />
        </div>

        {/* Card Two-Column Fluid Media Layout */}
        <div className="grid grid-cols-10 gap-3 sm:gap-4 md:gap-5 flex-1 mt-4 md:mt-6 overflow-hidden items-stretch">
          {/* Left Stack Column (40%) */}
          <div className="col-span-4 flex flex-col gap-3 sm:gap-4 md:gap-5 h-full">
            <div className="w-full flex-1 min-h-[120px] rounded-[24px] sm:rounded-[36px] md:rounded-[40px] overflow-hidden bg-neutral-900 border border-neutral-800">
              <img src={project.col1Img1} alt={`${project.title} Render Perspective`} className="w-full h-full object-cover select-none pointer-events-none hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="w-full flex-[1.3] min-h-[140px] rounded-[24px] sm:rounded-[36px] md:rounded-[40px] overflow-hidden bg-neutral-900 border border-neutral-800">
              <img src={project.col1Img2} alt={`${project.title} Detailed Macro`} className="w-full h-full object-cover select-none pointer-events-none hover:scale-105 transition-transform duration-700" />
            </div>
          </div>

          {/* Right Hero Column (60%) */}
          <div className="col-span-6 h-full rounded-[24px] sm:rounded-[36px] md:rounded-[40px] overflow-hidden bg-neutral-900 border border-neutral-800">
            <img src={project.col2Img} alt={`${project.title} Hero Composition`} className="w-full h-full object-cover select-none pointer-events-none hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const projectsData: ProjectData[] = [
    {
      id: "01",
      title: "Nextlevel Studio",
      category: "Client Production",
      col1Img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
      col1Img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
      col2Img: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85"
    },
    {
      id: "02",
      title: "Aura Brand Identity",
      category: "Personal Concept",
      col1Img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
      col1Img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
      col2Img: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85"
    },
    {
      id: "03",
      title: "Solaris Digital",
      category: "Client Production",
      col1Img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
      col1Img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
      col2Img: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85"
    }
  ];

  return (
    <div ref={containerRef} className="relative bg-[#0C0C0C] w-full pb-32">
      <section id="projects" className="relative w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-24 px-5 sm:px-8 md:px-10 z-10">
        <div className="max-w-5xl mx-auto flex flex-col items-center mb-12">
          <FadeIn delay={0} y={40}>
            <h2 className="hero-heading font-black uppercase tracking-tight leading-none text-center" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
              Project
            </h2>
          </FadeIn>
        </div>

        {/* Sticky Stacking Cards Container loop */}
        <div className="max-w-5xl mx-auto flex flex-col gap-[10vh]">
          {projectsData.map((project, idx) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={idx} 
              totalCards={projectsData.length} 
              progress={scrollYProgress}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

const ContactFooterSection: React.FC = () => {
  return (
    <footer id="contact" className="w-full bg-[#0C0C0C] border-t border-[#D7E2EA]/10 px-6 py-16 flex flex-col items-center justify-center text-center gap-6">
      <h3 className="hero-heading font-black text-3xl sm:text-5xl uppercase tracking-wider">LET&apos;S WORK TOGETHER</h3>
      <p className="text-[#D7E2EA]/60 max-w-md font-light text-sm sm:text-base">
        Available for worldwide freelance contracts, remote collaborations, and structural 3D design consulting roles.
      </p>
      <div className="mt-4">
        <a href="mailto:jack@example.com" className="text-xl sm:text-2xl font-medium tracking-wide text-[#D7E2EA] underline decoration-purple-500 underline-offset-8 hover:text-white transition-colors">
          hello@jack3d.studio
        </a>
      </div>
      <p className="text-xs text-[#D7E2EA]/30 tracking-widest uppercase mt-12">
        &copy; 2026 JACK CREATIVE STUDIO. ALL RIGHTS RESERVED.
      </p>
    </footer>
  );
};

// ============================================================================
// MAIN APPLICATION ROOT COMPONENT
// ============================================================================
export default function App() {
  useEffect(() => {
    document.title = "Jack -- 3D Creator";
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_INLINE_STYLES }} />
      <main className="relative w-full bg-[#0C0C0C] overflow-x-clip">
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactFooterSection />
      </main>
    </>
  );
}
