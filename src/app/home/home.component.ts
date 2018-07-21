import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service'
import {Book} from '../classes/Book'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books: [Book]
  constructor(private requestService :  RequestService) { }

  ngOnInit() {
    this.requestService.getBooks().subscribe(res=>{
      this.books = res
      var i = 0;
      for ( i = 0; i < this.books.length; i++){
        this.getAndSetImage(i)
      }
    })
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
