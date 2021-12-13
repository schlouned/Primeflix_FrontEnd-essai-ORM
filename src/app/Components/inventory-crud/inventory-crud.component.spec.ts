import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCrudComponent } from './inventory-crud.component';

describe('InventoryCrudComponent', () => {
  let component: InventoryCrudComponent;
  let fixture: ComponentFixture<InventoryCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
