import { Component, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { MatSidenav} from '@angular/material';
import { HostListener } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  @ViewChild('sidenavright') public myNav: MatSidenav;
  constructor(){
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.myNav != null && window.screen.width < 1200 ){
      console.log("toggle rightnav on screen size < 1200")
      this.myNav.toggle()
    }
  }
}
