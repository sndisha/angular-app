import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {AppService} from "./app.service";
import {StoreModule} from "@ngrx/store";
import {crudAppReducer} from "./crud-app/crud-app/crud-app-state/crud-app.reducer";

const MAIN_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'crud',
    pathMatch: "full"
  },
  {
    path: 'crud',
    loadChildren: './crud-app/crud-app/crud-app.module#CrudAppModule'
  },
  {
    path: '**',
    redirectTo: 'crud'
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(MAIN_ROUTES),
    StoreModule.forRoot({root: crudAppReducer})
  ],

  providers: [AppService],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
