import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Userpage2Component } from './userpage2.component';

describe('Userpage2Component', () => {
  let component: Userpage2Component;
  let fixture: ComponentFixture<Userpage2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Userpage2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Userpage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
