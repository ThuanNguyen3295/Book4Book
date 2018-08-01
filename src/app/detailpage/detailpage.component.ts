import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router'
import { Book } from '../classes/Book'
import { RequestService } from '../services/request.service' 
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-detailpage',
  templateUrl: './detailpage.component.html',
  styleUrls: ['./detailpage.component.css']
})
export class DetailpageComponent implements OnInit {
  book_id: string
  lat: number
  lng: number
  book: Book
  constructor(private route: ActivatedRoute, private requestService: RequestService, private locationService: LocationService) { }

  ngOnInit() {
    this.book_id = this.route.snapshot.paramMap.get('id');
    var index = this.route.snapshot.queryParams.index
    console.log(this.book_id)
    console.log(index)
    this.book = this.requestService.getBook(this.book_id, index)
    if (this.book && this.book.zipcode) {
      var latlng = this.locationService.getLongLatFromZipcode(this.book.zipcode)
      this.lat = latlng.lat
      this.lng = latlng.long
    }
    else {
      console.log("book is null")
    }
  }

}
