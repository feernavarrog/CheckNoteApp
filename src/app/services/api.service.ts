import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  HttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  // Definir las URL de los servicios API

  // URL de la API para obtener una sugerencia aleatoria
  apiCheckNoteSuggest = 'https://my-json-server.typicode.com/feernavarrog/apiCheckNoteSuggest';

  // URL de la API para obtener una lista de sugerencias
  apiCheckNoteBP = 'https://my-json-server.typicode.com/feernavarrog/apiCheckNoteBP';

  // URL de la API para dejar un comentario
  apiLeaveYourComment = 'https://my-json-server.typicode.com/feernavarrog/apiCheckNoteLYC';

  constructor(private http: HttpClient) { }

    //  Obtener sugerencia aleatoria
  getApiPostSuggerence(): Observable<any> {

    const randomIndex = Math.floor(Math.random() * (10 - 1 + 1)) + 1;

    return this.http.get(`${this.apiCheckNoteSuggest}/posts/${randomIndex}`).pipe(retry(3));
  }

  // Obtener lista de sugerencias
  getApiCheckNoteBP(): Observable<any> {
    return this.http.get(`${this.apiCheckNoteBP}/posts`).pipe(retry(3));
  }

  // Dejar un comentario
  leaveYourComment(comment: { mensaje: string }): Observable<any> {
    return this.http.post(`${this.apiLeaveYourComment}/posts`, comment);
  }
}
