import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Component, Inject} from '@angular/core';

@Component({
    selector: 'filter-options-dialog',
    templateUrl: 'filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterOptionsDialog {

    constructor(
      public dialogRef: MatDialogRef<FilterOptionsDialog>) {}
        
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }
  