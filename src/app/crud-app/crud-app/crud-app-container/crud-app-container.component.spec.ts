import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAppContainerComponent } from './crud-app-container.component';

describe('CrudAppContainerComponent', () => {
  let component: CrudAppContainerComponent;
  let fixture: ComponentFixture<CrudAppContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudAppContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudAppContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
