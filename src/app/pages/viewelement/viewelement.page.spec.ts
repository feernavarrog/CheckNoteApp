import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewelementPage } from './viewelement.page';

describe('ViewelementPage', () => {
  let component: ViewelementPage;
  let fixture: ComponentFixture<ViewelementPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewelementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
