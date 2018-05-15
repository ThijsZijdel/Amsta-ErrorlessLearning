import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTaskComponent } from './manage-task.component';

describe('ManageTaskComponent', () => {
  let component: ManageTaskComponent;
  let fixture: ComponentFixture<ManageTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
