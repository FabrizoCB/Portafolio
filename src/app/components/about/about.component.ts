import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimatedCounterComponent } from '../../shared/animated-counter/animated-counter.component';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, AnimatedCounterComponent, RevealDirective],
  template: `
    <section class="section-padding relative">
      <div class="section-container">
        <!-- Section Title -->
        <div class="text-center mb-16" appReveal>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Sobre <span class="text-gradient">mí</span>
          </h2>
          <div class="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>
        
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left - Code Window -->
          <div class="relative" appReveal revealAnimation="fade-left">
            <div class="code-window">
              <!-- Window Header -->
              <div class="window-header">
                <div class="window-dots">
                  <span class="dot dot-red"></span>
                  <span class="dot dot-yellow"></span>
                  <span class="dot dot-green"></span>
                </div>
                <span class="window-title">about-me.js</span>
              </div>
              
              <!-- Code Content -->
              <div class="code-content">
                <div class="code-line">
                  <span class="line-number">1</span>
                  <span class="code-text"><span class="keyword">const</span> <span class="variable">developer</span> = {{ '{' }}</span>
                </div>
                <div class="code-line">
                  <span class="line-number">2</span>
                  <span class="code-text">  <span class="property">name</span>: <span class="string">'Fabrizio Castro'</span>,</span>
                </div>
                <div class="code-line">
                  <span class="line-number">3</span>
                  <span class="code-text">  <span class="property">role</span>: <span class="string">'Full Stack Junior'</span>,</span>
                </div>
                <div class="code-line">
                  <span class="line-number">4</span>
                  <span class="code-text">  <span class="property">education</span>: <span class="string">'9° ciclo UPN'</span>,</span>
                </div>
                <div class="code-line">
                  <span class="line-number">5</span>
                  <span class="code-text">  <span class="property">skills</span>: [<span class="string">'React'</span>, <span class="string">'Angular'</span>],</span>
                </div>
                <div class="code-line">
                  <span class="line-number">6</span>
                  <span class="code-text">  <span class="property">passion</span>: <span class="string">'Building cool stuff'</span></span>
                </div>
                <div class="code-line">
                  <span class="line-number">7</span>
                  <span class="code-text">{{ '}' }};</span>
                </div>
                <div class="code-line cursor-line">
                  <span class="line-number">8</span>
                  <span class="code-text"><span class="cursor">|</span></span>
                </div>
              </div>
            </div>
            
            <!-- Floating Tech Icons -->
            <div class="tech-icon icon-react">⚛️</div>
            <div class="tech-icon icon-angular">🅰️</div>
            <div class="tech-icon icon-python">🐍</div>
          </div>
          
          <!-- Right - Content -->
          <div appReveal revealAnimation="fade-right">
            <div class="space-y-6">
              <p class="text-lg text-[var(--text-secondary)] leading-relaxed">
                Estudiante de <span class="text-[var(--primary)] font-semibold">9.° ciclo de Ingeniería de Sistemas</span> en la Universidad Privada del Norte (UPN). Joven apasionado por el desarrollo de software con ganas de aprender y crecer profesionalmente.
              </p>
              
              <p class="text-lg text-[var(--text-secondary)] leading-relaxed">
                Destaco por mi <span class="text-[var(--accent)] font-semibold">capacidad de trabajo en equipo</span>, análisis y resolución de problemas, aprendizaje rápido a través de la práctica y buen desenvolvimiento laboral.
              </p>
              
              <div class="flex flex-wrap gap-3 pt-4">
                @for (tag of tags; track tag) {
                  <span class="px-4 py-2 rounded-full text-sm font-medium bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-color)]">
                    {{ tag }}
                  </span>
                }
              </div>
            </div>
            
            <!-- Stats -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              @for (stat of stats; track stat.label) {
                <div class="stat-card glass rounded-xl p-4 text-center transition-all duration-300 hover:scale-105">
                  <div class="text-3xl font-bold text-gradient mb-1">
                    <app-animated-counter [value]="stat.value" suffix="+"></app-animated-counter>
                  </div>
                  <p class="text-sm text-[var(--text-secondary)]">{{ stat.label }}</p>
                </div>
              }
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
    
    /* Code Window */
    .code-window {
      background: var(--bg-secondary);
      border-radius: 16px;
      border: 1px solid var(--border-color);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(99, 102, 241, 0.2);
      overflow: hidden;
      max-width: 420px;
      margin: 0 auto;
    }
    
    .window-header {
      background: var(--bg-tertiary);
      padding: 12px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid var(--border-color);
    }
    
    .window-dots {
      display: flex;
      gap: 6px;
    }
    
    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
    
    .dot-red { background: #FF5F56; }
    .dot-yellow { background: #FFBD2E; }
    .dot-green { background: #27C93F; }
    
    .window-title {
      font-family: 'Space Grotesk', monospace;
      font-size: 13px;
      color: var(--text-secondary);
      flex: 1;
      text-align: center;
    }
    
    .code-content {
      padding: 20px;
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      font-size: 14px;
      line-height: 1.8;
    }
    
    .code-line {
      display: flex;
      gap: 16px;
    }
    
    .line-number {
      color: var(--text-muted);
      min-width: 20px;
      text-align: right;
      user-select: none;
    }
    
    .code-text {
      color: var(--text-primary);
    }
    
    .keyword { color: #C792EA; }
    .variable { color: #82AAFF; }
    .property { color: #F78C6C; }
    .string { color: #C3E88D; }
    
    .cursor-line .cursor {
      color: var(--primary);
      animation: blink 1s step-end infinite;
    }
    
    @keyframes blink {
      50% { opacity: 0; }
    }
    
    /* Floating Tech Icons */
    .tech-icon {
      position: absolute;
      width: 48px;
      height: 48px;
      background: var(--glass-bg);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--glass-border);
      font-size: 24px;
      z-index: 10;
      animation: float 6s ease-in-out infinite;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    }
    
    .icon-react {
      top: -15px;
      right: -20px;
      animation-delay: 0s;
    }
    
    .icon-angular {
      bottom: 30px;
      left: -25px;
      animation-delay: -2s;
    }
    
    .icon-python {
      bottom: 100px;
      right: -15px;
      animation-delay: -4s;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-15px) rotate(5deg); }
    }
    
    /* Stat Card */
    .stat-card {
      border: 1px solid var(--border-color);
    }
    
    .stat-card:hover {
      border-color: var(--primary);
    }
  `]
})
export class AboutComponent {
  tags = [
    'Desarrollo Web',
    'Frontend',
    'Backend',
    'React',
    'Angular',
    'Python',
    'MongoDB',
    'Trabajo en Equipo'
  ];
  
  stats = [
    { value: 9, label: 'Ciclos Académicos' },
    { value: 10, label: 'Tecnologías' },
    { value: 2, label: 'Años Experiencia' },
    { value: 5, label: 'Proyectos' }
  ];
}
