import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotelistPage } from './notelist.page';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';

describe('NotelistPage', () => {
  let component: NotelistPage;
  let fixture: ComponentFixture<NotelistPage>;
  let apiServiceMock: any;

  beforeEach(waitForAsync(() => {
    apiServiceMock = jasmine.createSpyObj('ApiService', ['getApiPostSuggerence']);
    
    TestBed.configureTestingModule({
      declarations: [NotelistPage],
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: ApiService, useValue: apiServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotelistPage);
    component = fixture.componentInstance;

    // Mock responses
    apiServiceMock.getApiPostSuggerence.and.returnValue(of({ suggestion: 'Test Suggestion' }));

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
