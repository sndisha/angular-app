import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CrudAppContainerComponent} from './crud-app-container/crud-app-container.component';
import {ProductListComponent} from './crud-app-container/product-list/product-list.component';
import {RouterModule, Routes} from "@angular/router";
import {CrudAppGuard} from "./crud-app-guard/crud-app.guard";
import {DeferLoadDirective} from "./crud-app-directives/defer-load.directive";

const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    component: CrudAppContainerComponent,
    canActivate: [CrudAppGuard],
    children: [
      {
        path: "",
        component: ProductListComponent
      },
      {
        path: ":id",
        loadChildren: "./view-edit/view-edit.module#ViewEditModule"
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PRODUCT_ROUTES)
  ],
  declarations: [CrudAppContainerComponent, ProductListComponent, DeferLoadDirective],
  providers: [CrudAppGuard]
})
export class CrudAppModule {
}
