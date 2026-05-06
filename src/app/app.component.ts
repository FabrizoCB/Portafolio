import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { EducationComponent } from './components/education/education.component';
import { ServicesComponent } from './components/services/services.component';
import { FooterComponent } from './components/footer/footer.component';
import { BackToTopComponent } from './shared/back-to-top/back-to-top.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { ThemeService } from './services/theme.service';
import { ScrollService } from './services/scroll.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    EducationComponent,
    ServicesComponent,
    FooterComponent,
    BackToTopComponent,
    LoaderComponent
  ],
  template: `
    @if (isLoading) {
      <app-loader></app-loader>
    }
    
    <div class="app-container" [class.loaded]="!isLoading">
      <app-navbar></app-navbar>
      
      <main>
        <app-hero id="inicio"></app-hero>
        <app-about id="sobre-mi"></app-about>
        <app-skills id="habilidades"></app-skills>
        <app-experience id="experiencia"></app-experience>
        <app-projects id="proyectos"></app-projects>
        <app-education id="educacion"></app-education>
        <app-services id="servicios"></app-services>
      </main>
      
      <app-footer></app-footer>
      <app-back-to-top></app-back-to-top>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      opacity: 0;
      transition: opacity 0.5s ease;
    }
    
    .app-container.loaded {
      opacity: 1;
    }
  `]
})
export class AppComponent implements OnInit {
  isLoading = true;
  
  constructor(
    private themeService: ThemeService,
    private scrollService: ScrollService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  
  ngOnInit(): void {
    // Inicializar tema
    this.themeService.initTheme();
    
    // Simular carga inicial
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    } else {
      this.isLoading = false;
    }
  }
}
