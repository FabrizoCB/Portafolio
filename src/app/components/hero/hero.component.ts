import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
import { GsapService } from '../../services/gsap.service';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  providers: [GsapService],
  template: `
    <section class="hero-section min-h-screen flex items-center relative overflow-hidden">
      <!-- Animated Background -->
      <div class="absolute inset-0 overflow-hidden">
        <!-- Grid pattern -->
        <div class="absolute inset-0 opacity-20">
          <div class="absolute inset-0" style="background-image: linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px); background-size: 50px 50px;"></div>
        </div>
        
        <!-- Floating blobs -->
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
        <div class="blob blob-3"></div>
        
        <!-- Gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-primary)]/50 to-[var(--bg-primary)]"></div>
      </div>
      
      <div class="section-container relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div class="order-2 lg:order-1 text-center lg:text-left" appReveal revealAnimation="fade-up">
            <!-- Greeting -->
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 fade-in">
              <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span class="text-sm text-[var(--text-secondary)]">Disponible para trabajar</span>
            </div>
            
            <!-- Name -->
            <h1 class="hero-title mb-4 gsap-hero-title">
              <span class="block text-lg text-[var(--text-secondary)] font-normal mb-2 hero-greeting">Hola, soy</span>
              <span class="block text-5xl md:text-6xl lg:text-7xl font-bold text-gradient hero-name">Fabrizio Castro</span>
            </h1>
            
            <!-- Typewriter subtitle -->
            <div class="h-8 mb-6 hero-subtitle">
              <p class="text-xl md:text-2xl text-[var(--primary)] font-medium">
                {{ currentTypewriterText }}<span class="cursor">|</span>
              </p>
            </div>
            
            <!-- Description -->
            <p class="text-lg text-[var(--text-secondary)] max-w-xl mx-auto lg:mx-0 mb-8 hero-description">
              Construyendo soluciones digitales con pasión, código limpio y aprendizaje constante.
            </p>
            
            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 hero-cta">
              <button 
                #magneticBtn
                (click)="scrollToProjects()"
                class="magnetic-btn group relative px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-glow overflow-hidden"
              >
                <span class="relative z-10">Ver mis proyectos</span>
                <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
              
            </div>
            
            <!-- Social Links -->
            <div class="flex items-center gap-4 justify-center lg:justify-start">
              <!-- LinkedIn -->
              <a 
                href="https://www.linkedin.com/in/fabrizio-castro-barrientos-0a082a332/"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link p-3 rounded-lg glass transition-all duration-300 hover:scale-110 hover:text-[var(--primary)]"
                aria-label="LinkedIn"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              
              <!-- GitHub -->
              <a 
                href="https://github.com/FabrizoCB"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link p-3 rounded-lg glass transition-all duration-300 hover:scale-110 hover:text-[var(--primary)]"
                aria-label="GitHub"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              
              <!-- Email -->
              <a 
                href="mailto:castrobarrientosfabriziojamed&#64;gmail.com"
                class="social-link p-3 rounded-lg glass transition-all duration-300 hover:scale-110 hover:text-[var(--primary)]"
                aria-label="Email"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </a>
              
              <!-- WhatsApp -->
              <a 
                href="https://wa.me/51983571781"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link p-3 rounded-lg glass transition-all duration-300 hover:scale-110 hover:text-[var(--primary)]"
                aria-label="WhatsApp"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.52-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <!-- Right Content - Profile Image -->
          <div class="order-1 lg:order-2 flex justify-center" appReveal revealAnimation="scale" [revealDelay]="200">
            <div class="profile-container gsap-profile">
              <!-- Animated border -->
              <div class="animated-border"></div>
              
              <!-- Profile image -->
              <div class="profile-image-wrapper">
                <img 
                  src="assets/images/profile-photo.png" 
                  alt="Fabrizio Castro Barrientos"
                  class="profile-image"
                  loading="eager"
                />
              </div>
              
              <!-- Glow effect -->
              <div class="profile-glow"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div class="scroll-indicator">
          <div class="mouse">
            <div class="wheel"></div>
          </div>
          <span class="text-xs text-[var(--text-muted)] mt-2">Scroll</span>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      padding-top: 80px;
    }
    
    /* Animated Background */
    .blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.4;
    }
    
    .blob-1 {
      width: 400px;
      height: 400px;
      background: linear-gradient(135deg, #6366F1, #8B5CF6);
      top: -100px;
      right: -100px;
      animation: blob 7s infinite;
    }
    
    .blob-2 {
      width: 300px;
      height: 300px;
      background: linear-gradient(135deg, #06B6D4, #22D3EE);
      bottom: 100px;
      left: -100px;
      animation: blob 10s infinite;
      animation-delay: -2s;
    }
    
    .blob-3 {
      width: 250px;
      height: 250px;
      background: linear-gradient(135deg, #6366F1, #06B6D4);
      top: 50%;
      left: 50%;
      animation: blob 8s infinite;
      animation-delay: -4s;
    }
    
    @keyframes blob {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
    }
    
    /* Profile Container */
    .profile-container {
      position: relative;
      width: 300px;
      height: 300px;
    }
    
    @media (min-width: 768px) {
      .profile-container {
        width: 380px;
        height: 380px;
      }
    }
    
    .animated-border {
      position: absolute;
      inset: -4px;
      border-radius: 24px;
      background: linear-gradient(135deg, #6366F1, #06B6D4, #8B5CF6, #6366F1);
      background-size: 300% 300%;
      animation: gradientRotate 3s linear infinite;
      z-index: 1;
    }
    
    @keyframes gradientRotate {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    .profile-image-wrapper {
      position: absolute;
      inset: 0;
      border-radius: 20px;
      overflow: hidden;
      z-index: 2;
    }
    
    .profile-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
      transition: transform 0.5s ease;
    }
    
    .profile-container:hover .profile-image {
      transform: scale(1.05);
    }
    
    .profile-glow {
      position: absolute;
      inset: -20px;
      border-radius: 30px;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(6, 182, 212, 0.3));
      filter: blur(30px);
      opacity: 0.6;
      z-index: 0;
      animation: pulse 4s ease-in-out infinite;
    }
    
    /* Typewriter cursor */
    .cursor {
      animation: blink 1s step-end infinite;
    }
    
    @keyframes blink {
      50% { opacity: 0; }
    }
    
    /* Social Links */
    .social-link {
      color: var(--text-secondary);
    }
    
    .social-link:hover {
      color: var(--primary);
    }
    
    /* Scroll Indicator */
    .scroll-indicator {
      display: flex;
      flex-direction: column;
      align-items: center;
      opacity: 0.6;
      transition: opacity 0.3s;
    }
    
    .scroll-indicator:hover {
      opacity: 1;
    }
    
    .mouse {
      width: 26px;
      height: 40px;
      border: 2px solid var(--text-muted);
      border-radius: 13px;
      position: relative;
    }
    
    .wheel {
      width: 4px;
      height: 8px;
      background: var(--text-muted);
      border-radius: 2px;
      position: absolute;
      top: 6px;
      left: 50%;
      transform: translateX(-50%);
      animation: scrollWheel 2s ease-in-out infinite;
    }
    
    @keyframes scrollWheel {
      0%, 100% { transform: translateX(-50%) translateY(0); opacity: 1; }
      50% { transform: translateX(-50%) translateY(8px); opacity: 0.3; }
    }
  `]
})
export class HeroComponent implements OnInit, OnDestroy {
  typewriterTexts = [
    'Desarrollador Full Stack Junior',
    'Apasionado por React y Angular',
    'Estudiante de Ing. de Sistemas',
    'Aprendiz constante'
  ];
  
