import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(true);
  public isDarkMode$: Observable<boolean> = this.darkMode.asObservable();
  
  private readonly STORAGE_KEY = 'portfolio-theme-preference';
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  initTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored !== null) {
        const isDark = stored === 'dark';
        this.setTheme(isDark);
      } else {
        // Verificar preferencia del sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.setTheme(prefersDark);
      }
      
      // Escuchar cambios en preferencia del sistema
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
          this.setTheme(e.matches);
        }
      });
    }
  }
  
  toggleTheme(): void {
    const newMode = !this.darkMode.value;
    this.setTheme(newMode);
  }
  
  setTheme(isDark: boolean): void {
    this.darkMode.next(isDark);
    
    if (isPlatformBrowser(this.platformId)) {
      const html = document.documentElement;
      if (isDark) {
        html.classList.add('dark');
        localStorage.setItem(this.STORAGE_KEY, 'dark');
      } else {
        html.classList.remove('dark');
        localStorage.setItem(this.STORAGE_KEY, 'light');
      }
    }
  }
  
  isDarkMode(): boolean {
    return this.darkMode.value;
  }
}
