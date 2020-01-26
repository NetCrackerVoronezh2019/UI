import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUserPropertiesComponent } from './change-user-properties.component';

describe('ChangeUserPropertiesComponent', () => {
  let component: ChangeUserPropertiesComponent;
  let fixture: ComponentFixture<ChangeUserPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeUserPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeUserPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
