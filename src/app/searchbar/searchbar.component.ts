import { Component, OnInit } from '@angular/core';
import { UtilService } from '../services/util.service'
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  searchValue: String;
  constructor(private utilService: UtilService) { }

  ngOnInit() {
  }
  onSearch(){
    console.log(this.searchValue)
    this.utilService.onSearchValueChange(this.searchValue);
  }
  onTypingSearch(){
    this.utilService.onSearchValueChange(this.searchValue);
  }
}
