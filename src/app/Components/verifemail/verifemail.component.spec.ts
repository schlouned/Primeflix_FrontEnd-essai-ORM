import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifemailComponent } from './verifemail.component';

describe('VerifemailComponent', () => {
  let component: VerifemailComponent;
  let fixture: ComponentFixture<VerifemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifemailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
