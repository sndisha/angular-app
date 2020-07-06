import {ProductDetails} from "../crud-app-models/crud-app.model";
import {CrudAppAction, CrudAppTypes} from "./crud-app.action";

export interface CrudAppState {
  productList: ProductDetails[],
  currentProduct: ProductDetails,
  currentProductName: string,
  deleteTaskId: string
}

const INITIAL_STATE: CrudAppState = {
  productList: [],
  currentProduct: null,
  currentProductName: null,
  deleteTaskId: null
};

export function crudAppReducer(state = INITIAL_STATE, action: CrudAppAction): CrudAppState {
  switch (action.type) {
    case CrudAppTypes.SetProductList:
      return {
        ...state,
        productList: action.payload
      };
    case CrudAppTypes.SetCurrentProduct:
      return {
        ...state,
        currentProduct: action.payload
      };
    case CrudAppTypes.DeleteProduct:
      return {
        ...state,
        deleteTaskId: action.payload
      };
    case CrudAppTypes.SetCurrentProductName:
      return {
        ...state,
        currentProductName: action.payload
      };
    default:
      return state;
  }
}

