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
                class="education-card glass rounded-2xl p-6 flex items-start gap-4 transition-all duration-300 hover:scale-[1.02] gsap-edu-card"
                appReveal
                [revealAnimation]="i % 2 === 0 ? 'slide-left' : 'slide-right'"
                [revealDelay]="i * 100"
              >
                @if (edu.logo) {
                  <div class="edu-logo-container w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white/5 flex items-center justify-center p-2 border border-[var(--border-color)]">
                    <img 
                      [src]="edu.logo" 
                      [alt]="edu.institution"
                      class="w-full h-full object-contain gsap-edu-logo"
                      loading="lazy"
                    />
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
    
    .edu-logo-container {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%);
    }
    
    .edu-logo-container:hover {
      transform: scale(1.1) rotate(5deg);
      box-shadow: 0 8px 25px -5px rgba(99, 102, 241, 0.3);
      border-color: var(--primary);
    }
    
    .edu-logo-container img {
      filter: grayscale(20%);
      transition: filter 0.3s ease;
    }
    
    .edu-logo-container:hover img {
      filter: grayscale(0%);
    }
    
    @keyframes floatLogo {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
    }
    
    .gsap-edu-logo {
      animation: floatLogo 3s ease-in-out infinite;
    }
    
    .gsap-edu-card:nth-child(1) .gsap-edu-logo {
      animation-delay: 0s;
    }
    
    .gsap-edu-card:nth-child(2) .gsap-edu-logo {
      animation-delay: 0.5s;
    }
    
    .gsap-edu-card:nth-child(3) .gsap-edu-logo {
      animation-delay: 1s;
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
