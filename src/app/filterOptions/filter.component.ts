import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Component, Inject} from '@angular/core';
import { FilterService } from '../services/filter.service'
@Component({
    selector: 'filter-options-dialog',
    templateUrl: 'filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterOptionsDialog {
    selectedOptions: string[] = [];
    mileRadius: number
    mileOption= [
      { distance: 5, value: "< 5 miles" },
      { distance: 10, value: "< 10 miles" },
      { distance: 25, value: "< 25 miles" },
      { distance: 50, value: "< 50 miles" },
      {distance: -1, value: "Anywhere"}
    ]
    filterGenres=[
      {name: "Science And Fiction"},
      {name: "Satire"},
      {name: "Drama"},
      {name: "Action and Adventure"},
      {name: "Mystery"},
      {name: "Romance"},
      {name: "Horror"},
      {name: "Self Help"},
      {name: "Health"},
      {name: "Guide"},
      {name: "Travel"},
      {name: "Children's"},
      {name: "Religion, Spirituality & New Age"},
      {name: "Science"},
      {name: "History"},
      {name: "Math"},
      {name: "Anthology"},
      {name: "Poetry"},
      {name: "Encyclopedias"},
      {name: "Dictionaries"},
      {name: "Comics"},
      {name: "Art"},
      {name: "Cook_books"},
      {name: "Diaries"},
      {name: "Journals"},
      {name: "Prayer books"},
      {name: "Series"},
      {name: "Trilogy"},
      {name: "Biographies"},
      {name: "Autobiographies"},
      {name: "Fantasy"}
    ]
    constructor(
      public dialogRef: MatDialogRef<FilterOptionsDialog>,
      private filterService: FilterService 
    ) {
      this.selectedOptions = this.filterService.getFilter()
      this.mileRadius = this.filterService.getMileRadius()
    }
        
    onNoClick(): void {
      this.dialogRef.close();
    }
    onSaveAndSearch(){
      this.filterService.setFilter(this.selectedOptions, this.mileRadius)
      this.filterService.onSaveAndSearch(true)
    }
    resetFilter(){
      this.filterService.clearFilter()
      this.filterService.onSaveAndSearch(false)
    }
  }
  