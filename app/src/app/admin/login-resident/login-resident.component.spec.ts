import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginResidentComponent } from './login-resident.component';

describe('LoginResidentComponent', () => {
  let component: LoginResidentComponent;
  let fixture: ComponentFixture<LoginResidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginResidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginResidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
