import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicInputComponent } from './magic-input.component';

describe('MagicInputComponent', () => {
  let component: MagicInputComponent;
  let fixture: ComponentFixture<MagicInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagicInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MagicInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
