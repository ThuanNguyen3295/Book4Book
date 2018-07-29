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
  private cachedImages: any[]
  private imageCount: number = 0;
  constructor(private http: Http, private authService: AuthService) { }

  getBooks(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    return this.http.get('http://localhost:8000/users/books', {headers: headers}).pipe(map(res=>res.json()));
  }

  getImage(id){
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
    if (this.cachedBooks == null){
      var books = sessionStorage.getItem("books")
      if (books != null){
        // console.log(books)
        return JSON.parse(books)
      }
      return null
    }
    return this.cachedBooks
  }

  setCachedBooks(books: Book[]){
   this.cachedBooks = books 
  }

  setImage(index, image){
    if (image == null) {
      console.error("SetImage Error: image is null")
    }
    if (this.cachedBooks == null || this.cachedBooks.length ==0 || this.cachedBooks.length <= index)
    { console.error("SetImage Error: Please look into this") }

    this.cachedBooks[index].image = image
    this.imageCount++;
    if(this.imageCount == this.cachedBooks.length){
      this.storeBookInLocalStorage()
      this.imageCount = 0;
      this.cachedBooks = null;
    }
  }

  storeBookInLocalStorage(){
    sessionStorage.setItem("books", JSON.stringify(this.cachedBooks))
  }
  getBook(id, index){
    let books = sessionStorage.getItem("books")
    if (books != null){
      var book_obj: Book[] = JSON.parse(books)
      var book = book_obj[index]
      console.log(book._id)
      if(book._id != null && book._id == id){
        return book
      }
      else {
        //TODO traverse through the list and find the correct one if exists
      }
    }
    //TODO do a fetch to the database
  }
}
