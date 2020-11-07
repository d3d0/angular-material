import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProdComponent } from './delete-prod.component';

describe('DeleteProdComponent', () => {
  let component: DeleteProdComponent;
  let fixture: ComponentFixture<DeleteProdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteProdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
