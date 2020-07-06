import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {FormArray, FormGroup} from '@angular/forms';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

declare global {
  interface Array<T> {
    forEachControl(formGroup: FormGroup | FormArray, callBack: Function): void;
  }
}

Object.defineProperty(Array.prototype, 'forEachControl', <PropertyDescriptor>{
  value: function (formGroup: FormGroup | FormArray, callBack: Function) {
    this.forEach((val, i) => {
      callBack(formGroup.get(val), val, i);
    });
  }
});
