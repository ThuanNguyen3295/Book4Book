import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Component, Inject} from '@angular/core';
import { FilterService } from '../services/filter.service'
@Component({
    selector: 'filter-options-dialog',
    templateUrl: 'filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterOptionsDialog {
    attrs: any[] = [];
    selectedOptions: string[] = ["science_fiction"];
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
      {name: "Prayer_books"},
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
    }
        
    onNoClick(): void {
      this.dialogRef.close();
    }
    onSaveAndSearch(){
      console.log(this.selectedOptions)
      this.filterService.setFilter(this.selectedOptions)
      console.log(this.filterGenres)
      this.filterService.onSaveAndSearch(true)
    }
    resetFilter(){
      this.filterService.clearFilter()
      this.filterService.onSaveAndSearch(false)
    }
  }
  