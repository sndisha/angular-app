import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewEditComponent} from './view-edit/view-edit.component';
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {ViewEditGuard} from "./view-edit-guard/view-edit.guard";

const VIEW_EDIT: Routes = [
  {
    path: ":mode",
    component: ViewEditComponent,
    canActivate: [ViewEditGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(VIEW_EDIT)
  ],
  declarations: [ViewEditComponent],
  providers: [ViewEditGuard]
})
export class ViewEditModule {
}
