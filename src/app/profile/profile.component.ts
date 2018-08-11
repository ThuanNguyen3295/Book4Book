import { Component, OnInit } from '@angular/core';
import { Book } from '../classes/Book'
import { RequestService } from '../services/request.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  books: Book[] = []
  constructor( private requestService: RequestService) { }

  ngOnInit() {
    this.requestService.getUserBooks().subscribe(res=>{
      this.books = res
      var i = 0;
      for ( i = 0; i < this.books.length; i++){
        this.getAndSetImage(i)
      }
    })
  }
  getAndSetImage(index){
    console.log(index)
    this.requestService.getImage(this.books[index].imageId).subscribe(res=>{
      let image = res['_body']
      let reader = new FileReader();
      reader.addEventListener("load", () => {
         this.books[index].image = reader.result;
         this.requestService.setImage(index, reader.result)
      }, false);
      if (image) {
         reader.readAsDataURL(image);
      }
    })
  }
}
