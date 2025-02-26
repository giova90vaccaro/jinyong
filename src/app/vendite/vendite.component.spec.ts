import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenditeComponent } from './vendite.component';

describe('VenditeComponent', () => {
  let component: VenditeComponent;
  let fixture: ComponentFixture<VenditeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VenditeComponent]
    });
    fixture = TestBed.createComponent(VenditeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
