import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isVisible) {
      <button 
        class="back-to-top"
        (click)="scrollToTop()"
        aria-label="Volver arriba"
        @fadeInScale
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      </button>
    }
  `,
  styles: [`
    .back-to-top {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 48px;
      height: 48px;
      border: none;
      border-radius: 50%;
      background: linear-gradient(135deg, #6366F1 0%, #06B6D4 100%);
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
      transition: all 0.3s ease;
      z-index: 100;
    }
    
    .back-to-top:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 30px rgba(99, 102, 241, 0.6);
    }
    
    .back-to-top:active {
      transform: scale(0.95);
    }
    
    @media (max-width: 768px) {
      .back-to-top {
        bottom: 1rem;
        right: 1rem;
        width: 40px;
        height: 40px;
      }
    }
  `]
})
export class BackToTopComponent implements OnInit, OnDestroy {
  isVisible = false;
  private scrollListener: (() => void) | null = null;
  
  constructor(
    private scrollService: ScrollService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollListener = this.onScroll.bind(this);
      window.addEventListener('scroll', this.scrollListener, { passive: true });
    }
  }
  
  ngOnDestroy(): void {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }
  
  private onScroll(): void {
    const scrollPosition = this.scrollService.getScrollPosition();
    this.isVisible = scrollPosition > 400;
  }
  
  scrollToTop(): void {
    this.scrollService.scrollToTop();
  }
}