  currentTypewriterText = '';
  private typewriterIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typewriterInterval: any;
  
  constructor(
    private scrollService: ScrollService,
    private gsapService: GsapService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  
  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      this.startTypewriter();
      
      // Initialize GSAP animations
      await this.gsapService.init();
      this.initGsapAnimations();
    }
  }
  
  private initGsapAnimations(): void {
    // Hero entrance animation
    const tl = this.gsapService.gsapInstance.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.from('.gsap-hero-title', {
      y: 60,
      opacity: 0,
      duration: 1,
      delay: 0.3
    })
    .from('.hero-greeting', {
      y: 20,
      opacity: 0,
      duration: 0.6
    }, '-=0.7')
    .from('.hero-name', {
      y: 30,
      opacity: 0,
      duration: 0.8
    }, '-=0.5')
    .from('.hero-subtitle', {
      y: 30,
      opacity: 0,
      duration: 0.6
    }, '-=0.4')
    .from('.hero-description', {
      y: 30,
      opacity: 0,
      duration: 0.6
    }, '-=0.4')
    .from('.hero-cta', {
      y: 30,
      opacity: 0,
      duration: 0.5
    }, '-=0.3')
    .from('.gsap-profile', {
      scale: 0.8,
      opacity: 0,
      duration: 1.2,
      ease: 'back.out(1.7)'
    }, '-=1')
    .from('.social-link', {
      y: 20,
      opacity: 0,
      duration: 0.4,
      stagger: 0.1
    }, '-=0.5');
    
    // Animate blobs
    this.gsapService.animateBlobs();
  }
  
  ngOnDestroy(): void {
    if (this.typewriterInterval) {
      clearTimeout(this.typewriterInterval);
    }
  }
  
  private startTypewriter(): void {
    const currentText = this.typewriterTexts[this.typewriterIndex];
    const typeSpeed = this.isDeleting ? 50 : 100;
    
    if (this.isDeleting) {
      this.currentTypewriterText = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.currentTypewriterText = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
    }
    
    if (!this.isDeleting && this.charIndex === currentText.length) {
      this.isDeleting = true;
      this.typewriterInterval = setTimeout(() => this.startTypewriter(), 2000);
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.typewriterIndex = (this.typewriterIndex + 1) % this.typewriterTexts.length;
      this.typewriterInterval = setTimeout(() => this.startTypewriter(), 500);
    } else {
      this.typewriterInterval = setTimeout(() => this.startTypewriter(), typeSpeed);
    }
  }
  
  scrollToProjects(): void {
    this.scrollService.scrollToSection('proyectos');
  }
  
}
