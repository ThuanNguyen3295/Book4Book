import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { MatSidenav} from '@angular/material';
import { HostListener } from '@angular/core'
import { LoginComponent } from '../app/login/login.component';
import { MatDialog } from '@angular/material';
import { FilterOptionsDialog } from './filterOptions/filter.component'
import {JwtHelperService} from '@auth0/angular-jwt'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  //Can you this to passed the confirm or denied, use tooltip
  dialogResult="";

  constructor(
    public matDialog: MatDialog, private jwt: JwtHelperService
  ){}

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
  isLoggedIn(){
    return this.jwt.isTokenExpired(localStorage.getItem('token'));
  }
  logout(){
    localStorage.clear();
  }
  openFilterDialog(){
    this.matDialog.open(FilterOptionsDialog)
  }
}
