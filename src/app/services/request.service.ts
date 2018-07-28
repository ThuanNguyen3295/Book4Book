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

    var token = this.authService.loadToken()
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
