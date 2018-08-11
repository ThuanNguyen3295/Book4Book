import { Injectable } from '@angular/core';
import * as zipcodes from 'zipcodes'
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

  getUserLongLat(){
    var user = JSON.parse(localStorage.getItem('user'));
    if (user != null && user.zipcode != null){
      var res = zipcodes.lookup(user.zipcode)
      return {"lat": res.latitude, "long": res.longitude}
    }
    return null
  }
  getLongLatFromZipcode(zipcode){
    var res = zipcodes.lookup(zipcode)
    return {"lat": res.latitude, "long": res.longitude}
  }
}
