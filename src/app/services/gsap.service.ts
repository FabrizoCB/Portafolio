import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GsapService {
  private gsap: any;
  private ScrollTrigger: any;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  async init(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      const gsapModule = await import('gsap');
      const scrollTriggerModule = await import('gsap/ScrollTrigger');
      
      this.gsap = gsapModule.gsap;
      this.ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      
      // Register ScrollTrigger plugin
      this.gsap.registerPlugin(this.ScrollTrigger);
    }
  }
  
  get gsapInstance(): any {
    return this.gsap;
  }
  
  get scrollTriggerInstance(): any {
    return this.ScrollTrigger;
  }
  
  // Hero entrance animation
  animateHero(): void {
    if (!this.gsap) return;
    
    const tl = this.gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.from('.hero-title', {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.2
    })
    .from('.hero-subtitle', {
      y: 30,
      opacity: 0,
      duration: 0.8
    }, '-=0.6')
    .from('.hero-description', {
      y: 30,
      opacity: 0,
      duration: 0.8
    }, '-=0.5')
    .from('.hero-cta', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1
    }, '-=0.4')
    .from('.profile-container', {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.7)'
    }, '-=0.8');
  }
  
  // Section reveal animations
  revealSection(selector: string, options: any = {}): void {
    if (!this.gsap || !this.ScrollTrigger) return;
    
    const { y = 50, duration = 0.8, stagger = 0.1 } = options;
    
    this.gsap.from(selector, {
      scrollTrigger: {
        trigger: selector,
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      y,
      opacity: 0,
      duration,
      stagger,
      ease: 'power3.out'
    });
  }
  
  // Stagger animation for cards
  staggerCards(selector: string, options: any = {}): void {
    if (!this.gsap || !this.ScrollTrigger) return;
    
    const { 
      y = 60, 
      duration = 0.6, 
      stagger = 0.1,
      start = 'top 80%'
    } = options;
    
    this.gsap.from(selector, {
      scrollTrigger: {
        trigger: selector,
        start,
        toggleActions: 'play none none reverse'
      },
      y,
      opacity: 0,
      duration,
      stagger: {
        amount: stagger * 5,
        from: 'start'
      },
      ease: 'power3.out'
    });
  }
  
  // Timeline animation for experience
  animateTimeline(lineSelector: string, itemSelector: string): void {
    if (!this.gsap || !this.ScrollTrigger) return;
    
    // Animate timeline line
    this.gsap.from(lineSelector, {
      scrollTrigger: {
        trigger: lineSelector,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1
      },
      scaleY: 0,
      transformOrigin: 'top center',
      ease: 'none'
    });
    
    // Animate timeline items
    this.gsap.from(itemSelector, {
      scrollTrigger: {
        trigger: itemSelector,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      x: (i: number) => i % 2 === 0 ? -50 : 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }
  
  // Parallax effect
  parallax(element: string, speed: number = 0.5): void {
    if (!this.gsap || !this.ScrollTrigger) return;
    
    this.gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      y: (i: number, target: any) => -speed * 100,
      ease: 'none'
    });
  }
  
  // Hover 3D tilt effect
  tilt3D(element: HTMLElement): void {
    if (!this.gsap) return;
    
    element.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      this.gsap.to(element, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    element.addEventListener('mouseleave', () => {
      this.gsap.to(element, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  }
  
  // Text reveal animation
  textReveal(selector: string): void {
    if (!this.gsap || !this.ScrollTrigger) return;
    
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((el) => {
      this.gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    });
  }
  
  // Counter animation
  animateCounter(element: HTMLElement, endValue: number, duration: number = 2): void {
    if (!this.gsap) return;
    
    const obj = { value: 0 };
    
    this.gsap.to(obj, {
      value: endValue,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        element.textContent = Math.round(obj.value) + '+';
      }
    });
  }
  
  // Magnetic button effect
  magneticButton(element: HTMLElement, strength: number = 0.3): void {
    if (!this.gsap) return;
    
    element.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      this.gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    element.addEventListener('mouseleave', () => {
      this.gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  }
  
  // Blob animation for hero
  animateBlobs(): void {
    if (!this.gsap) return;
    
    const blobs = document.querySelectorAll('.blob');
    
    blobs.forEach((blob, i) => {
      this.gsap.to(blob, {
        x: 'random(-30, 30)',
        y: 'random(-50, 50)',
        scale: 'random(0.9, 1.1)',
        duration: 'random(5, 8)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.5
      });
    });
  }
  
  // Refresh ScrollTrigger
  refresh(): void {
    if (this.ScrollTrigger) {
      this.ScrollTrigger.refresh();
    }
  }
}
