import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedNoteComponent } from './deleted-note.component';

describe('DeletedNoteComponent', () => {
  let component: DeletedNoteComponent;
  let fixture: ComponentFixture<DeletedNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletedNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
