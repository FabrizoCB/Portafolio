import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loader-overlay">
      <div class="loader-content">
        <div class="logo-container">
          <span class="logo-text">FC</span>
          <div class="logo-glow"></div>
        </div>
        <div class="loading-bar">
          <div class="loading-progress"></div>
        </div>
        <p class="loading-text">Cargando experiencia...</p>
      </div>
    </div>
  `,
  styles: [`
    .loader-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0F172A;
    }
    
    .loader-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }
    
    .logo-container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .logo-text {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #6366F1 0%, #06B6D4 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: logoPulse 2s ease-in-out infinite;
      position: relative;
      z-index: 2;
    }
    
    .logo-glow {
      position: absolute;
      inset: -20px;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(6, 182, 212, 0.3) 100%);
      border-radius: 50%;
      filter: blur(30px);
      animation: glowPulse 2s ease-in-out infinite;
      z-index: 1;
    }
    
    .loading-bar {
      width: 200px;
      height: 4px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 2px;
      overflow: hidden;
      position: relative;
    }
    
    .loading-progress {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, #6366F1, #06B6D4);
      border-radius: 2px;
      animation: progressAnimation 1.5s ease-out forwards;
      box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
    }
    
    .loading-text {
      font-family: 'Inter', sans-serif;
      font-size: 0.875rem;
      color: #94A3B8;
      letter-spacing: 0.05em;
      animation: textPulse 1.5s ease-in-out infinite;
    }
    
    @keyframes logoPulse {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.8;
        transform: scale(1.05);
      }
    }
    
    @keyframes glowPulse {
      0%, 100% {
        opacity: 0.5;
        transform: scale(1);
      }
      50% {
        opacity: 0.8;
        transform: scale(1.1);
      }
    }
    
    @keyframes progressAnimation {
      0% {
        width: 0%;
      }
      100% {
        width: 100%;
      }
    }
    
    @keyframes textPulse {
      0%, 100% {
        opacity: 0.6;
      }
      50% {
        opacity: 1;
      }
    }
  `]
})
export class LoaderComponent {}
