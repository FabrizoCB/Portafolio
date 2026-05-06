import { Component, Input, ElementRef, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-animated-counter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="counter-value">{{ displayValue }}{{ suffix }}</span>
  `,
  styles: [`
    .counter-value {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: inherit;
      color: inherit;
    }
  `]
})
export class AnimatedCounterComponent implements OnInit, OnDestroy {
  @Input() value = 0;
  @Input() suffix = '';
  @Input() duration = 2000;
  @Input() prefix = '';
  
  displayValue = '0';
  private observer: IntersectionObserver | null = null;
  private hasAnimated = false;
  
  constructor(
    private el: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupObserver();
    }
  }
  
  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
  
  private setupObserver(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.animate();
          this.hasAnimated = true;
        }
      });
    }, { threshold: 0.5 });
    
    this.observer.observe(this.el.nativeElement);
  }
  
  private animate(): void {
    const startTime = performance.now();
    const startValue = 0;
    const endValue = this.value;
    
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.duration, 1);
      
      // Easing function (easeOutQuart)
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeProgress);
      
      this.displayValue = this.prefix + currentValue.toString();
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    
    requestAnimationFrame(step);
  }
}
