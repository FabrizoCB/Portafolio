import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

interface Experience {
  position: string;
  company: string;
  period: string;
  achievements: string[];
  icon: string;
  color: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section class="section-padding relative">
      <div class="section-container">
        <!-- Section Title -->
        <div class="text-center mb-16" appReveal>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Mi <span class="text-gradient">Trayectoria</span>
          </h2>
          <div class="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>
        
        <!-- Timeline -->
        <div class="relative max-w-4xl mx-auto">
          <!-- Timeline Line -->
          <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-accent rounded-full hidden md:block"></div>
          
          <!-- Mobile Timeline Line -->
          <div class="absolute left-6 w-1 h-full bg-gradient-to-b from-primary to-accent rounded-full md:hidden"></div>
          
          <!-- Experience Items -->
          @for (exp of experiences; track exp.position; let i = $index) {
            <div 
              class="relative mb-12 md:mb-16"
              appReveal
              [revealAnimation]="i % 2 === 0 ? 'slide-left' : 'slide-right'"
              [revealDelay]="i * 150"
            >
              <div class="grid md:grid-cols-2 gap-8 items-center">
                <!-- Content (alternating sides) -->
                @if (i % 2 === 0) {
                  <div class="md:text-right order-2 md:order-1 pl-14 md:pl-0">
                    <div class="experience-card glass rounded-2xl p-6 inline-block text-left w-full">
                      <div class="flex items-center gap-3 mb-3 md:flex-row-reverse">
                        <div 
                          class="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                          [style.background-color]="exp.color + '20'"
                          [style.color]="exp.color"
                        >
                          {{ exp.icon }}
                        </div>
                        <div class="md:text-right">
                          <h3 class="text-xl font-bold text-[var(--text-primary)]">{{ exp.position }}</h3>
                          <p class="text-[var(--primary)] font-medium">{{ exp.company }}</p>
                        </div>
                      </div>
                      <p class="text-sm text-[var(--accent)] mb-4 md:text-right">{{ exp.period }}</p>
                      <ul class="space-y-2">
                        @for (achievement of exp.achievements; track achievement) {
                          <li class="flex items-start gap-2 md:flex-row-reverse md:text-right">
                            <span class="text-[var(--accent)] shrink-0">▹</span>
                            <span class="text-sm text-[var(--text-secondary)]">{{ achievement }}</span>
                          </li>
                        }
                      </ul>
                    </div>
                  </div>
                  <!-- Timeline Dot -->
                  <div class="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div class="w-5 h-5 rounded-full bg-gradient-to-r from-primary to-accent ring-4 ring-[var(--bg-primary)]"></div>
                  </div>
                  <div class="flex md:hidden absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div class="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-accent ring-4 ring-[var(--bg-primary)]"></div>
                  </div>
                  <!-- Empty space for alternating layout -->
                  <div class="hidden md:block order-1 md:order-2"></div>
                } @else {
                  <!-- Empty space for alternating layout -->
                  <div class="hidden md:block order-1"></div>
                  <!-- Timeline Dot -->
                  <div class="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div class="w-5 h-5 rounded-full bg-gradient-to-r from-primary to-accent ring-4 ring-[var(--bg-primary)]"></div>
                  </div>
                  <div class="flex md:hidden absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div class="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-accent ring-4 ring-[var(--bg-primary)]"></div>
                  </div>
                  <!-- Content -->
                  <div class="order-2 pl-14 md:pl-0">
                    <div class="experience-card glass rounded-2xl p-6">
                      <div class="flex items-center gap-3 mb-3">
                        <div 
                          class="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                          [style.background-color]="exp.color + '20'"
                          [style.color]="exp.color"
                        >
                          {{ exp.icon }}
                        </div>
                        <div>
                          <h3 class="text-xl font-bold text-[var(--text-primary)]">{{ exp.position }}</h3>
                          <p class="text-[var(--primary)] font-medium">{{ exp.company }}</p>
                        </div>
                      </div>
                      <p class="text-sm text-[var(--accent)] mb-4">{{ exp.period }}</p>
                      <ul class="space-y-2">
                        @for (achievement of exp.achievements; track achievement) {
                          <li class="flex items-start gap-2">
                            <span class="text-[var(--accent)] shrink-0">▹</span>
                            <span class="text-sm text-[var(--text-secondary)]">{{ achievement }}</span>
                          </li>
                        }
                      </ul>
                    </div>
                  </div>
                }
              </div>
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
    
    .experience-card {
      border: 1px solid var(--border-color);
      transition: all 0.3s ease;
    }
    
    .experience-card:hover {
      border-color: var(--primary);
      transform: translateY(-4px);
      box-shadow: 0 20px 40px -12px rgba(99, 102, 241, 0.2);
    }
  `]
})
export class ExperienceComponent {
  experiences: Experience[] = [
    {
      position: 'Desarrollador Web Full Stack Junior',
      company: 'Decateca',
      period: '21 jun 2025 — 30 abr 2026',
      achievements: [
        'Desarrollo de APIs RESTful con Python y Flask para la gestión de servicios backend',
        'Diseño e implementación de interfaces de usuario interactivas con React y JavaScript',
        'Modelado y administración de bases de datos NoSQL con MongoDB Compass',
        'Integración de frontend y backend mediante consumo de endpoints y manejo de estados',
        'Colaboración en equipo utilizando metodologías ágiles y control de versiones con Git'
      ],
      icon: '💻',
      color: '#6366F1'
    }
  ];
}
