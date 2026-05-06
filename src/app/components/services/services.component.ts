import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';
import { TiltDirective } from '../../directives/tilt.directive';

interface Service {
  icon: string;
  title: string;
  description: string;
  color: string;
  features: string[];
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RevealDirective, TiltDirective],
  template: `
    <section class="section-padding relative bg-[var(--bg-secondary)]/30">
      <div class="section-container">
        <!-- Section Title -->
        <div class="text-center mb-16" appReveal>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            ¿Qué puedo hacer por <span class="text-gradient">ti?</span>
          </h2>
          <p class="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Servicios profesionales adaptados a tus necesidades
          </p>
          <div class="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-6"></div>
        </div>
        
        <!-- Services Grid -->
        <div class="grid md:grid-cols-2 gap-8">
          @for (service of services; track service.title; let i = $index) {
            <div 
              class="service-card glass rounded-2xl p-8 transition-all duration-300"
              appTilt
              appReveal
              [revealDelay]="i * 100"
            >
              <!-- Icon -->
              <div 
                class="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 transition-transform duration-300 group-hover:scale-110"
                [style.background-color]="service.color + '20'"
                [style.color]="service.color"
              >
                {{ service.icon }}
              </div>
              
              <!-- Content -->
              <h3 class="text-2xl font-bold text-[var(--text-primary)] mb-3">
                {{ service.title }}
              </h3>
              <p class="text-[var(--text-secondary)] mb-6">
                {{ service.description }}
              </p>
              
              <!-- Features -->
              <ul class="space-y-2">
                @for (feature of service.features; track feature) {
                  <li class="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <span [style.color]="service.color">▹</span>
                    {{ feature }}
                  </li>
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section-padding {
      padding: 6rem 0;
    }
    
    .service-card {
      border: 1px solid var(--border-color);
    }
    
    .service-card:hover {
      border-color: var(--primary);
      box-shadow: 0 20px 40px -12px rgba(99, 102, 241, 0.2);
    }
  `]
})
export class ServicesComponent {
  services: Service[] = [
    {
      icon: '💻',
      title: 'Desarrollo Web Full Stack',
      description: 'Aplicaciones web completas con las últimas tecnologías frontend y backend.',
      color: '#6366F1',
      features: [
        'Desarrollo frontend con React y Angular',
        'Backend robusto con Python y Flask',
        'Bases de datos SQL y NoSQL',
        'APIs RESTful seguras y escalables'
      ]
    },
    {
      icon: '📱',
      title: 'Desarrollo Móvil',
      description: 'Apps nativas e híbridas que funcionan perfectamente en todos los dispositivos.',
      color: '#06B6D4',
      features: [
        'Apps nativas con Android Studio',
        'Desarrollo híbrido con React Native',
        'Interfaces intuitivas y modernas',
        'Integración con APIs y servicios'
      ]
    },
    {
      icon: '🔌',
      title: 'APIs RESTful',
      description: 'Backend escalable y seguro para potenciar tus aplicaciones.',
      color: '#8B5CF6',
      features: [
        'Diseño de arquitectura API',
        'Autenticación y autorización JWT',
        'Documentación completa',
        'Testing y optimización'
      ]
    },
    {
      icon: '🎨',
      title: 'UI/UX Implementation',
      description: 'Interfaces modernas y responsivas que cautivan a los usuarios.',
      color: '#EC4899',
      features: [
        'Diseño responsive con TailwindCSS',
        'Animaciones y transiciones fluidas',
        'Optimización de experiencia de usuario',
        'Implementación pixel-perfect'
      ]
    }
  ];
}
