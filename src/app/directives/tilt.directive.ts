import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTilt]',
  standalone: true
})
export class TiltDirective {
  @Input() tiltMax = 15;
  @Input() tiltSpeed = 400;
  @Input() glare = false;
  
  private isHovering = false;
  
  constructor(private el: ElementRef<HTMLElement>) {
    this.el.nativeElement.style.transformStyle = 'preserve-3d';
    this.el.nativeElement.style.transition = `transform ${this.tiltSpeed}ms ease`;
    this.el.nativeElement.style.willChange = 'transform';
  }
  
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isHovering) return;
    
    const rect = this.el.nativeElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    
    const rotateX = (mouseY / (rect.height / 2)) * -this.tiltMax;
    const rotateY = (mouseX / (rect.width / 2)) * this.tiltMax;
    
    this.el.nativeElement.style.transform = 
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    
    // Actualizar posición del glare si está habilitado
    if (this.glare) {
      const glareX = ((event.clientX - rect.left) / rect.width) * 100;
      const glareY = ((event.clientY - rect.top) / rect.height) * 100;
      this.el.nativeElement.style.setProperty('--glare-x', `${glareX}%`);
      this.el.nativeElement.style.setProperty('--glare-y', `${glareY}%`);
    }
  }
  
  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.isHovering = true;
    this.el.nativeElement.style.transition = 'none';
  }
  
  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isHovering = false;
    this.el.nativeElement.style.transition = `transform ${this.tiltSpeed}ms ease`;
    this.el.nativeElement.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  }
}
