import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="relative pt-16 pb-8 border-t border-[var(--border-color)]">
      <div class="section-container">
        <!-- Main Footer Content -->
        <div class="grid md:grid-cols-3 gap-12 mb-12">
          <!-- Brand -->
          <div>
            <div class="flex items-center gap-2 mb-4">
              <span class="text-3xl font-bold text-gradient font-display">FC</span>
            </div>
            <p class="text-[var(--text-secondary)] mb-4">
              Desarrollador Web Full Stack Junior construyendo soluciones digitales con pasión, código limpio y aprendizaje constante.
            </p>
            <div class="flex gap-3">
              <!-- LinkedIn -->
              <a 
                href="https://www.linkedin.com/in/fabrizio-castro-barrientos-0a082a332/"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-lg glass flex items-center justify-center text-[var(--text-secondary)] transition-all duration-300 hover:text-[var(--primary)] hover:scale-110"
                aria-label="LinkedIn"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              
              <!-- GitHub -->
              <a 
                href="https://github.com/FabrizoCB"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-lg glass flex items-center justify-center text-[var(--text-secondary)] transition-all duration-300 hover:text-[var(--primary)] hover:scale-110"
                aria-label="GitHub"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              
              <!-- WhatsApp -->
              <a 
                href="https://wa.me/51983571781"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-lg glass flex items-center justify-center text-[var(--text-secondary)] transition-all duration-300 hover:text-[var(--primary)] hover:scale-110"
                aria-label="WhatsApp"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.52-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <!-- Quick Links -->
          <div>
            <h4 class="text-lg font-semibold text-[var(--text-primary)] mb-4">Enlaces rápidos</h4>
            <ul class="space-y-2">
              @for (link of quickLinks; track link.id) {
                <li>
                  <a 
                    [href]="'#' + link.id"
                    (click)="scrollToSection(link.id, $event)"
                    class="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                  >
                    {{ link.label }}
                  </a>
                </li>
              }
            </ul>
          </div>
          
          <!-- Contact -->
          <div>
            <h4 class="text-lg font-semibold text-[var(--text-primary)] mb-4">Contacto</h4>
            <ul class="space-y-3">
              <li class="flex items-center gap-3 text-[var(--text-secondary)]">
                <span>📧</span>
                <a href="mailto:castrobarrientosfabriziojamed@gmail.com" class="hover:text-[var(--primary)] transition-colors">
                  castrobarrientosfabriziojamed&#64;gmail.com
                </a>
              </li>
              <li class="flex items-center gap-3 text-[var(--text-secondary)]">
                <span>📱</span>
                <a href="tel:+51983571781" class="hover:text-[var(--primary)] transition-colors">
                  (+51) 983571781
                </a>
              </li>
              <li class="flex items-center gap-3 text-[var(--text-secondary)]">
                <span>📍</span>
                <span>Puente Piedra, Lima, Perú</span>
              </li>
            </ul>
          </div>
        </div>
        
        <!-- Divider -->
        <div class="h-px bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent mb-8"></div>
        
        <!-- Bottom Footer -->
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-sm text-[var(--text-muted)] text-center md:text-left">
            © {{ currentYear }} Fabrizio Castro Barrientos. Todos los derechos reservados.
          </p>
          <p class="text-sm text-[var(--text-muted)] flex items-center gap-1">
            Diseñado y desarrollado con 
            <span class="text-red-500">❤️</span>
            usando Angular
          </p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      background: var(--bg-primary);
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  quickLinks = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'sobre-mi', label: 'Sobre mí' },
    { id: 'habilidades', label: 'Habilidades' },
    { id: 'experiencia', label: 'Experiencia' },
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'educacion', label: 'Educación' }
  ];
  
  constructor(private scrollService: ScrollService) {}
  
  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault();
    this.scrollService.scrollToSection(sectionId);
  }
}
