import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType } from '@angular/http';     
import { AuthService } from './auth.service';
import { Book } from '../classes/Book'
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private cachedBooks: Book[];
  constructor(private http: Http, private authService: AuthService) { }

  getBooks(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    return this.http.get('http://localhost:8000/users/books', {headers: headers}).pipe(map(res=>res.json()));
  }

  getBook(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    return this.http.get('http://localhost:8000/users/getImage/' +id,{headers: headers, responseType: ResponseContentType.Blob})
  }
  postBook(fd: FormData){

    var token = "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjViNGVjMDdiMTBiODNjMGY0NDE1MjQ5ZSIsIm5hbWUiOiJFdmFuIE5ndXllbiIsImVtYWlsIjoiZXZhbkBhYmMuY29tIiwidXNlcm5hbWUiOiJFdmFuTmd1eWVuIiwicGFzc3dvcmQiOiIkMmEkMTAkdXN0VGNsaUJna2J0cm1oelcuamxRLktCeThVUi4xc3VRYW9jaThoR1IwY3c2VVhOUVFTaG0iLCJ6aXBjb2RlIjo4MjEyNywiX192IjowfSwiaWF0IjoxNTMxODkzMzA1LCJleHAiOjE1MzI0OTgxMDV9.E53xLz9BPu3KpGdms-DiKMLYM3-sJukbAsGAsCprMew"
    let headers = new Headers();
    headers.append('Authorization', token);
    // headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8000/users/post',fd, {headers: headers}).pipe(map(res=>res.json()));
  }

  getCachedBooks(){
    return this.cachedBooks
  }

  setCachedBooks(books: Book[]){
   this.cachedBooks = books 
  }
}
