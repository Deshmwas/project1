import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFormComponentComponent } from './order-form-component.component';

describe('OrderFormComponentComponent', () => {
  let component: OrderFormComponentComponent;
  let fixture: ComponentFixture<OrderFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderFormComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
