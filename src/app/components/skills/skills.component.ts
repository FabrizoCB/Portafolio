import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';
import { TiltDirective } from '../../directives/tilt.directive';

interface Skill {
  name: string;
  icon: string;
  level: string;
  progress: number;
  color: string;
}

interface SkillCategory {
  id: string;
  label: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, RevealDirective, TiltDirective],
  template: `
    <section class="section-padding relative bg-[var(--bg-secondary)]/30">
      <div class="section-container">
        <!-- Section Title -->
        <div class="text-center mb-12" appReveal>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Mi Stack <span class="text-gradient">Tecnológico</span>
          </h2>
          <p class="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Tecnologías que uso para crear soluciones increíbles
          </p>
          <div class="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-6"></div>
        </div>
        
        <!-- Category Tabs -->
        <div class="flex flex-wrap justify-center gap-3 mb-12" appReveal [revealDelay]="100">
          @for (category of categories; track category.id) {
            <button 
              (click)="activeCategory = category.id"
              class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
              [class.bg-gradient-to-r]="activeCategory === category.id"
              [class.from-primary]="activeCategory === category.id"
              [class.to-accent]="activeCategory === category.id"
              [class.text-white]="activeCategory === category.id"
              [class.bg-[var(--bg-tertiary)]]="activeCategory !== category.id"
              [class.text-[var(--text-secondary)]]="activeCategory !== category.id"
              [class.hover:text-[var(--primary)]]="activeCategory !== category.id"
            >
              {{ category.label }}
            </button>
          }
        </div>
        
        <!-- Skills Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (skill of getActiveSkills(); track skill.name; let i = $index) {
            <div 
              class="skill-card glass rounded-2xl p-6 transition-all duration-300 hover:scale-105"
              appTilt
              appReveal
              [revealDelay]="i * 100"
            >
              <div class="flex items-center gap-4 mb-4">
                <div 
                  class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  [style.background-color]="skill.color + '20'"
                  [style.color]="skill.color"
                >
                  <span [innerHTML]="skill.icon"></span>
                </div>
                <div>
                  <h3 class="font-semibold text-[var(--text-primary)]">{{ skill.name }}</h3>
                  <span class="text-sm text-[var(--text-secondary)]">{{ skill.level }}</span>
                </div>
              </div>
              
              <!-- Progress Bar -->
              <div class="relative h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                <div 
                  class="skill-progress absolute h-full rounded-full transition-all duration-1000 ease-out"
                  [style.width.%]="skill.progress"
                  [style.background-color]="skill.color"
                ></div>
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
    
    .skill-card {
      border: 1px solid var(--border-color);
    }
    
    .skill-card:hover {
      border-color: var(--primary);
      box-shadow: 0 20px 40px -12px rgba(99, 102, 241, 0.2);
    }
    
    .skill-progress {
      animation: fillProgress 1.5s ease-out forwards;
    }
    
    @keyframes fillProgress {
      from { width: 0%; }
    }
  `]
})
export class SkillsComponent {
  activeCategory = 'todos';
  
  categories: SkillCategory[] = [
    { id: 'todos', label: 'Todas', skills: [] },
    { id: 'frontend', label: 'Frontend', skills: [] },
    { id: 'backend', label: 'Backend', skills: [] },
    { id: 'database', label: 'Base de Datos', skills: [] },
    { id: 'mobile', label: 'Mobile', skills: [] },
    { id: 'tools', label: 'Herramientas', skills: [] }
  ];
  
  skills: Record<string, Skill[]> = {
    frontend: [
      { name: 'HTML5', icon: '🌐', level: 'Básico', progress: 65, color: '#E34F26' },
      { name: 'JavaScript', icon: '📜', level: 'Intermedio', progress: 75, color: '#F7DF1E' },
      { name: 'React', icon: '⚛️', level: 'Intermedio', progress: 70, color: '#61DAFB' },
      { name: 'React Native', icon: '📱', level: 'Intermedio', progress: 65, color: '#61DAFB' },
      { name: 'Angular', icon: '🅰️', level: 'Intermedio', progress: 75, color: '#DD0031' },
      { name: 'TailwindCSS', icon: '🎨', level: 'Intermedio', progress: 70, color: '#06B6D4' }
    ],
    backend: [
      { name: 'Python', icon: '🐍', level: 'Intermedio', progress: 80, color: '#3776AB' },
      { name: 'Flask', icon: '🌶️', level: 'Intermedio', progress: 75, color: '#000000' },
      { name: 'Java', icon: '☕', level: 'Básico', progress: 50, color: '#007396' },
      { name: 'C#', icon: '🔷', level: 'Básico', progress: 45, color: '#239120' },
      { name: 'APIs RESTful', icon: '🔌', level: 'Intermedio', progress: 70, color: '#6366F1' }
    ],
    database: [
      { name: 'SQL', icon: '🗃️', level: 'Básico', progress: 60, color: '#4479A1' },
      { name: 'MongoDB', icon: '🍃', level: 'Intermedio', progress: 75, color: '#47A248' },
      { name: 'MongoDB Compass', icon: '🧭', level: 'Intermedio', progress: 70, color: '#47A248' }
    ],
    mobile: [
      { name: 'Android Studio', icon: '🤖', level: 'Intermedio', progress: 65, color: '#3DDC84' },
      { name: 'React Native', icon: '📱', level: 'Intermedio', progress: 65, color: '#61DAFB' }
    ],
    tools: [
      { name: 'Git / GitHub', icon: '🌿', level: 'Intermedio', progress: 70, color: '#F05032' },
      { name: 'Metodologías Ágiles', icon: '🔄', level: 'Intermedio', progress: 65, color: '#6366F1' },
      { name: 'Scrum', icon: '📋', level: 'Intermedio', progress: 60, color: '#06B6D4' }
    ]
  };
  
  getActiveSkills(): Skill[] {
    if (this.activeCategory === 'todos') {
      return Object.values(this.skills).flat();
    }
    return this.skills[this.activeCategory] || [];
  }
}
