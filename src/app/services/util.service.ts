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
}
