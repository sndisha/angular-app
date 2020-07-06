import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, pluck, tap} from "rxjs/operators";
import {CrudAppState} from "../crud-app-state/crud-app.reducer";
import {Store} from "@ngrx/store";
import {SetProductList} from "../crud-app-state/crud-app.action";
import {ProductDetails} from "../crud-app-models/crud-app.model";

@Injectable()
export class CrudAppGuard implements CanActivate {

  constructor(private http: HttpClient,
              private store: Store<CrudAppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.http.get('../../../../assets/crud-app-json/crud-app.json').pipe(
      pluck('productList'),
      tap((response: ProductDetails[]) => {
        this.store.dispatch(new SetProductList(response))
      }),
      map(response => !!response)
    );
  }
}
