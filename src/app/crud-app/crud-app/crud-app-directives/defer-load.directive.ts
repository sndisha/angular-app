import {Directive, ElementRef, EventEmitter, Output} from '@angular/core';

@Directive({
  selector: '[deferLoad]'
})
export class DeferLoadDirective {
  @Output() public deferLoadAction: EventEmitter<any> = new EventEmitter();

  private _intersectionObserver?: IntersectionObserver;

  constructor(
    private _element: ElementRef
  ) {
  }

  public ngAfterViewInit() {
    this._intersectionObserver = new IntersectionObserver(entries => {
      this.checkForIntersection(entries);
    }, {});
    this._intersectionObserver.observe(<Element>(this._element.nativeElement));
  }

  private checkForIntersection = (entries: Array<IntersectionObserverEntry>) => {
    let previousY = 0;
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (this.checkIfIntersecting(entry)) {
        this.deferLoadAction.emit();
        this._intersectionObserver.unobserve(<Element>(this._element.nativeElement));
        this._intersectionObserver.disconnect();
      }
    })
  };

  private checkIfIntersecting(entry: IntersectionObserverEntry) {
    return (<any>entry).isIntersecting && entry.target === this._element.nativeElement;
  }
}
