import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirosComponent } from './retiros.component';

describe('RetirosComponent', () => {
  let component: RetirosComponent;
  let fixture: ComponentFixture<RetirosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetirosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RetirosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
