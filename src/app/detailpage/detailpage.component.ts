import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router'
import { Book } from '../classes/Book'
import { RequestService } from '../services/request.service' 
@Component({
  selector: 'app-detailpage',
  templateUrl: './detailpage.component.html',
  styleUrls: ['./detailpage.component.css']
})
export class DetailpageComponent implements OnInit {
  book_id: string
  book: Book
  constructor(private route: ActivatedRoute, private requestService: RequestService) { }

  ngOnInit() {
    this.book_id = this.route.snapshot.paramMap.get('id');
    var index = this.route.snapshot.queryParams.index
    console.log(this.book_id)
    console.log(index)
    this.book = this.requestService.getBook(this.book_id, index)
  }

}
