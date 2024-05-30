import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[pkmnBorderCard]',
  standalone: true
})
export class BorderCardDirective {
  
  private  initialColor ='#f5f5f5';
  private defaultColor = '#009688';
  private defaultHeight = 180;

  constructor(private el: ElementRef) {
    this.setBorder(this.initialColor);
    this.setHeight(this.defaultHeight);
   }

   @Input('pkmnBorderCard') borderColor: string; 

   @HostListener('mouseenter') onMouseEnter(){
    this.setBorder(this.borderColor  ||this.defaultColor);
   }

   @HostListener('mouseleave') onMouseLeave(){
    this.setBorder(this.initialColor);
   }

  private setHeight(height: number): void{
    this.el.nativeElement.style.height = `${height}px`;
  }

  private setBorder(color: string): void{
    let border = 'solid 4px' + color;
    this.el.nativeElement.style.border = border;
  }


}
