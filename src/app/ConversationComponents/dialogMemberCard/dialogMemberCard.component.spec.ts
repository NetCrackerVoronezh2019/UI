import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMemberCardComponent } from './dialog-card.component';

describe('DialogMemberCardComponent', () => {
  let component: DialogMemberCardComponent;
  let fixture: ComponentFixture<DialogMemberCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMemberCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMemberCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
