import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deberia obtener una sugerencia random', () => {
    const mockResponse = { id: 1, title: 'Random Suggestion' };
    const randomIndex = 1;

    spyOn(Math, 'floor').and.returnValue(randomIndex - 1);

    service.getApiPostSuggerence().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.apiCheckNoteSuggest}/posts/${randomIndex}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('deberia obtener una lista de sugerencias', () => {
    const mockResponse = [
      { id: 1, title: 'Suggestion 1' },
      { id: 2, title: 'Suggestion 2' }
    ];

    service.getApiCheckNoteBP().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.apiCheckNoteBP}/posts`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('deberia postear un comentario', () => {
    const mockComment = { mensaje: 'Test comment' };
    const mockResponse = { id: 1, mensaje: 'Test comment' };

    service.leaveYourComment(mockComment).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.apiLeaveYourComment}/posts`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockComment);
    req.flush(mockResponse);
  });
});
