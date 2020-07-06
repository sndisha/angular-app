import {ProductDetails} from "../crud-app-models/crud-app.model";

export enum CrudAppTypes {
  SetProductList = '[APP] Set the list of products',
  SetCurrentProduct = '[APP] Set the current task selected',
  SetCurrentProductName = '[APP] Set the current task name',
  DeleteProduct = '[APP] Delete the selected task'
}

export class SetProductList {
  readonly type = CrudAppTypes.SetProductList;

  constructor(public payload: ProductDetails[]) {
  }
}

export class SetCurrentProduct {
  readonly type = CrudAppTypes.SetCurrentProduct;

  constructor(public payload: ProductDetails) {
  }
}

export class SetCurrentProductName {
  readonly type = CrudAppTypes.SetCurrentProductName;

  constructor(public payload: string) {
  }
}

export class DeleteProduct {
  readonly type = CrudAppTypes.DeleteProduct;

  constructor(public payload: string) {
  }
}

export type CrudAppAction = SetProductList | SetCurrentProduct | SetCurrentProductName | DeleteProduct;
