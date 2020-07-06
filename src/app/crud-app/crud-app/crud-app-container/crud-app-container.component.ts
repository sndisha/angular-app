import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {CrudAppState} from "../crud-app-state/crud-app.reducer";
import {select, Store} from "@ngrx/store";
import {getCurrentProductName} from "../crud-app-state/crud-app.selector";
import {Observable} from "rxjs";

@Component({
  selector: 'hg-crud-app-container',
  templateUrl: './crud-app-container.component.html',
  styleUrls: ['./crud-app-container.component.scss']
})
export class CrudAppContainerComponent implements OnInit {
  pageName: Observable<string>;

  constructor(private location: Location,
              private router: Router,
              private store: Store<CrudAppState>) {
  }

  ngOnInit() {
    this.pageName = this.store.pipe(select(getCurrentProductName))
  }

  goBack() {
    this.location.back()
  }


}
