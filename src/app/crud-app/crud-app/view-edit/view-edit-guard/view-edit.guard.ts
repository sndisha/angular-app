import {ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {CrudAppService} from "../../crud-app-services/crud-app.service";
import {Injectable} from "@angular/core";
import {SetCurrentProduct, SetCurrentProductName} from "../../crud-app-state/crud-app.action";
import {Store} from "@ngrx/store";
import {CrudAppState} from "../../crud-app-state/crud-app.reducer";
import {ProductDetails} from "../../crud-app-models/crud-app.model";

@Injectable()
export class ViewEditGuard implements CanActivate {
  constructor(private crudService: CrudAppService,
              private store: Store<CrudAppState>) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const product: ProductDetails = this.crudService.getProduct(route.params.id);
    product && this.store.dispatch(new SetCurrentProductName(product.productName));
    product && this.store.dispatch(new SetCurrentProduct(product));
    return of(!!product || route.params.id === '0');
  }
}
