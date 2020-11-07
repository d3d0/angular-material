import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsPerCategoryComponent } from './products-per-category.component';

describe('ProductsPerCategoryComponent', () => {
  let component: ProductsPerCategoryComponent;
  let fixture: ComponentFixture<ProductsPerCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsPerCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsPerCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
