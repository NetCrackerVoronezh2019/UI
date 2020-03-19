import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAdvertisementsComponent } from './my-advertisements.component';

describe('MyAdvertisementsComponent', () => {
  let component: MyAdvertisementsComponent;
  let fixture: ComponentFixture<MyAdvertisementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAdvertisementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAdvertisementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
