import { Directive, ElementRef, Renderer2, Input, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input() revealAnimation = 'fade-up'; // fade-up, fade-left, fade-right, scale
  @Input() revealDelay = 0;
  @Input() revealThreshold = 0.1;
  @Input() revealOnce = true;
  
  private observer: IntersectionObserver | null = null;
  private hasRevealed = false;
  
  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupInitialState();
      this.setupObserver();
    }
  }
  
  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
  
  private setupInitialState(): void {
    const element = this.el.nativeElement;
    
    // Establecer estado inicial según el tipo de animación
    this.renderer.addClass(element, 'reveal');
    this.renderer.addClass(element, `reveal-${this.revealAnimation}`);
    
    if (this.revealDelay > 0) {
      element.style.transitionDelay = `${this.revealDelay}ms`;
    }
  }
  
  private setupObserver(): void {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: this.revealThreshold
    };
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.reveal();
          
          if (this.revealOnce) {
            this.observer?.unobserve(entry.target);
          }
        } else if (!this.revealOnce) {
          this.hide();
        }
      });
    }, options);
    
    this.observer.observe(this.el.nativeElement);
  }
  
  private reveal(): void {
    if (!this.hasRevealed || !this.revealOnce) {
      this.renderer.addClass(this.el.nativeElement, 'revealed');
      this.hasRevealed = true;
    }
  }
  
  private hide(): void {
    this.renderer.removeClass(this.el.nativeElement, 'revealed');
    this.hasRevealed = false;
  }
}
