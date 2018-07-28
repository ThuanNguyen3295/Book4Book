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
  setFilter(filterOptions){
    localStorage.setItem("filterOptions", filterOptions)
  }
  getFilter(){
    if (localStorage.getItem("filterOptions") != null)
      return localStorage.getItem("filterOptions").split(",")
    return []
  }
  clearFilter(){
    return localStorage.removeItem("filterOptions")
  }
}
