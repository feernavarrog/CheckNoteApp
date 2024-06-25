import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotelistPage } from './notelist.page';

describe('NotelistPage', () => {
  let component: NotelistPage;
  let fixture: ComponentFixture<NotelistPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NotelistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
