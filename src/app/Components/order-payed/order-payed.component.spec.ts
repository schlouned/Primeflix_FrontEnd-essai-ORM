import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPayedComponent } from './order-payed.component';

describe('OrderPayedComponent', () => {
  let component: OrderPayedComponent;
  let fixture: ComponentFixture<OrderPayedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderPayedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
