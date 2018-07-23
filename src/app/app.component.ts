import { Component, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { MatSidenav} from '@angular/material';
import { HostListener } from '@angular/core'
import { LoginComponent } from '../app/login/login.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  //Can you this to passed the confirm or denied, use tooltip
  dialogResult="";
  @ViewChild('sidenavright') public myNav: MatSidenav;

  constructor(
    public matDialog: MatDialog,
  ){}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.myNav != null && window.screen.width < 1200 ){
      console.log("toggle rightnav on screen size < 1200")
      this.myNav.toggle()
    }
  }

  goToSignIn() {
    let dialogRef = this.matDialog.open(LoginComponent, {
      width : 'auto',
      data: 'Hello from DIALOG',
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('Closeed the Dialog: {result}');
      this.dialogResult=result;
    })
  }
}
