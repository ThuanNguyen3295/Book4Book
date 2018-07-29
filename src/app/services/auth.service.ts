import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import { Http, Headers, ResponseContentType, HttpModule } from '@angular/http';     
import {tokenNotExpired} from 'angular2-jwt';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  constructor(private http: Http) { }

  authenticateUser(user){
    let headers = new Headers(); //header for the json object
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8000/users/authenticate', user, {headers: headers}).pipe(map(res=>res.json()));
  }
  registerUser(user){
    let headers = new Headers(); //header for the json object
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8000/users/register', user, {headers: headers}).pipe(map(res=>res.json()));
  }
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    return this.authToken;
  }
  loadUser(){
    this.user = JSON.parse(localStorage.getItem('user'));
    return this.user
  }
  loggedIn(){
    return tokenNotExpired('id_token');
  } 
  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    sessionStorage.clear()
  }
  getUserZipCode(){
    return this.loadUser().zipcode
  }
}
