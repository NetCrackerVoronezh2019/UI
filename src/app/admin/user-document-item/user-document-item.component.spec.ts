import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDocumentItemComponent } from './user-document-item.component';

describe('UserDocumentItemComponent', () => {
  let component: UserDocumentItemComponent;
  let fixture: ComponentFixture<UserDocumentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDocumentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDocumentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
