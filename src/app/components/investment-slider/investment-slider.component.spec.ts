import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentSliderComponent } from './investment-slider.component';

describe('InvestmentSliderComponent', () => {
  let component: InvestmentSliderComponent;
  let fixture: ComponentFixture<InvestmentSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvestmentSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
