import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private searchFilter = new BehaviorSubject<Boolean>(undefined);
  onSearchFilter = this.searchFilter.asObservable();
  constructor() { }
  onSaveAndSearch(onSearch: Boolean) {
    this.searchFilter.next(onSearch)
  }
  setFilter(filterOptions, mileRadius){
    localStorage.setItem("mileRadius", mileRadius)
    localStorage.setItem("filterOptions", filterOptions)
  }
  getFilter(){
    var options = localStorage.getItem("filterOptions")
    if ( options != null)
      return options.split(",")
    return []
  }
  clearFilter(){
    localStorage.removeItem("mileRadius")
    localStorage.removeItem("filterOptions")
  }
  getMileRadius(){
    var mile = localStorage.getItem("mileRadius")
    if (mile != null)
      return parseInt(mile)
    return -1
  }
}
