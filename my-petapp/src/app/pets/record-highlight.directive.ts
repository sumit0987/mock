import { Directive, ElementRef,HostListener,Input } from '@angular/core';

@Directive({
  selector: '[appRecordHighlight]'
})
export class RecordHighlightDirective {

  /**
   * Inputs colors for creating custom directives for hover on rows
   */
  @Input() color:string;
  @Input() colorMain:string;
  constructor(private element: ElementRef) { 
  }

  /**
   * gets triggered when mouse enters a row. It highlights the row
   */
  @HostListener ('mouseenter') onMouseEnter() {
    this.element.nativeElement.style.backgroundColor = this.color;
  }

  /**
   * gets triggered when mouse leaves a row. It falls back to the actual color of the row
   */
  @HostListener ('mouseleave') onMouseLeave(){
    this.element.nativeElement.style.backgroundColor = this.colorMain;
  }

}
