import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasklistPage } from './tasklist.page';

describe('TasklistPage', () => {
  let component: TasklistPage;
  let fixture: ComponentFixture<TasklistPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TasklistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
