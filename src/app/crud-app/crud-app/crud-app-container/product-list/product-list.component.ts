import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {ProductDetails} from "../../crud-app-models/crud-app.model";
import {CrudAppState} from "../../crud-app-state/crud-app.reducer";
import {select, Store} from "@ngrx/store";
import {getFilteredProducts, getProductList} from "../../crud-app-state/crud-app.selector";
import {componentDestroyed} from "../../../../app.service";
import {ActivatedRoute, Router} from "@angular/router";
import {debounceTime, takeUntil} from "rxjs/operators";
import {CrudAppService} from "../../crud-app-services/crud-app.service";
import {SetCurrentProductName} from "../../crud-app-state/crud-app.action";

@Component({
  selector: 'hg-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  headerList = [
    'ID',
    'Image',
    'Name',
    'Description',
    'Count',
    ''
  ];
  productList: Observable<ProductDetails[]>;
  searchObservable: Observable<any>;
  searchText: string;

  constructor(private store: Store<CrudAppState>,
              private router: Router,
              public activatedRoute: ActivatedRoute,
              private crudService: CrudAppService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(query => {
      this.productList = query.search ? this.store.pipe(select(getFilteredProducts(query.search)), takeUntil(componentDestroyed(this))) : this.store.pipe(select(getProductList), takeUntil(componentDestroyed(this)))
    });
    this.store.dispatch(new SetCurrentProductName('List View'));
  }

  onScroll() {

  }

  goToProduct(id) {
    this.router.navigate([id, 'view'], {
      relativeTo: this.activatedRoute
    })
  }

  onInputChange(event) {
    this.searchObservable = of(event.value);
    this.searchObservable.pipe(debounceTime(300)).subscribe(searchText => {
      console.log(searchText);
      this.searchText = searchText;
    })
  }

  showImage(showFlag, item) {
    item.showImage = true;
  }

  showSearchResults() {
    this.router.navigate([],
      {
        queryParams: {
          search: this.searchText
        },
        relativeTo: this.activatedRoute
      }
    )
  }

  deleteProduct(id, event) {
    console.log("delete")
    event.stopPropagation();
    this.crudService.deleteProduct(id);
  }

  addProduct() {
    this.router.navigate([0, 'add'],
      {
        relativeTo: this.activatedRoute
      }
    )
  }

  ngOnDestroy() {

  }

}
