import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

interface Education {
  institution: string;
  degree: string;
  status: string;
  icon?: string;
  logo?: string;
  color: string;
}

interface Language {
  name: string;
  level: string;
  progress: number;
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section class="section-padding relative">
      <div class="section-container">
        <!-- Section Title -->
        <div class="text-center mb-16" appReveal>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Mi Formación <span class="text-gradient">Académica</span>
          </h2>
          <div class="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>
        
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Education Cards -->
          <div class="lg:col-span-2 space-y-6">
            @for (edu of educationList; track edu.institution; let i = $index) {
              <div 
                class="education-card glass rounded-2xl p-5 flex items-center gap-5 transition-all duration-300 hover:scale-[1.02] gsap-edu-card"
                appReveal
                [revealAnimation]="i % 2 === 0 ? 'slide-left' : 'slide-right'"
                [revealDelay]="i * 100"
              >
                @if (edu.logo) {
                  <div class="edu-logo-wrapper">
                    <div class="edu-logo-glow" [style.background-color]="edu.color"></div>
                    <div class="edu-logo-container">
                      <img 
                        [src]="edu.logo" 
                        [alt]="edu.institution"
                        class="edu-logo-img"
                        loading="lazy"
                      />
                    </div>
                  </div>
                } @else {
                  <div 
                    class="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
                    [style.background-color]="edu.color + '20'"
                    [style.color]="edu.color"
                  >
                    {{ edu.icon }}
                  </div>
                }
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-[var(--text-primary)] mb-1">{{ edu.institution }}</h3>
                  <p class="text-[var(--primary)] font-medium mb-1">{{ edu.degree }}</p>
                  <span 
                    class="inline-block px-3 py-1 rounded-full text-xs font-medium"
                    [style.background-color]="edu.color + '20'"
                    [style.color]="edu.color"
                  >
                    {{ edu.status }}
                  </span>
                </div>
              </div>
            }
          </div>
          
          <!-- Languages Card -->
          <div appReveal revealAnimation="fade-right" [revealDelay]="200">
            <div class="glass rounded-2xl p-6 h-full">
              <h3 class="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                <span class="text-2xl">🌍</span>
                Idiomas
              </h3>
              
              <div class="space-y-6">
                @for (lang of languages; track lang.name) {
                  <div>
                    <div class="flex justify-between items-center mb-2">
                      <span class="font-medium text-[var(--text-primary)]">{{ lang.name }}</span>
                      <span class="text-sm text-[var(--text-secondary)]">{{ lang.level }}</span>
                    </div>
                    <div class="h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                      <div 
                        class="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
                        [style.width.%]="lang.progress"
                      ></div>
                    </div>
                  </div>
                }
              </div>
              
              <!-- Certifications -->
              <div class="mt-8 pt-6 border-t border-[var(--border-color)]">
                <h4 class="text-lg font-semibold text-[var(--text-primary)] mb-4">Certificaciones</h4>
                <div class="space-y-3">
                  @for (cert of certifications; track cert) {
                    <div class="flex items-center gap-3 text-[var(--text-secondary)]">
                      <span class="text-[var(--accent)]">✓</span>
                      <span class="text-sm">{{ cert }}</span>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section-padding {
      padding: 6rem 0;
    }
    
    .education-card {
      border: 1px solid var(--border-color);
    }
    
    .education-card:hover {
      border-color: var(--primary);
      box-shadow: 0 10px 30px -10px rgba(99, 102, 241, 0.2);
    }
    
    .edu-logo-wrapper {
      position: relative;
      width: 72px;
      height: 72px;
      flex-shrink: 0;
    }
    
    .edu-logo-glow {
      position: absolute;
      inset: -2px;
      border-radius: 18px;
      opacity: 0.3;
      filter: blur(8px);
      transition: all 0.4s ease;
    }
    
    .education-card:hover .edu-logo-glow {
      opacity: 0.6;
      filter: blur(12px);
    }
    
    .edu-logo-container {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 16px;
      overflow: hidden;
      background: linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 
        0 4px 6px -1px rgba(0,0,0,0.1),
        0 2px 4px -2px rgba(0,0,0,0.1),
        inset 0 1px 0 rgba(255,255,255,0.1);
    }
    
    .education-card:hover .edu-logo-container {
      transform: translateY(-4px) scale(1.05);
      border-color: rgba(255,255,255,0.2);
      box-shadow: 
        0 20px 25px -5px rgba(0,0,0,0.2),
        0 8px 10px -6px rgba(0,0,0,0.1),
        inset 0 1px 0 rgba(255,255,255,0.15);
    }
    
    .edu-logo-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      transition: all 0.4s ease;
      filter: contrast(1.05);
    }
    
    .education-card:hover .edu-logo-img {
      transform: scale(1.08);
    }
    
    @keyframes subtleFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-3px); }
    }
    
    .gsap-edu-card:nth-child(1) .edu-logo-container {
      animation: subtleFloat 4s ease-in-out infinite;
    }
    
    .gsap-edu-card:nth-child(2) .edu-logo-container {
      animation: subtleFloat 4s ease-in-out infinite 0.6s;
    }
    
    .gsap-edu-card:nth-child(3) .edu-logo-container {
      animation: subtleFloat 4s ease-in-out infinite 1.2s;
    }
  `]
})
export class EducationComponent {
  educationList: Education[] = [
    {
      institution: 'Universidad Privada del Norte (UPN)',
      degree: 'Ingeniería de Sistemas',
      status: '9.° Ciclo (En curso)',
      logo: 'assets/images/logo_upn.png',
      color: '#6366F1'
    },
    {
      institution: 'Instituto Cultural Peruano Norteamericano',
      degree: 'Estudios de Inglés',
      status: 'Completado',
      logo: 'assets/images/logo_icpna.png',
      color: '#06B6D4'
    },
    {
      institution: 'I.E. Domingo Faustino Sarmiento',
      degree: 'Educación Secundaria',
      status: 'Completado',
      logo: 'assets/images/logo_colegio_sarmiento.jpg',
      color: '#8B5CF6'
    }
  ];
  
  languages: Language[] = [
    { name: 'Español', level: 'Nativo', progress: 100 },
    { name: 'Inglés', level: 'Intermedio', progress: 60 }
  ];
  
  certifications = [
    'Desarrollo Web Full Stack',
    'Bases de Datos NoSQL',
    'Metodologías Ágiles (Scrum)'
  ];
}
