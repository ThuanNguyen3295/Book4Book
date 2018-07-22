import { Component, OnInit, ViewChild} from '@angular/core';
import { RequestService } from '../services/request.service'
import {Book} from '../classes/Book'
import {PageEvent} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {tap} from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  books: [Book]
  booksPerPage: Book[]
  loading: Boolean
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private requestService :  RequestService) { }

  ngOnInit() {
    this.loading = true
    this.requestService.getBooks().subscribe(res=>{
      this.books = res
      this.booksPerPage = this.books.slice(0, 8)
      var i = 0;
      for ( i = 0; i < this.books.length; i++){
        this.getAndSetImage(i)
      }
    })
  }
  getData(page: PageEvent){
    if (page.previousPageIndex == page.pageIndex -1){ //next
      var to = (page.pageIndex+1)*4
      if (to > this.books.length){
        to = this.books.length
      }
      this.booksPerPage = this.books.slice((page.previousPageIndex+1)*8, to + 1)
    }
    else { //back
      this.booksPerPage = this.books.slice(page.pageIndex*8, (page.previousPageIndex)*8)
    }
  }
  loadNextPage(pageEvent: PageEvent){
    console.log(pageEvent.length)
    console.log(pageEvent.pageIndex)
    this.booksPerPage = this.books.slice(1, 3);
  }

  getAndSetImage(index){
    console.log(index)
    this.requestService.getBook(this.books[index].imageId).subscribe(res=>{
      let image = res['_body']
      let reader = new FileReader();
      reader.addEventListener("load", () => {
         this.books[index].image = reader.result;
         this.loading = false
      }, false);
      if (image) {
         reader.readAsDataURL(image);
      }
    })
  }

} 
