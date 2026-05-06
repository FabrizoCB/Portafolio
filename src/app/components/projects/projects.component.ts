import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  demoUrl: string;
  codeUrl: string;
  color: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section class="section-padding relative bg-[var(--bg-secondary)]/30">
      <div class="section-container">
        <!-- Section Title -->
        <div class="text-center mb-12" appReveal>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Proyectos en los que he <span class="text-gradient">trabajado</span>
          </h2>
          <div class="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>
        
        <!-- Category Filters -->
        <div class="flex flex-wrap justify-center gap-3 mb-12" appReveal [revealDelay]="100">
          @for (filter of filters; track filter) {
            <button 
              (click)="activeFilter = filter"
              class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
              [class.bg-gradient-to-r]="activeFilter === filter"
              [class.from-primary]="activeFilter === filter"
              [class.to-accent]="activeFilter === filter"
              [class.text-white]="activeFilter === filter"
              [class.bg-[var(--bg-tertiary)]]="activeFilter !== filter"
              [class.text-[var(--text-secondary)]]="activeFilter !== filter"
              [class.hover:text-[var(--primary)]]="activeFilter !== filter"
            >
              {{ filter }}
            </button>
          }
        </div>
        
        <!-- Projects Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (project of filteredProjects; track project.title; let i = $index) {
            <div 
              class="project-card group rounded-2xl overflow-hidden bg-[var(--card-bg)] border border-[var(--border-color)] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              appReveal
              [revealDelay]="i * 100"
            >
              <!-- Project Image -->
              <div class="relative h-48 overflow-hidden">
                <div 
                  class="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                  [style.background]="'linear-gradient(135deg, ' + project.color + '40, ' + project.color + '20)'"
                ></div>
                <!-- Gradient placeholder for image -->
                <div 
                  class="absolute inset-0 flex items-center justify-center text-6xl"
                  [style.background]="'linear-gradient(135deg, ' + project.color + ', ' + project.color + '80)'"
                >
                  🚀
                </div>
                <!-- Overlay on hover -->
                <div class="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/90 via-[var(--bg-primary)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <div class="flex gap-3">
                    <a 
                      [href]="project.demoUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/20 transition-colors"
                    >
                      Ver Demo
                    </a>
                    <a 
                      [href]="project.codeUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/20 transition-colors"
                    >
                      Ver Código
                    </a>
                  </div>
                </div>
              </div>
              
              <!-- Project Info -->
              <div class="p-6">
                <h3 class="text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--primary)] transition-colors">
                  {{ project.title }}
                </h3>
                <p class="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                  {{ project.description }}
                </p>
                
                <!-- Tech Stack -->
                <div class="flex flex-wrap gap-2">
                  @for (tech of project.tech; track tech) {
                    <span 
                      class="px-3 py-1 rounded-full text-xs font-medium"
                      [style.background-color]="project.color + '20'"
                      [style.color]="project.color"
                    >
                      {{ tech }}
                    </span>
                  }
                </div>
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
    
    .project-card {
      transition: all 0.5s ease;
    }
    
    .project-card:hover {
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3);
    }
    
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class ProjectsComponent {
  activeFilter = 'Todos';
  filters = ['Todos', 'Web', 'Mobile', 'Full Stack', 'API'];
  
  projects: Project[] = [
    {
      title: 'Plataforma E-commerce',
      category: 'Full Stack',
      description: 'Plataforma completa de comercio electrónico con gestión de productos, carrito de compras y pasarela de pagos.',
      image: '',
      tech: ['React', 'Flask', 'MongoDB', 'TailwindCSS'],
      demoUrl: '#',
      codeUrl: '#',
      color: '#6366F1'
    },
    {
      title: 'App Móvil de Hábitos',
      category: 'Mobile',
      description: 'Aplicación móvil para seguimiento de hábitos alimenticios y nutrición personalizada.',
      image: '',
      tech: ['React Native', 'Android Studio', 'Node.js'],
      demoUrl: '#',
      codeUrl: '#',
      color: '#06B6D4'
    },
    {
      title: 'API RESTful Inventario',
      category: 'API',
      description: 'API completa para gestión de inventario con autenticación, CRUD y reportes.',
      image: '',
      tech: ['Python', 'Flask', 'MongoDB', 'JWT'],
      demoUrl: '#',
      codeUrl: '#',
      color: '#8B5CF6'
    },
    {
      title: 'Dashboard Administrativo',
      category: 'Web',
      description: 'Panel de administración moderno con visualización de datos en tiempo real.',
      image: '',
      tech: ['Angular', 'TailwindCSS', 'Chart.js', 'TypeScript'],
      demoUrl: '#',
      codeUrl: '#',
      color: '#F59E0B'
    },
    {
      title: 'Sistema de Punto de Venta',
      category: 'Full Stack',
      description: 'Sistema POS completo con gestión de ventas, inventario y reportes financieros.',
      image: '',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      demoUrl: '#',
      codeUrl: '#',
      color: '#10B981'
    },
    {
      title: 'Landing Page Corporativa',
      category: 'Web',
      description: 'Página de aterrizaje moderna y responsive para empresa tecnológica.',
      image: '',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
      demoUrl: '#',
      codeUrl: '#',
      color: '#EC4899'
    }
  ];
  
  get filteredProjects(): Project[] {
    if (this.activeFilter === 'Todos') {
      return this.projects;
    }
    return this.projects.filter(p => p.category === this.activeFilter);
  }
}
