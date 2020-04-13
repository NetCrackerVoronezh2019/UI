import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentCardComponent } from './post-card.component';

describe('PostCardComponent', () => {
  let component: GroupCardComponent;
  let fixture: ComponentFixture<CommentCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
