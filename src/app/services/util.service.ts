import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private searchValue = new BehaviorSubject<String>(undefined);
  currentSerchValue = this.searchValue.asObservable();
  constructor() { }

  onSearchValueChange(searchValue: String) {
    this.searchValue.next(searchValue)
  }
  formatDate(date) {  
    date = new Date(date);
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    return day + '/' + month+ '/' + year;
  }
}
