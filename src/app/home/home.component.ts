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
  pageEvent: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private requestService :  RequestService) { }

  ngOnInit() {
    this.loading = true
    this.requestService.getBooks().subscribe(res=>{
      setTimeout(()=>{
        this.loading = false
      }, 4000)
      this.books = res
      this.booksPerPage = this.books.slice(0, 4)
      var i = 0;
      for ( i = 0; i < this.books.length; i++){
        this.getAndSetImage(i)
      }
    })
  }
  getData(page: PageEvent){
    console.log(event)
    if (page.previousPageIndex == page.pageIndex -1){ //next
      console.log("next")
      var to = (page.pageIndex+1)*4
      console.log("to b4 " + to)
      if (to > this.books.length){
        to = this.books.length
        console.log("to af " + to)
      }
      this.booksPerPage = this.books.slice((page.previousPageIndex+1)*4, to )
    }
    else { //back
      console.log(page.pageIndex)
      console.log(page.previousPageIndex)
      this.booksPerPage = this.books.slice(page.pageIndex*4, (page.previousPageIndex)*4)
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
      }, false);
      if (image) {
         reader.readAsDataURL(image);
      }
    })
  }

} 
