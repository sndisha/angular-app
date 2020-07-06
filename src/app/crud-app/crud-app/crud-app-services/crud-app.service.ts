import {Injectable, OnDestroy} from '@angular/core';
import {CrudAppState} from "../crud-app-state/crud-app.reducer";
import {select, Store} from "@ngrx/store";
import {getProductList} from "../crud-app-state/crud-app.selector";
import {takeUntil} from "rxjs/operators";
import {componentDestroyed} from "../../../app.service";
import {ProductDetails} from "../crud-app-models/crud-app.model";
import {SetCurrentProduct, SetCurrentProductName, SetProductList} from "../crud-app-state/crud-app.action";

@Injectable({
  providedIn: 'root'
})
export class CrudAppService implements OnDestroy {
  productList: ProductDetails[];

  constructor(private store: Store<CrudAppState>) {
    this.store.pipe(select(getProductList), takeUntil(componentDestroyed(this))).subscribe((productList: ProductDetails[]) => {
      this.productList = productList;
    });
  }

  getProduct(id) {
    const product = this.productList.filter(value => value.productId === id)[0];
    return product;
  }

  deleteProduct(id) {
    this.store.dispatch(new SetProductList(this.productList.filter(value => value.productId !== id)));
  }

  updateItem(product: ProductDetails) {
    const updatedList = this.productList.map(value => value.productId === product.productId ? product : value);
    this.store.dispatch(new SetProductList(updatedList));
  }

  addItem(product: ProductDetails) {
    this.productList.unshift(product);
    this.store.dispatch(new SetProductList(this.productList));
  }

  ngOnDestroy() {

  }

}
