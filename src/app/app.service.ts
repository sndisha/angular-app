import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";
import {takeUntil} from "rxjs/operators";

interface Destroyable {
  ngOnDestroy(): void;

  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() {
  }

}

export function componentDestroyed(component: Destroyable): Observable<any> {
  if (component._componentDestroyed$) {
    return component._componentDestroyed$;
  }
  const oldNgOnDestroy = component.ngOnDestroy;
  const stop$ = new ReplaySubject();
  component.ngOnDestroy = function () {
    oldNgOnDestroy && oldNgOnDestroy.apply(component);
    stop$.next(true);
    stop$.complete();
  };
  return component._componentDestroyed$ = stop$.asObservable();
}



