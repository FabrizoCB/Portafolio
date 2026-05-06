import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav 
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      [class.glass-strong]="isScrolled"
      [class.shadow-lg]="isScrolled"
      [class.py-2]="isScrolled"
      [class.py-4]="!isScrolled"
    >
      <div class="section-container">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <a href="#inicio" (click)="scrollToSection('inicio', $event)" class="flex items-center gap-2 group">
            <div class="logo-container">
              <span class="logo-text">FC</span>
              <div class="logo-glow group-hover:opacity-100"></div>
            </div>
          </a>
          
          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center gap-8">
            @for (item of navItems; track item.id) {
              <a 
                [href]="'#' + item.id"
                (click)="scrollToSection(item.id, $event)"
                class="nav-link text-sm font-medium transition-colors duration-200"
                [class.text-primary]="activeSection === item.id"
              >
                {{ item.label }}
              </a>
            }
          </div>
          
          <!-- Actions -->
          <div class="flex items-center gap-4">
            <!-- Theme Toggle -->
            <button 
              class="theme-toggle p-2 rounded-lg transition-colors duration-200"
              (click)="toggleTheme()"
              [attr.aria-label]="isDarkMode() ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
            >
              @if (isDarkMode()) {
                <!-- Sun icon -->
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5" stroke-width="2"/>
                  <path stroke-width="2" stroke-linecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              } @else {
                <!-- Moon icon -->
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                </svg>
              }
            </button>
            
            <!-- Mobile Menu Toggle -->
            <button 
              class="md:hidden p-2 rounded-lg transition-colors duration-200"
              (click)="toggleMobileMenu()"
              [class.active]="isMobileMenuOpen"
              aria-label="Menú"
            >
              <div class="hamburger" [class.active]="isMobileMenuOpen">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Mobile Menu -->
      @if (isMobileMenuOpen) {
        <div 
          class="md:hidden absolute top-full left-0 right-0 glass-strong border-t border-[var(--border-color)]"
          @slideDown
        >
          <div class="section-container py-4 flex flex-col gap-2">
            @for (item of navItems; track item.id) {
              <a 
                [href]="'#' + item.id"
                (click)="scrollToSection(item.id, $event); toggleMobileMenu()"
                class="mobile-nav-link py-3 px-4 rounded-lg transition-colors duration-200"
                [class.text-primary]="activeSection === item.id"
              >
                {{ item.label }}
              </a>
            }
          </div>
        </div>
      }
    </nav>
  `,
  styles: [`
    nav {
      background: transparent;
    }
    
    nav.glass-strong {
      background: var(--glass-bg);
      backdrop-filter: blur(20px);
    }
    
    .logo-container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .logo-text {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.75rem;
      font-weight: 700;
      background: linear-gradient(135deg, #6366F1 0%, #06B6D4 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      position: relative;
      z-index: 2;
    }
    
    .logo-glow {
      position: absolute;
      inset: -10px;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(6, 182, 212, 0.4) 100%);
      border-radius: 50%;
      filter: blur(15px);
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 1;
    }
    
    .nav-link {
      position: relative;
      color: var(--text-secondary);
      text-decoration: none;
    }
    
    .nav-link:hover {
      color: var(--primary);
    }
    
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #6366F1, #06B6D4);
      transition: width 0.3s ease;
    }
    
    .nav-link:hover::after,
    .nav-link.text-primary::after {
      width: 100%;
    }
    
    .mobile-nav-link {
      color: var(--text-primary);
      text-decoration: none;
    }
    
    .mobile-nav-link:hover {
      background: var(--bg-tertiary);
      color: var(--primary);
    }
    
    .theme-toggle {
      color: var(--text-secondary);
    }
    
    .theme-toggle:hover {
      background: var(--bg-tertiary);
      color: var(--primary);
    }
    
    /* Hamburger Menu */
    .hamburger {
      width: 24px;
      height: 20px;
      position: relative;
      cursor: pointer;
    }
    
    .hamburger span {
      position: absolute;
      width: 100%;
      height: 2px;
      background: var(--text-primary);
      border-radius: 2px;
      transition: all 0.3s ease;
      left: 0;
    }
    
    .hamburger span:nth-child(1) {
      top: 0;
    }
    
    .hamburger span:nth-child(2) {
      top: 9px;
    }
    
    .hamburger span:nth-child(3) {
      bottom: 0;
    }
    
    .hamburger.active span:nth-child(1) {
      top: 9px;
      transform: rotate(45deg);
    }
    
    .hamburger.active span:nth-child(2) {
      opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
      bottom: 9px;
      transform: rotate(-45deg);
    }
  `]
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  isMobileMenuOpen = false;
  activeSection = 'inicio';
  
  navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'sobre-mi', label: 'Sobre mí' },
    { id: 'habilidades', label: 'Habilidades' },
    { id: 'experiencia', label: 'Experiencia' },
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'educacion', label: 'Educación' }
  ];
  
  constructor(
    private themeService: ThemeService,
    private scrollService: ScrollService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollSpy();
    }
  }
  
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled = this.scrollService.getScrollPosition() > 50;
    }
  }
  
  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }
  
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
  
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  
  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault();
    this.scrollService.scrollToSection(sectionId);
  }
  
  private setupScrollSpy(): void {
    const sections = this.navItems.map(item => document.getElementById(item.id));
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSection = entry.target.id;
        }
      });
    }, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' });
    
    sections.forEach(section => {
      if (section) observer.observe(section);
    });
  }
}
