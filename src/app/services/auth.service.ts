import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import { Http, Headers, ResponseContentType, HttpModule } from '@angular/http';     
import {tokenNotExpired} from 'angular2-jwt';


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
    return this.http.post('http://localhost:8000/users/authenticate', user, {headers: headers});
  }
  registerUser(user){
    let headers = new Headers(); //header for the json object
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8000/users/register', user, {headers: headers});
  }
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  loadUser(){
    this.user = JSON.parse(localStorage.getItem('user'));
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
  }
}
