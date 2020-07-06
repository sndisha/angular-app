import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CrudAppState} from "./crud-app.reducer";

const getCrudAppState = createFeatureSelector<CrudAppState>('root');

export const getProductList = createSelector(
  getCrudAppState,
  state => state.productList
);

export const getCurrentProduct = createSelector(
  getCrudAppState,
  state => state.currentProduct
);

export const getCurrentProductName = createSelector(
  getCrudAppState,
  state => state.currentProductName
);

export const getFilteredProducts = (searchText: string) => createSelector(
  getProductList,
  state => state.filter(value => (value.productName.indexOf(searchText) > -1 || value.productDescription && value.productDescription.indexOf(searchText) > -1))
);
