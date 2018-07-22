import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { LoginComponent } from '../app/login/login.component';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  // options: FormGroup;

  // constructor(fb: FormBuilder) {
  //   this.options = fb.group({
  //     bottom: 0,
  //     fixed: false,
  //     top: 0
  //   });
  // }
  constructor( 
    public matDialog: MatDialog,
  ){}

  //Can you this to passed the confirm or denied, use tooltip
  dialogResult="";

  goToSignIn() {
    let dialogRef = this.matDialog.open(LoginComponent, {
      width : '700px',
      data: 'Hello from DIALOG'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('Closeed the Dialog: {result}');
      this.dialogResult=result;
    })
  }
}
