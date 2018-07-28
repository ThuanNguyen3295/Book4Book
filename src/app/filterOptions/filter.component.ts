import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Component, Inject} from '@angular/core';
import { FilterService } from '../services/filter.service'
@Component({
    selector: 'filter-options-dialog',
    templateUrl: 'filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterOptionsDialog {

    constructor(
      public dialogRef: MatDialogRef<FilterOptionsDialog>,
      private filterService: FilterService 
    ) {

    }
        
    onNoClick(): void {
      this.dialogRef.close();
    }
    onSaveAndSearch(){
      this.filterService.onSaveAndSearch(null,true)
    }
  }
  