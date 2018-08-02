import { Component, ViewChild, AfterViewInit } from '@angular/core';
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
export class AppComponent implements AfterViewInit {
  title = 'app';
  //Can you this to passed the confirm or denied, use tooltip
  dialogResult="";
  @ViewChild('sidenavleft') public sideNav:MatSidenav;
  constructor(
    public matDialog: MatDialog, private jwt: JwtHelperService
  ){}
  
  ngAfterViewInit() {
    if (window.screen.width < 500){
      this.sideNav.close();
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
  isTokenExpired(){
    var token = localStorage.getItem('id_token')
    if (token == null){
      return true
    }
    return this.jwt.isTokenExpired(token);
  }
  logout(){
    localStorage.clear();
  }
  openFilterDialog(){
    this.matDialog.open(FilterOptionsDialog)
  }
  sideNavOnClick(){
    //only close the side nav on click if the screen is less than 500 ie mobile
    if (window.screen.width < 500){
      this.sideNav.close();
    }
  }
}
