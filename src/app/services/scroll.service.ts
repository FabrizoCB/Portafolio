import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  scrollToSection(sectionId: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 80; // Altura del navbar fijo
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navbarHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }
  
  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
  
  getScrollPosition(): number {
    if (isPlatformBrowser(this.platformId)) {
      return window.scrollY || document.documentElement.scrollTop;
    }
    return 0;
  }
  
  isInViewport(element: HTMLElement, threshold: number = 0.1): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight * (1 - threshold)) &&
        rect.bottom >= (window.innerHeight * threshold)
      );
    }
    return false;
  }
}
