import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCardComponent } from './cuenta-card.component';

describe('CuentaCardComponent', () => {
  let component: CuentaCardComponent;
  let fixture: ComponentFixture<CuentaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuentaCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuentaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
