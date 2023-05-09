import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductlistingComponent } from './productlisting.component';

describe('ProductlistingComponent', () => {
  let component: ProductlistingComponent;
  let fixture: ComponentFixture<ProductlistingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductlistingComponent]
    });
    fixture = TestBed.createComponent(ProductlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
