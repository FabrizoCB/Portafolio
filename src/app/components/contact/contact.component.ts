import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RevealDirective } from '../../directives/reveal.directive';

interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  url: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RevealDirective],
  template: `
    <section class="section-padding relative">
      <div class="section-container">
        <!-- Section Title -->
        <div class="text-center mb-16" appReveal>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Trabajemos <span class="text-gradient">juntos</span>
          </h2>
          <p class="text-lg text-[var(--text-secondary)]">
            ¿Tienes un proyecto en mente? Conversemos.
          </p>
          <div class="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-6"></div>
        </div>
        
        <div class="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <!-- Contact Info -->
          <div appReveal revealAnimation="fade-left">
            <h3 class="text-2xl font-bold text-[var(--text-primary)] mb-6">
              Información de contacto
            </h3>
            
            <div class="space-y-6">
              @for (info of contactInfo; track info.label) {
                <a 
                  [href]="info.url"
                  class="contact-item flex items-center gap-4 p-4 rounded-xl glass transition-all duration-300 hover:scale-105"
                  [class.group]="true"
                >
                  <div class="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center text-xl text-white shrink-0">
                    {{ info.icon }}
                  </div>
                  <div>
                    <p class="text-sm text-[var(--text-secondary)]">{{ info.label }}</p>
                    <p class="font-medium text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                      {{ info.value }}
                    </p>
                  </div>
                </a>
              }
            </div>
            
            <!-- Social Links -->
            <div class="mt-8">
              <p class="text-sm text-[var(--text-secondary)] mb-4">Sígueme en redes</p>
              <div class="flex gap-4">
                @for (social of socialLinks; track social.name) {
                  <a 
                    [href]="social.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="social-link w-12 h-12 rounded-xl glass flex items-center justify-center text-[var(--text-secondary)] transition-all duration-300 hover:scale-110 hover:text-[var(--primary)]"
                    [attr.aria-label]="social.name"
                    [innerHTML]="social.icon"
                  ></a>
                }
              </div>
            </div>
          </div>
          
          <!-- Contact Form -->
          <div appReveal revealAnimation="fade-right" [revealDelay]="200">
            <div class="glass rounded-2xl p-8">
              <h3 class="text-xl font-bold text-[var(--text-primary)] mb-6">
                Envíame un mensaje
              </h3>
              
              <!-- 
                NOTA: Este formulario es estático y usa mailto:.
                Para usar un servicio como Formspree o EmailJS:
                1. Cambiar (submit) por ngSubmit con el servicio
                2. Configurar la API key en el servicio correspondiente
                3. Ejemplo con Formspree: action="https://formspree.io/f/YOUR_FORM_ID"
              -->
              <form 
                action="mailto:castrobarrientosfabriziojamed&#64;gmail.com"
                method="post"
                enctype="text/plain"
                class="space-y-6"
              >
                <div class="form-group">
                  <input 
                    type="text"
                    id="name"
                    name="name"
                    [(ngModel)]="formData.name"
                    class="form-input peer"
                    placeholder=" "
                    required
                  />
                  <label for="name" class="form-label">Nombre</label>
                </div>
                
                <div class="form-group">
                  <input 
                    type="email"
                    id="email"
                    name="email"
                    [(ngModel)]="formData.email"
                    class="form-input peer"
                    placeholder=" "
                    required
                  />
                  <label for="email" class="form-label">Email</label>
                </div>
                
                <div class="form-group">
                  <input 
                    type="text"
                    id="subject"
                    name="subject"
                    [(ngModel)]="formData.subject"
                    class="form-input peer"
                    placeholder=" "
                    required
                  />
                  <label for="subject" class="form-label">Asunto</label>
                </div>
                
                <div class="form-group">
                  <textarea 
                    id="message"
                    name="message"
                    [(ngModel)]="formData.message"
                    rows="4"
                    class="form-input peer resize-none"
                    placeholder=" "
                    required
                  ></textarea>
                  <label for="message" class="form-label">Mensaje</label>
                </div>
                
                <button 
                  type="submit"
                  class="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-glow flex items-center justify-center gap-2 group"
                >
                  <span>Enviar mensaje</span>
                  <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                  </svg>
                </button>
              </form>
              
              <!-- Alternative services note -->
              <p class="text-xs text-[var(--text-muted)] mt-4 text-center">
                Para integrar Formspree o EmailJS, reemplazar el form action con tu endpoint.
              </p>
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
    
    .contact-item {
      border: 1px solid var(--border-color);
    }
    
    .contact-item:hover {
      border-color: var(--primary);
    }
    
    .social-link {
      border: 1px solid var(--border-color);
    }
    
    .social-link:hover {
      border-color: var(--primary);
    }
    
    /* Floating Label Form */
    .form-group {
      position: relative;
    }
    
    .form-input {
      width: 100%;
      padding: 1rem 1rem 0.5rem;
      background: var(--bg-tertiary);
      border: 2px solid var(--border-color);
      border-radius: 0.75rem;
      color: var(--text-primary);
      font-size: 1rem;
      transition: all 0.3s ease;
      outline: none;
    }
    
    .form-input:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }
    
    .form-input:not(:placeholder-shown) + .form-label,
    .form-input:focus + .form-label {
      transform: translateY(-1.5rem) scale(0.85);
      color: var(--primary);
    }
    
    .form-label {
      position: absolute;
      left: 1rem;
      top: 0.75rem;
      color: var(--text-secondary);
      font-size: 1rem;
      pointer-events: none;
      transition: all 0.3s ease;
      transform-origin: left top;
    }
  `]
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  contactInfo: ContactInfo[] = [
    {
      icon: '📧',
      label: 'Email',
      value: 'castrobarrientosfabriziojamed&#64;gmail.com',
      url: 'mailto:castrobarrientosfabriziojamed&#64;gmail.com'
    },
    {
      icon: '📱',
      label: 'Teléfono',
      value: '(+51) 983571781',
      url: 'tel:+51983571781'
    },
    {
      icon: '📍',
      label: 'Ubicación',
      value: 'Puente Piedra, Lima, Perú',
      url: 'https://maps.google.com/?q=Puente+Piedra,Lima,Peru'
    }
  ];
  
  socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/fabrizio-castro',
      icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`
    },
    {
      name: 'GitHub',
      url: 'https://github.com/fabrizio-castro',
      icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/51983571781',
      icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.52-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>`
    }
  ];
}
