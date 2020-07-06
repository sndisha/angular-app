import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {pluck, takeUntil} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CrudAppService} from "../../crud-app-services/crud-app.service";
import {CrudAppState} from "../../crud-app-state/crud-app.reducer";
import {select, Store} from "@ngrx/store";
import {getCurrentProduct} from "../../crud-app-state/crud-app.selector";
import {componentDestroyed} from "../../../../app.service";
import {Location} from "@angular/common";

@Component({
  selector: 'hg-view-edit',
  templateUrl: './view-edit.component.html',
  styleUrls: ['./view-edit.component.scss']
})
export class ViewEditComponent implements OnInit, OnDestroy {
  updateFlag: boolean;
  productForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private crudService: CrudAppService,
              private store: Store<CrudAppState>,
              private formBuilder: FormBuilder,
              private location: Location) {
  }

  ngOnInit() {
    this.productForm = this.getProductForm();
    this.activatedRoute.params.subscribe(params => {
      this.updateFlag = params.mode === 'view';
    });
    this.store.pipe(select(getCurrentProduct), takeUntil(componentDestroyed(this))).subscribe(value => {
      console.log(value);
      this.updateFlag && this.productForm.patchValue(value);
    });
  }

  getProductForm(): FormGroup {
    return this.formBuilder.group({
      productName: [null, [Validators.required]],
      productId: Math.floor(Math.random() * 1000),
      productCount: 0,
      productIsAvailable: [true, [Validators.required]],
      productDescription: [null, [Validators.required]]
    })
  }

  saveDetails() {
    if (this.productForm.valid) {
      this.updateFlag ? this.crudService.updateItem(this.productForm.value) : this.crudService.addItem(this.productForm.value);
      this.location.back();
    }
    console.log(this.productForm.value, "form Value")
  }

  ngOnDestroy(): void {
  }
}
