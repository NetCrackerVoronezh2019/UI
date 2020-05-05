import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsNotificationsComponent } from './notifications.component';

describe('FriendsNotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<FriendsNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
