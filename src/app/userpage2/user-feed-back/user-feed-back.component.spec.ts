import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFeedBackComponent } from './user-feed-back.component';

describe('UserFeedBackComponent', () => {
  let component: UserFeedBackComponent;
  let fixture: ComponentFixture<UserFeedBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFeedBackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFeedBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
