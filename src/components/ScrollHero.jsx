import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import cokeImg from '../assets/coke_can_realistic.png';
import spriteImg from '../assets/sprite_can.png';
import pepsiImg from '../assets/pepsi_can.png';
import fantaImg from '../assets/fanta_can.png';
import './ScrollHero.css';

gsap.registerPlugin(ScrollTrigger);

const STEP_COUNT = 5;

// Counts for different particle layers
const BUBBLE_COUNT = 80;
const ICE_COUNT = 50;
const LIME_COUNT = 15;
const ORANGE_COUNT = 15;
const LEAF_COUNT = 15;

export default function ScrollHero() {
  const heroRef = useRef(null);
  const stageRef = useRef(null);

  // Can Refs
  const cansContainerRef = useRef(null);
  const cokeWrapperRef = useRef(null);
  const spriteWrapperRef = useRef(null);
  const pepsiWrapperRef = useRef(null);
  const fantaWrapperRef = useRef(null);

  // Background Panel Refs
  const bgBlackRef = useRef(null);
  const bgCokeRef = useRef(null);
  const bgSpriteRef = useRef(null);
  const bgPepsiRef = useRef(null);
  const bgFantaRef = useRef(null);
  const bgStudioRef = useRef(null);

  // Other visual elements
  const liquidSphereRef = useRef(null);
  const energyRingRef = useRef(null);
  const volumetricLightRef = useRef(null);

  // Particle layer refs
  const particleFieldRef = useRef(null);
  const ambientRainRef = useRef(null);

  // Navigation indicator refs
  const dotRefs = useRef([]);
  const barRefs = useRef([]);
  const headerLogoRef = useRef(null);

  // Cards container & panels refs
  const cardsContainerRef = useRef(null);
  const cokePanelRef = useRef(null);
  const pepsiPanelRef = useRef(null);
  const spritePanelRef = useRef(null);
  const fantaPanelRef = useRef(null);

  // Text refs
  const txtClassicRef = useRef(null);
  const txtFinalRef = useRef(null);
  const footerRef = useRef(null);

  // For looping timelines / cleanup
  const activeTweens = useRef([]);

  useEffect(() => {
    const pf = particleFieldRef.current;
    const ar = ambientRainRef.current;
    pf.innerHTML = '';
    ar.innerHTML = '';

    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      smoothTouch: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Clear any previous running loops
    activeTweens.current.forEach((t) => t.kill());
    activeTweens.current = [];

    // Helper: Create SVG particles
    const createSvgParticle = (htmlContent, className) => {
      const el = document.createElement('div');
      el.className = `particle ${className}`;
      el.innerHTML = htmlContent;
      const size = gsap.utils.random(15, 45);
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      return el;
    };

    // 1. Generate bubbles (standard floating droplets)
    const bubbleElements = [];
    for (let i = 0; i < BUBBLE_COUNT; i++) {
      const el = document.createElement('div');
      el.className = 'particle particle--bubble';
      const size = gsap.utils.random(4, 14);
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      el.style.left = gsap.utils.random(0, 100) + '%';
      el.style.top = gsap.utils.random(0, 100) + '%';
      pf.appendChild(el);
      bubbleElements.push(el);

      // Infinite float animation
      const tween = gsap.to(el, {
        y: '-=120',
        x: '+=random(-30, 30)',
        opacity: gsap.utils.random(0.2, 0.7),
        duration: gsap.utils.random(4, 10),
        repeat: -1,
        ease: 'none',
        delay: gsap.utils.random(-8, 0)
      });
      activeTweens.current.push(tween);
    }

    // 2. Generate ice shards
    const iceElements = [];
    const iceSvg = `<svg viewBox="0 0 100 100"><polygon points="50,15 85,50 50,85 15,50" fill="rgba(255,255,255,0.4)" stroke="#fff" stroke-width="2" /></svg>`;
    for (let i = 0; i < ICE_COUNT; i++) {
      const el = createSvgParticle(iceSvg, 'particle--ice');
      el.style.left = gsap.utils.random(0, 100) + '%';
      el.style.top = gsap.utils.random(0, 100) + '%';
      pf.appendChild(el);
      iceElements.push(el);

      const tween = gsap.to(el, {
        y: '+=random(-80, 80)',
        rotation: '+=random(-180, 180)',
        duration: gsap.utils.random(6, 12),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: gsap.utils.random(-10, 0)
      });
      activeTweens.current.push(tween);
    }

    // 3. Generate lime slices
    const limeElements = [];
    const limeSvg = `
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" stroke="#a3e635" stroke-width="4" fill="rgba(163,230,53,0.15)" />
        <circle cx="50" cy="50" r="41" stroke="#84cc16" stroke-width="1.5" fill="none" />
        <line x1="50" y1="50" x2="50" y2="8" stroke="#a3e635" stroke-width="3" />
        <line x1="50" y1="50" x2="50" y2="92" stroke="#a3e635" stroke-width="3" />
        <line x1="50" y1="50" x2="8" y2="50" stroke="#a3e635" stroke-width="3" />
        <line x1="50" y1="50" x2="92" y2="50" stroke="#a3e635" stroke-width="3" />
        <line x1="50" y1="50" x2="20" y2="20" stroke="#a3e635" stroke-width="2" />
        <line x1="50" y1="50" x2="80" y2="80" stroke="#a3e635" stroke-width="2" />
        <line x1="50" y1="50" x2="80" y2="20" stroke="#a3e635" stroke-width="2" />
        <line x1="50" y1="50" x2="20" y2="80" stroke="#a3e635" stroke-width="2" />
      </svg>`;
    for (let i = 0; i < LIME_COUNT; i++) {
      const el = createSvgParticle(limeSvg, 'particle--lime');
      el.style.left = gsap.utils.random(0, 100) + '%';
      el.style.top = gsap.utils.random(0, 100) + '%';
      pf.appendChild(el);
      limeElements.push(el);

      const tween = gsap.to(el, {
        y: '+=random(-120, 120)',
        rotation: '+=random(-360, 360)',
        duration: gsap.utils.random(8, 15),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: gsap.utils.random(-12, 0)
      });
      activeTweens.current.push(tween);
    }

    // 4. Generate orange slices
    const orangeElements = [];
    const orangeSvg = `
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" stroke="#fb923c" stroke-width="4" fill="rgba(251,146,60,0.15)" />
        <circle cx="50" cy="50" r="41" stroke="#ea580c" stroke-width="1.5" fill="none" />
        <line x1="50" y1="50" x2="50" y2="8" stroke="#fb923c" stroke-width="3" />
        <line x1="50" y1="50" x2="50" y2="92" stroke="#fb923c" stroke-width="3" />
        <line x1="50" y1="50" x2="8" y2="50" stroke="#fb923c" stroke-width="3" />
        <line x1="50" y1="50" x2="92" y2="50" stroke="#fb923c" stroke-width="3" />
        <line x1="50" y1="50" x2="20" y2="20" stroke="#fb923c" stroke-width="2" />
        <line x1="50" y1="50" x2="80" y2="80" stroke="#fb923c" stroke-width="2" />
        <line x1="50" y1="50" x2="80" y2="20" stroke="#fb923c" stroke-width="2" />
        <line x1="50" y1="50" x2="20" y2="80" stroke="#fb923c" stroke-width="2" />
      </svg>`;
    for (let i = 0; i < ORANGE_COUNT; i++) {
      const el = createSvgParticle(orangeSvg, 'particle--orange');
      el.style.left = gsap.utils.random(0, 100) + '%';
      el.style.top = gsap.utils.random(0, 100) + '%';
      pf.appendChild(el);
      orangeElements.push(el);

      const tween = gsap.to(el, {
        y: '+=random(-120, 120)',
        rotation: '+=random(-360, 360)',
        duration: gsap.utils.random(8, 15),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: gsap.utils.random(-12, 0)
      });
      activeTweens.current.push(tween);
    }

    // 5. Generate mint leaves
    const leafElements = [];
    const leafSvg = `
      <svg viewBox="0 0 100 100">
        <path d="M50,15 C65,30 75,55 50,85 C25,55 35,30 50,15 Z" fill="#22c55e" fill-opacity="0.75" />
        <path d="M50,15 C52,35 52,65 50,85" stroke="#166534" stroke-width="2" fill="none" />
        <path d="M50,40 Q62,35 68,30" stroke="#166534" stroke-width="1.5" fill="none" />
        <path d="M50,55 Q65,50 70,45" stroke="#166534" stroke-width="1.5" fill="none" />
        <path d="M50,45 Q38,40 32,35" stroke="#166534" stroke-width="1.5" fill="none" />
        <path d="M50,60 Q35,55 30,50" stroke="#166534" stroke-width="1.5" fill="none" />
      </svg>`;
    for (let i = 0; i < LEAF_COUNT; i++) {
      const el = createSvgParticle(leafSvg, 'particle--leaf');
      el.style.left = gsap.utils.random(0, 100) + '%';
      el.style.top = gsap.utils.random(0, 100) + '%';
      pf.appendChild(el);
      leafElements.push(el);

      const tween = gsap.to(el, {
        y: '+=random(-100, 100)',
        x: '+=random(-50, 50)',
        rotation: '+=random(-180, 180)',
        duration: gsap.utils.random(7, 13),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: gsap.utils.random(-10, 0)
      });
      activeTweens.current.push(tween);
    }

    // 6. Generate continuous falling background realistic droplets (with sway)
    const dropletCount = 45;
    const heroHeight = stageRef.current.clientHeight;
    for (let i = 0; i < dropletCount; i++) {
      const drop = document.createElement('div');
      drop.className = 'rain-drop-realistic';
      const size = gsap.utils.random(8, 20); // Glistening drop sizes
      drop.style.width = size + 'px';
      drop.style.height = size + 'px'; // Spherical drops
      drop.style.left = gsap.utils.random(0, 100) + '%';
      drop.style.opacity = gsap.utils.random(0.15, 0.45);
      
      // Depth of field blur adjustments
      if (size > 16) {
        drop.style.filter = 'blur(1.5px)';
      } else if (size < 11) {
        drop.style.filter = 'blur(0.5px)';
      }
      
      ar.appendChild(drop);

      const startY = gsap.utils.random(-80, heroHeight * 0.4);
      const endY = heroHeight + 80;
      gsap.set(drop, { y: startY, x: 0 });

      // Animate vertical falling drift
      const fallTween = gsap.to(drop, {
        y: endY,
        duration: gsap.utils.random(14, 25), // Fluid premium drift speed
        repeat: -1,
        ease: 'none',
        delay: gsap.utils.random(-25, 0) // Pre-distribute drops across screen immediately
      });
      activeTweens.current.push(fallTween);

      // Animate horizontal liquid sway
      const swayTween = gsap.to(drop, {
        x: () => gsap.utils.random(-30, 30),
        duration: gsap.utils.random(4, 8),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: gsap.utils.random(-8, 0)
      });
      activeTweens.current.push(swayTween);
    }

    // Initialize GSAP Timeline Pinned Hero
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: () => '+=' + window.innerHeight * 6, // 6 screens of scrolling
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Sync navigation indicator active status
          const progress = self.progress;
          let activeIndex = 0;
          if (progress < 0.16) activeIndex = 0;      // Stage 0: Card Selector Docking
          else if (progress < 0.32) activeIndex = 1; // Stage 1: Coke Details
          else if (progress < 0.48) activeIndex = 2; // Stage 2: Pepsi Details
          else if (progress < 0.64) activeIndex = 3; // Stage 3: Sprite Details
          else if (progress < 0.80) activeIndex = 4; // Stage 4: Fanta Details
          else activeIndex = 5;                      // Stage 5: Final Showcase
          
          dotRefs.current.forEach((dot, idx) => {
            if (dot) dot.classList.toggle('active', idx === activeIndex);
          });
          barRefs.current.forEach((bar, idx) => {
            if (bar) bar.classList.toggle('active', idx === activeIndex);
          });
        }
      }
    });

    // Setup initial states
    gsap.set([spriteWrapperRef.current, pepsiWrapperRef.current, fantaWrapperRef.current], {
      opacity: 0,
      scale: 0,
      x: 0,
      y: 0
    });
    
    gsap.set(cokeWrapperRef.current, {
      opacity: 1,
      scale: 1.0,
      x: () => window.innerWidth < 900 ? 0 : -300,
      y: 0
    });

    // Initially hide elements for horizontal slider/liquid
    gsap.set([limeElements, leafElements, orangeElements], { opacity: 0 });
    gsap.set(liquidSphereRef.current, { scale: 0, opacity: 0 });
    gsap.set(energyRingRef.current, { scale: 0, opacity: 0 });
    gsap.set(volumetricLightRef.current, { opacity: 0 });
    
    // Hide details panels and cards
    gsap.set(cardsContainerRef.current, { opacity: 0, scale: 0.95 });
    gsap.set([cokePanelRef.current, pepsiPanelRef.current, spritePanelRef.current, fantaPanelRef.current], {
      opacity: 0,
      x: 60
    });

    // Show slider texts for coke initial view
    gsap.set(txtClassicRef.current, {
      opacity: 1,
      y: 0
    });
    gsap.set(txtFinalRef.current, {
      opacity: 0,
      y: 50
    });
    gsap.set(footerRef.current, {
      opacity: 0,
      yPercent: 100
    });
    gsap.set(headerLogoRef.current, {
      opacity: 1,
      filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.7))'
    });

    // ----------------------------------------------------
    // MASTER TIMELINE CHOREOGRAPHY
    // ----------------------------------------------------
    
    // ==========================================
    // STAGE 0: Card Selector Docking (Scroll: 0 -> 1.0)
    // ==========================================
    masterTl
      // Droplets scroll-based parallax translation (Scroll: 0 -> 6.0)
      .to(ambientRainRef.current, { y: -160, ease: 'none', duration: 6.0 }, 0.0)

      // Dissolve stage 0 text
      .to(txtClassicRef.current, { opacity: 0, y: -40, duration: 0.4 }, 0.0)
      
      // Dock Coke Can wrapper into Coke Card Slot (x: -387)
      // Smooth straight translation from its initial offset
      .to(cokeWrapperRef.current, {
        x: () => window.innerWidth < 900 ? -240 : -387,
        y: () => window.innerWidth < 900 ? -80 : -30,
        scale: () => window.innerWidth < 900 ? 0.4 : 0.52,
        duration: 0.6,
        ease: 'power3.inOut'
      }, 0.0)

      // Reveal Cards Selector Container
      .to(cardsContainerRef.current, { opacity: 1, scale: 1.0, duration: 0.4, ease: 'power2.out' }, 0.5)

      // Fade in and slide other cans purely vertically into their cards (no horizontal crossover!)
      .fromTo(pepsiWrapperRef.current, 
        { opacity: 0, scale: 0.1, x: () => window.innerWidth < 900 ? -80 : -129, y: 100 },
        {
          opacity: 1,
          scale: () => window.innerWidth < 900 ? 0.4 : 0.52,
          y: () => window.innerWidth < 900 ? -80 : -30,
          duration: 0.4,
          ease: 'power2.out'
        }, 0.5
      )
      .fromTo(spriteWrapperRef.current, 
        { opacity: 0, scale: 0.1, x: () => window.innerWidth < 900 ? 80 : 129, y: 100 },
        {
          opacity: 1,
          scale: () => window.innerWidth < 900 ? 0.4 : 0.52,
          y: () => window.innerWidth < 900 ? -80 : -30,
          duration: 0.4,
          ease: 'power2.out'
        }, 0.5
      )
      .fromTo(fantaWrapperRef.current, 
        { opacity: 0, scale: 0.1, x: () => window.innerWidth < 900 ? 240 : 387, y: 100 },
        {
          opacity: 1,
          scale: () => window.innerWidth < 900 ? 0.4 : 0.52,
          y: () => window.innerWidth < 900 ? -80 : -30,
          duration: 0.4,
          ease: 'power2.out'
        }, 0.5
      )      // ==========================================
      // STAGE 1: Coke Details View (Scroll: 1.0 -> 2.0)
      // ==========================================
      // Fade out cards container framework
      .to(cardsContainerRef.current, { opacity: 0, scale: 0.95, duration: 0.1, ease: 'power2.in' }, 1.0)
      // Fade out other cans temporarily
      .to([pepsiWrapperRef.current, spriteWrapperRef.current, fantaWrapperRef.current], { opacity: 0, duration: 0.1 }, 1.0)
      
      // Slide Coke can from Coke Card (x: -387) to center-left (x: -280) and zoom
      .to(cokeWrapperRef.current, {
        x: () => window.innerWidth < 900 ? 0 : -280,
        y: () => window.innerWidth < 900 ? -160 : 0,
        scale: () => window.innerWidth < 900 ? 0.7 : 1.1,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
      }, 1.1)
      
      // Fade in Coke Details panel
      .to(cokePanelRef.current, { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }, 1.2)

      // ==========================================
      // STAGE 2: Pepsi Details View (Scroll: 2.0 -> 3.0)
      // ==========================================
      // Slide out Coke can to the left and fade out
      .to(cokeWrapperRef.current, { x: -700, opacity: 0, duration: 0.3, ease: 'power3.in' }, 2.0)
      // Fade out Coke Details panel
      .to(cokePanelRef.current, { opacity: 0, x: -50, duration: 0.2 }, 2.0)

      // Background transition Coke -> Pepsi Blue
      .to(bgCokeRef.current, { opacity: 0, duration: 0.6 }, 2.0)
      .to(bgPepsiRef.current, { opacity: 1, duration: 0.6 }, 2.0)

      // Lift Pepsi can from card slot (x: -129) and slide it to center-left (x: -280)
      .fromTo(pepsiWrapperRef.current,
        { x: () => window.innerWidth < 900 ? -80 : -129, y: () => window.innerWidth < 900 ? -80 : -30, scale: () => window.innerWidth < 900 ? 0.4 : 0.52, opacity: 0 },
        {
          x: () => window.innerWidth < 900 ? 0 : -280,
          y: () => window.innerWidth < 900 ? -160 : 0,
          scale: () => window.innerWidth < 900 ? 0.7 : 1.1,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out'
        }, 2.1
      )
      // Fade in Pepsi Details panel
      .to(pepsiPanelRef.current, { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }, 2.2)
      // Bubbles/ice highlight
      .to(iceElements, { opacity: 0.9, duration: 0.4 }, 2.1)

      // ==========================================
      // STAGE 3: Sprite Details View (Scroll: 3.0 -> 4.0)
      // ==========================================
      // Slide out Pepsi can to the left
      .to(pepsiWrapperRef.current, { x: -700, opacity: 0, duration: 0.3, ease: 'power3.in' }, 3.0)
      // Fade out Pepsi details
      .to(pepsiPanelRef.current, { opacity: 0, x: -50, duration: 0.2 }, 3.0)

      // Background transition Pepsi -> Sprite Green
      .to(bgPepsiRef.current, { opacity: 0, duration: 0.6 }, 3.0)
      .to(bgSpriteRef.current, { opacity: 1, duration: 0.6 }, 3.0)

      // Slide in Sprite can from right/card position
      .fromTo(spriteWrapperRef.current,
        { x: () => window.innerWidth < 900 ? 80 : 129, y: () => window.innerWidth < 900 ? -80 : -30, scale: () => window.innerWidth < 900 ? 0.4 : 0.52, opacity: 0 },
        {
          x: () => window.innerWidth < 900 ? 0 : -280,
          y: () => window.innerWidth < 900 ? -160 : 0,
          scale: () => window.innerWidth < 900 ? 0.7 : 1.1,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out'
        }, 3.1
      )
      // Fade in Sprite Details panel
      .to(spritePanelRef.current, { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }, 3.2)
      // Highlight lime & leaves
      .to([limeElements, leafElements], { opacity: 0.8, duration: 0.4 }, 3.1)

      // ==========================================
      // STAGE 4: Fanta Details View (Scroll: 4.0 -> 5.0)
      // ==========================================
      // Slide out Sprite can to the left
      .to(spriteWrapperRef.current, { x: -700, opacity: 0, duration: 0.3, ease: 'power3.in' }, 4.0)
      // Fade out Sprite details
      .to(spritePanelRef.current, { opacity: 0, x: -50, duration: 0.2 }, 4.0)

      // Background transition Sprite -> Fanta Orange
      .to(bgSpriteRef.current, { opacity: 0, duration: 0.6 }, 4.0)
      .to(bgFantaRef.current, { opacity: 1, duration: 0.6 }, 4.0)

      // Slide in Fanta can from right/card position
      .fromTo(fantaWrapperRef.current,
        { x: () => window.innerWidth < 900 ? 240 : 387, y: () => window.innerWidth < 900 ? -80 : -30, scale: () => window.innerWidth < 900 ? 0.4 : 0.52, opacity: 0 },
        {
          x: () => window.innerWidth < 900 ? 0 : -280,
          y: () => window.innerWidth < 900 ? -160 : 0,
          scale: () => window.innerWidth < 900 ? 0.7 : 1.1,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out'
        }, 4.1
      )
      // Fade in Fanta Details panel
      .to(fantaPanelRef.current, { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }, 4.2)
      // Orange pulp elements
      .to(orangeElements, { opacity: 0.8, duration: 0.4 }, 4.1)
      // ==========================================

            // ==========================================
      // STAGE 5: Clean Crossfade & Showcase (Scroll: 5.0 -> 6.0)
      // ==========================================
      // Fade out Fanta details
      .to(fantaPanelRef.current, { opacity: 0, duration: 0.4 }, 5.0)
      // Shrink and fade out Fanta can
      .to(fantaWrapperRef.current, { scale: 0.5, opacity: 0, duration: 0.4, ease: 'power2.in' }, 5.0)
      .to(orangeElements, { opacity: 0, duration: 0.3 }, 5.0)
 
      // Background transition Fanta -> Studio (Clean crossfade)
      .to(bgFantaRef.current, { opacity: 0, duration: 0.6 }, 5.0)
      .to(bgStudioRef.current, { opacity: 1, duration: 0.6 }, 5.0)
 
      // Explicitly set starting state for showcase cans (Prevents reverse scroll leaks)
      .set([cokeWrapperRef.current, spriteWrapperRef.current, pepsiWrapperRef.current, fantaWrapperRef.current], {
        scale: 0,
        x: 0,
        y: 150,
        rotateZ: 0,
        opacity: 0
      }, 5.5)
 
      // Springy burst array for the 4 cans from center
      .to(spriteWrapperRef.current, { scale: 0.8, x: -300, y: 20, rotateZ: -12, opacity: 1, duration: 0.7, ease: 'back.out(1.1)' }, 5.6)
      .to(cokeWrapperRef.current, { scale: 0.85, x: -100, y: -20, rotateZ: -4, opacity: 1, duration: 0.7, ease: 'back.out(1.1)' }, 5.65)
      .to(pepsiWrapperRef.current, { scale: 0.85, x: 100, y: -20, rotateZ: 4, opacity: 1, duration: 0.7, ease: 'back.out(1.1)' }, 5.65)
      .to(fantaWrapperRef.current, { scale: 0.8, x: 300, y: 20, rotateZ: 12, opacity: 1, duration: 0.7, ease: 'back.out(1.1)' }, 5.7)
      
      .to(volumetricLightRef.current, { opacity: 1, duration: 0.6 }, 5.7)
      .to(txtFinalRef.current, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 5.7)
      
      // Footer slide-in and cans shift (Scroll: 6.0 -> 6.5)
      .to(cansContainerRef.current, { scale: 0.70, y: -130, duration: 0.6, ease: 'power2.inOut' }, 6.0)
      .to(txtFinalRef.current, { scale: 0.82, y: -150, duration: 0.6, ease: 'power2.inOut' }, 6.0)
      .to(footerRef.current, { opacity: 1, yPercent: 0, duration: 0.6, ease: 'power3.out' }, 6.0);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) * 0.05;
      const moveY = (clientY - window.innerHeight / 2) * 0.05;
      gsap.to(pf, {
        x: moveX,
        y: moveY,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: 'auto'
      });
      // Parallax backdrop rain container (x axis only to avoid timeline scroll conflicts)
      const rainMoveX = (clientX - window.innerWidth / 2) * -0.03;
      gsap.to(ar, {
        x: rainMoveX,
        duration: 1.5,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      activeTweens.current.forEach((t) => t.kill());
      masterTl.kill();
    };
  }, []);

  return (
    <section className="scroll-hero" ref={heroRef}>
      {/* Background Panels Stack */}
      <div className="bg-panels">
        <div className="bg-panel bg-panel--black" ref={bgBlackRef} />
        <div className="bg-panel bg-panel--coke" ref={bgCokeRef} />
        <div className="bg-panel bg-panel--sprite" ref={bgSpriteRef} />
        <div className="bg-panel bg-panel--pepsi" ref={bgPepsiRef} />
        <div className="bg-panel bg-panel--fanta" ref={bgFantaRef} />
        <div className="bg-panel bg-panel--studio" ref={bgStudioRef} />
      </div>

      {/* Volumetric Spotlight Overlay */}
      <div className="volumetric-light" ref={volumetricLightRef} />

      {/* Dynamic Ambient Rain Layer */}
      <div className="ambient-rain" ref={ambientRainRef} />

      {/* Navigation Header */}
      <header className="header-nav">
        <div className="header-logo" ref={headerLogoRef}>
          {/* Coca-Cola SVG Logo */}
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="#ffffff" d="M16.813 8.814s-.45.18-.973.756c-.524.577-.828 1.225-.603 1.397.087.066.287.079.65-.25a2.864 2.864 0 00.766-1.063c.234-.57.16-.833.16-.84m2.863 1.038c-.581-.299-1.006-.664-1.448-.89-.422-.216-.695-.307-1.036-.261a1.057 1.057 0 00-.14.035s.176.6-.523 1.607c-.708 1.022-1.35 1.015-1.533.734-.191-.296.056-.9.468-1.437.432-.562 1.19-1.028 1.19-1.028s-.241-.148-.835.19c-.58.326-1.577 1.107-2.502 2.423-.926 1.316-1.11 2.04-1.242 2.61-.132.57-.012 1.18.62 1.18s1.368-.964 1.576-1.299c.386-.624.637-1.581.112-1.45-.259.065-.468.351-.6.627a2.683 2.683 0 00-.19.554 2.185 2.185 0 00-.513.298 3.788 3.788 0 00-.486.43s.002-.456.365-1.194c.364-.737 1.03-1.074 1.408-1.106.34-.027.783.262.408 1.327-.375 1.065-1.483 2.36-2.646 2.376-1.073.015-1.776-1.355-.282-3.745C13.501 9.19 15.441 8.38 16.07 8.29c.63-.09.835.187.835.187a2.709 2.709 0 011.197-.197c.77.052 1.364.596 2.15.979-.205.195-.4.4-.575.592m3.454-.89c-.533.342-1.27.652-1.979.586-.179.185-.371.4-.563.634 1.228.243 2.305-.519 2.877-1.167A3.82 3.82 0 0024 8.248a4.792 4.792 0 01-.869.714m-1.636 3.462a.268.268 0 00.023-.051.124.124 0 00-.113-.108c-.117-.005-.277.017-.695.48a6.303 6.303 0 00-.89 1.263c-.24.438-.337.764-.2.848a.199.199 0 00.146.015c.093-.022.199-.11.36-.295.075-.088.158-.212.258-.349.277-.376.973-1.563 1.111-1.803m-4.349.504c.07-.182.159-.541-.026-.682-.199-.15-.705.201-.708.561-.003.369.357.535.443.559.05.013.066.01.09-.029a3.284 3.284 0 00.201-.409m-.383.67a1.531 1.531 0 01-.348-.222 1.116 1.116 0 01-.26-.317c-.008-.012-.015-.003-.023.008-.007.01-.039.039-.309.434-.27.396-.684 1.216-.31 1.355.241.09.641-.331.86-.61a5.21 5.21 0 00.402-.614c.012-.023 0-.029-.012-.034m4.258.947c-.102.163-.218.476.117.281.41-.236.994-1.123.994-1.123h.265a8.88 8.88 0 01-.803 1.054c-.415.46-.922.879-1.28.837-.416-.048-.286-.596-.286-.596s-.596.635-1.01.59c-.557-.062-.387-.751-.387-.751s-.63.774-1.06.75c-.673-.04-.504-.859-.316-1.436.1-.308.193-.55.193-.55s-.067.017-.21.038c-.076.011-.212.019-.212.019s-.28.495-.505.792c-.224.297-1.178 1.322-1.74 1.117-.518-.19-.346-.984-.044-1.615.44-.92 1.68-2.243 2.396-2.068.741.18.017 1.532.017 1.532s0 .005.007.009c.015.005.054.01.143-.008a1.605 1.605 0 00.271-.08s.746-1.561 1.569-2.583c.823-1.02 2.465-2.78 3.11-2.354.156.105.086.465-.126.902a2.891 2.891 0 01-.291.078c.142-.258.236-.475.264-.627.097-.528-1.135.585-2.015 1.78a16.594 16.594 0 00-1.409 2.28 3.86 3.86 0 00.454-.324 13.002 13.002 0 001.118-1.043 12.169 12.169 0 00.951-1.098 2.58 2.58 0 00.28-.029 12.054 12.054 0 01-1.05 1.24c-.35.355-.73.737-1.061 1.015a8.84 8.84 0 01-.931.691s-.77 1.553-.351 1.652c.246.06.732-.69.732-.69s.635-.967 1.017-1.404c.522-.593.97-.936 1.42-.942.261-.005.415.273.415.273l.123-.19h.757s-1.414 2.398-1.527 2.579m2.111-5.58c-.533.341-1.27.651-1.979.585-.18.185-.371.4-.564.634 1.229.243 2.305-.518 2.878-1.167A3.82 3.82 0 0024 8.248a4.792 4.792 0 01-.869.714m-10.63 1.177h-.72l-.407.658h.72zm-3.41 2.277c.307-.42 1.152-1.891 1.152-1.891a.124.124 0 00-.112-.108c-.117-.006-.312.034-.7.519-.387.485-.688.87-.907 1.272-.24.438-.346.747-.207.831a.205.205 0 00.144.015c.09-.022.208-.113.369-.298a5.57 5.57 0 00.262-.34m-3.863-1.99c-.199-.15-.705.201-.708.56-.003.369.456.482.515.484a.09.09 0 00.05-.01.06.06 0 00.024-.027 3.483 3.483 0 00.146-.325c.07-.183.158-.541-.027-.682m-.3 1.27a1.678 1.678 0 01-.39-.18.812.812 0 01-.279-.309c-.007-.012-.015-.003-.022.008-.007.01-.047.061-.318.458-.27.398-.672 1.21-.296 1.35.24.09.644-.334.864-.612a7.24 7.24 0 00.455-.681c.009-.024 0-.03-.014-.034m5.88.244h.263s-1.321 1.912-2.068 1.823c-.416-.049-.293-.563-.293-.563s-.585.685-1.123.546c-.487-.125-.172-.936-.172-.936-.056.022-1.111 1.211-1.853.926-.776-.3-.373-1.296-.225-1.595.125-.253.263-.499.263-.499s-.119.034-.195.051l-.186.04s-.367.596-.591.894c-.225.297-1.178 1.32-1.74 1.117-.562-.204-.423-.99-.107-1.615.512-1.012 1.726-2.256 2.458-2.068.739.189.127 1.388.127 1.388s.147.019.5-.222c.507-.346 1.176-1.277 1.901-1.167.342.051.66.4.225 1.064-.139.213-.372.403-.55.215-.111-.118-.014-.33.103-.477a.457.457 0 01.39-.179s.12-.273-.185-.269c-.247.005-.871.58-1.223 1.16-.323.533-.813 1.441-.322 1.639.451.182 1.309-.836 1.706-1.37.397-.533 1.302-1.742 2.062-1.79.261-.017.417.221.417.221l.088-.139h.759s-1.43 2.387-1.542 2.567c-.088.141-.204.46.117.281.322-.178.996-1.043.996-1.043m-.414 3.824a3.144 3.144 0 00-1.908-.557 1.17 1.17 0 00-.93.504c-.29-.505-.862-.815-1.747-.808-1.43.016-2.849.676-3.972.675-1.077 0-1.863-.677-1.837-1.88.047-2.109 1.83-4.009 3.16-4.864.767-.49 1.409-.637 1.828-.59.306.034.674.388.442.909-.341.761-.812.699-.795.335.01-.237.168-.386.286-.469a.582.582 0 01.278-.068c.068-.057.117-.474-.429-.337-.546.137-1.21.676-1.84 1.371-.63.696-1.61 2.011-1.852 3.392-.113.64-.039 1.808 1.48 1.795 1.287-.01 3.185-.859 4.929-.841a3.34 3.34 0 011.725.472c.451.278.992.684 1.184.961" />
          </svg>
        </div>
        <nav className="header-links">
          <a href="#products" className="active">Products</a>
          <a href="#story">Our Story</a>
          <a href="#shop">Shop</a>
        </nav>
        <div className="header-actions">
          <button className="search-btn" aria-label="Search">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="7" />
              <line x1="16" y1="16" x2="22" y2="22" />
            </svg>
          </button>
          <button className="signup-btn">Sign Up</button>
        </div>
      </header>

      {/* Stage Wrapper */}
      <div className="scroll-hero__stage" ref={stageRef}>

        {/* Dynamic Reflective Mirror Floor */}
        <div className="floor-reflection" />

        {/* Dynamic Headings Layer */}
        <div className="slider-texts">
          {/* First Frame Premium Left-Right Layout */}
          <div className="hero-intro-panel" ref={txtClassicRef}>
            <h1 className="hero-intro-title">
              Classic<br /><span>Refreshment</span>
            </h1>
            <p className="hero-intro-description">
              Welcome to our digital beverage lounge. Discover our curated collection of iconic soft drinks, custom flavor profiles, and complete nutritional facts. Scroll down to interact with the brands and find your perfect matches.
            </p>
            <div className="hero-intro-features">
              <div className="hero-feature-item">
                <span className="feature-dot"></span>
                <span>Original Taste</span>
              </div>
              <div className="hero-feature-item">
                <span className="feature-dot"></span>
                <span>Zero Calories</span>
              </div>
              <div className="hero-feature-item">
                <span className="feature-dot"></span>
                <span>Premium Quality</span>
              </div>
            </div>
            <div className="hero-scroll-indicator">
              <span className="scroll-indicator-arrow">↓</span> Scroll to Begin
            </div>
          </div>

          <h1 className="slider-text text--final" ref={txtFinalRef}>
            Choose Your<br /><span>Refreshment</span>
          </h1>
        </div>

        {/* Product Cards Selector Grid */}
        <div className="product-cards-container" ref={cardsContainerRef}>
          <div className="product-cards-grid">
            <div className="product-card product-card--coke">
              <div className="card-can-slot" />
              <div className="card-title">Coca-Cola</div>
            </div>
            <div className="product-card product-card--pepsi">
              <div className="card-can-slot" />
              <div className="card-title">Pepsi</div>
            </div>
            <div className="product-card product-card--sprite">
              <div className="card-can-slot" />
              <div className="card-title">Sprite</div>
            </div>
            <div className="product-card product-card--fanta">
              <div className="card-can-slot" />
              <div className="card-title">Fanta</div>
            </div>
          </div>
        </div>

        {/* Product Details Specification Panels */}
        <div className="details-panels-container">
          {/* Coke Details Panel */}
          <div className="details-panel details-panel--coke" ref={cokePanelRef}>
            <span className="details-brand-tag">Original Classic</span>
            <h2 className="details-title">Coca-Cola</h2>
            <p className="details-desc">
              The iconic flavor that started it all. Enjoy the refreshing, crisp taste of Coca-Cola Classic, crafted with caramel notes and fine carbonation.
            </p>
            <div className="details-metrics">
              <div className="metric-item">
                <span className="metric-val">139 kcal</span>
                <span className="metric-lbl">Calories</span>
              </div>
              <div className="metric-item">
                <span className="metric-val">39 g</span>
                <span className="metric-lbl">Sugar</span>
              </div>
              <div className="metric-item">
                <span className="metric-val">45 mg</span>
                <span className="metric-lbl">Sodium</span>
              </div>
            </div>
            <div className="details-flavor">
              <span className="flavor-lbl">Flavor Profile</span>
              <div className="flavor-tags">
                <span className="flavor-tag">Sweet Caramel</span>
                <span className="flavor-tag">Vanilla Blend</span>
                <span className="flavor-tag">Cinnamon Spice</span>
              </div>
            </div>
          </div>

          {/* Pepsi Details Panel */}
          <div className="details-panel details-panel--pepsi" ref={pepsiPanelRef}>
            <span className="details-brand-tag">Bold Refreshment</span>
            <h2 className="details-title">Pepsi Cola</h2>
            <p className="details-desc">
              Experience the bold, citrusy splash of Pepsi Cola. Crafted to deliver a satisfying fizz and refreshing sweetness with every sip.
            </p>
            <div className="details-metrics">
              <div className="metric-item">
                <span className="metric-val">150 kcal</span>
                <span className="metric-lbl">Calories</span>
              </div>
              <div className="metric-item">
                <span className="metric-val">41 g</span>
                <span className="metric-lbl">Sugar</span>
              </div>
              <div className="metric-item">
                <span className="metric-val">30 mg</span>
                <span className="metric-lbl">Sodium</span>
              </div>
            </div>
            <div className="details-flavor">
              <span className="flavor-lbl">Flavor Profile</span>
              <div className="flavor-tags">
                <span className="flavor-tag">Citrus Splash</span>
                <span className="flavor-tag">Caramel Sweetness</span>
                <span className="flavor-tag">Sparkling Kola</span>
              </div>
            </div>
          </div>

          {/* Sprite Details Panel */}
          <div className="details-panel details-panel--sprite" ref={spritePanelRef}>
            <span className="details-brand-tag">Naturally Crisp</span>
            <h2 className="details-title">Sprite Lemon-Lime</h2>
            <p className="details-desc">
              Crisp, cold, and refreshing. Sprite delivers a burst of clean lemon-lime flavor that immediately cuts through the heat and quenches your thirst.
            </p>
            <div className="details-metrics">
              <div className="metric-item">
                <span className="metric-val">140 kcal</span>
                <span className="metric-lbl">Calories</span>
              </div>
              <div className="metric-item">
                <span className="metric-val">38 g</span>
                <span className="metric-lbl">Sugar</span>
              </div>
              <div className="metric-item">
                <span className="metric-val">70 mg</span>
                <span className="metric-lbl">Sodium</span>
              </div>
            </div>
            <div className="details-flavor">
              <span className="flavor-lbl">Flavor Profile</span>
              <div className="flavor-tags">
                <span className="flavor-tag">Fresh Lime Juice</span>
                <span className="flavor-tag">Zesty Lemon</span>
                <span className="flavor-tag">Zero Caffeine</span>
              </div>
            </div>
          </div>

          {/* Fanta Details Panel */}
          <div className="details-panel details-panel--fanta" ref={fantaPanelRef}>
            <span className="details-brand-tag">Fruit Explosion</span>
            <h2 className="details-title">Fanta Orange</h2>
            <p className="details-desc">
              Bright, bubbly, and instantly refreshing. Fanta Orange is packed with real fruit flavor and a carbonated kick that brings a smile to your face.
            </p>
            <div className="details-metrics">
              <div className="metric-item">
                <span className="metric-val">160 kcal</span>
                <span className="metric-lbl">Calories</span>
              </div>
              <div className="metric-item">
                <span className="metric-val">44 g</span>
                <span className="metric-lbl">Sugar</span>
              </div>
              <div className="metric-item">
                <span className="metric-val">60 mg</span>
                <span className="metric-lbl">Sodium</span>
              </div>
            </div>
            <div className="details-flavor">
              <span className="flavor-lbl">Flavor Profile</span>
              <div className="flavor-tags">
                <span className="flavor-tag">Sweet Orange Pulp</span>
                <span className="flavor-tag">Zesty Tangerine</span>
                <span className="flavor-tag">Tangy Carbonation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Swirling Liquid Transition Sphere */}
        <div className="liquid-sphere" ref={liquidSphereRef} />

        {/* Energy Morphing Selector Ring */}
        <div className="energy-ring" ref={energyRingRef} />

        {/* Dynamic Interactive Particles Field */}
        <div className="particles-field" ref={particleFieldRef} />

        {/* Cans Placement Container */}
        <div className="cans-container" ref={cansContainerRef}>
          {/* Coca-Cola Can */}
          <div className="can-wrapper coke-wrapper" ref={cokeWrapperRef}>
            <img className="can-img" src={`${cokeImg}?v=5`} alt="Coca-Cola Can" draggable="false" />
            <div className="can-reflection">
              <img src={`${cokeImg}?v=5`} alt="" draggable="false" />
            </div>
          </div>

          {/* Sprite Can */}
          <div className="can-wrapper sprite-wrapper" ref={spriteWrapperRef}>
            <img className="can-img" src={`${spriteImg}?v=5`} alt="Sprite Can" draggable="false" />
            <div className="can-reflection">
              <img src={`${spriteImg}?v=5`} alt="" draggable="false" />
            </div>
          </div>

          {/* Pepsi Can */}
          <div className="can-wrapper pepsi-wrapper" ref={pepsiWrapperRef}>
            <img className="can-img" src={`${pepsiImg}?v=5`} alt="Pepsi Can" draggable="false" />
            <div className="can-reflection">
              <img src={`${pepsiImg}?v=5`} alt="" draggable="false" />
            </div>
          </div>

          {/* Fanta Can */}
          <div className="can-wrapper fanta-wrapper" ref={fantaWrapperRef}>
            <img className="can-img" src={`${fantaImg}?v=5`} alt="Fanta Can" draggable="false" />
            <div className="can-reflection">
              <img src={`${fantaImg}?v=5`} alt="" draggable="false" />
            </div>
          </div>
        </div>

        {/* Vertical Pagination Dots */}
        <div className="progress-dots">
          {Array.from({ length: STEP_COUNT + 1 }).map((_, i) => (
            <span
              key={i}
              ref={(el) => (dotRefs.current[i] = el)}
              className={`dot${i === 0 ? ' active' : ''}`}
            />
          ))}
        </div>

        {/* Bottom Horizontal Bars */}
        <div className="progress-bars">
          {Array.from({ length: STEP_COUNT + 1 }).map((_, i) => (
            <span
              key={i}
              ref={(el) => (barRefs.current[i] = el)}
              className={`bar${i === 0 ? ' active' : ''}`}
            />
          ))}
        </div>

        {/* Premium Glassmorphic Footer */}
        <footer className="footer-panel" ref={footerRef}>
          <div className="footer-content">
            <div className="footer-brand">
              <span className="footer-logo-text">REFRESHMENT LOUNGE</span>
              <p className="footer-tagline">Crafting premium moments of carbonated joy since 1886.</p>
            </div>
            <div className="footer-links-grid">
              <div className="footer-links-col">
                <h4>Brands</h4>
                <a href="#coke" onClick={(e) => e.preventDefault()}>Coca-Cola</a>
                <a href="#pepsi" onClick={(e) => e.preventDefault()}>Pepsi</a>
                <a href="#sprite" onClick={(e) => e.preventDefault()}>Sprite</a>
                <a href="#fanta" onClick={(e) => e.preventDefault()}>Fanta</a>
              </div>
              <div className="footer-links-col">
                <h4>Explore</h4>
                <a href="#about" onClick={(e) => e.preventDefault()}>Our Story</a>
                <a href="#sustainability" onClick={(e) => e.preventDefault()}>Sip Green</a>
                <a href="#ingredients" onClick={(e) => e.preventDefault()}>Ingredients</a>
              </div>
              <div className="footer-links-col">
                <h4>Connect</h4>
                <a href="#instagram" onClick={(e) => e.preventDefault()}>Instagram</a>
                <a href="#twitter" onClick={(e) => e.preventDefault()}>Twitter</a>
                <a href="#contact" onClick={(e) => e.preventDefault()}>Get in Touch</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Refreshment Lounge. All rights reserved.</span>
            <span>Designed for Premium Refreshment.</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
