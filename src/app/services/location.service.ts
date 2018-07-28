import { Injectable } from '@angular/core';
var zipcodes = require('zipcodes');

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  lookUpByZip(zip){
    return zipcodes.lookup(zip)
  }
  getMileRadius(zipcode, mile){
    return zipcodes.radius(zipcode, mile);
  }
}
