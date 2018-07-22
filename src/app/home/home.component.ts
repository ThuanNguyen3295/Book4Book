import { Component, OnInit, ViewChild} from '@angular/core';
import { RequestService } from '../services/request.service'
import { Book } from '../classes/Book'
import { PageEvent } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { UtilService } from '../services/util.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  books: Book[]
  booksPerPage: Book[]
  loading: Boolean
  searchValue: String;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private requestService :  RequestService, private utilService: UtilService) { }

  ngOnInit() {
    //binding the searchValue as obserable from util service, it will listen on value changes
    this.utilService.currentSerchValue.subscribe(searchValue => this.onSearch(searchValue));
    
    this.loading = true
    this.requestService.getBooks().subscribe(res=>{
      this.books = res
      this.booksPerPage = this.books.slice(0, 8)
      this.formatDate();
      var i = 0;
      for ( i = 0; i < this.books.length; i++){
        this.getAndSetImage(i)
      }
      //set cached books on load
      this.requestService.setCachedBooks(this.books)
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

  onSearch(searchValue){
    this.loading = true
    if(!searchValue && this.books != null){
      this.booksPerPage = this.books.slice(0, 8)
      this.loading = false
      return;
    }
    if(searchValue) {
      this.books = this.requestService.getCachedBooks();

      if (searchValue && searchValue.trim() != '') {
        //TODO possible issue when the result of filter is > 8
        this.booksPerPage = this.books.filter((item) => {
          this.loading = false
          return (item.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);
        }).slice(0,8)
      }else {
        this.loading = false
        this.booksPerPage = this.books.slice(0, 8)
      }
    }
  }
  formatDate(){
    this.books.forEach(book => {
        book.create_date = this.utilService.formatDate(book.create_date);
      });
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
