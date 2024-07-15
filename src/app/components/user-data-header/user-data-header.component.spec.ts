import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDataHeaderComponent } from './user-data-header.component';

describe('UserDataHeaderComponent', () => {
  let component: UserDataHeaderComponent;
  let fixture: ComponentFixture<UserDataHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDataHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDataHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
