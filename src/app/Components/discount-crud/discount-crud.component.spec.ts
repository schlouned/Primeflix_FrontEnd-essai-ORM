import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountCrudComponent } from './discount-crud.component';

describe('DiscountCrudComponent', () => {
  let component: DiscountCrudComponent;
  let fixture: ComponentFixture<DiscountCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
