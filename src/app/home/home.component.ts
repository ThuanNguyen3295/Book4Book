import { Component, OnInit, ViewChild} from '@angular/core';
import { RequestService } from '../services/request.service'
import { Book } from '../classes/Book'
import { PageEvent } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { UtilService } from '../services/util.service'
import { MatSnackBar} from '@angular/material';
import { FilterService } from '../services/filter.service'
import { LocationService } from '../services/location.service'
import { AuthService } from '../services/auth.service'
import { MapsAPILoader } from '@agm/core';
import {Router} from  '@angular/router';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  books: Book[]
  loading: Boolean
  searchValue: String;
  numPerPage: number
  showMap: Boolean = false
  isFullScreen: Boolean = false
  lat: number
  lng: number
  zoom = 5;
  markers = [];
  filteredMarkers = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private requestService :  RequestService,
              private utilService: UtilService,
              private snackBar: MatSnackBar,
              private filterService: FilterService,
              private locationService: LocationService,
              private authService: AuthService,
              private mapsAPILoader: MapsAPILoader,
              private router: Router) {
    // initialize map
    var res = this.locationService.getUserLongLat()
    if (res != null){
      this.lat = res.lat
      this.lng = res.long
    }
 }

  ngOnInit() {
    //binding the searchValue as obserable from util service, it will listen on value changes
    this.utilService.currentSerchValue.subscribe(searchValue => this.onSearch(searchValue));
    this.filterService.onSearchFilter.subscribe(isFilter => this.onFilter(isFilter));
    this.loading = true
    this.handleLoadBooks()
  }

  handleLoadBooks(){
    this.books = this.requestService.getCachedBooks()
    console.log("handleLoadBook")
    if (this.books != null && this.books.length > 0){
      console.log("has cached book")
      this.loadMap()
      this.loading = false
    }else {
      console.log("need to fetch from backend")
      this.requestService.getBooks().subscribe(res=>{
        this.books = res
        this.loadMap()
        this.formatDate();
        var i = 0;
        //set cached books on load
        this.requestService.setCachedBooks(this.books)
        for ( i = 0; i < this.books.length; i++){
          this.getAndSetImage(i)
        }
      })
    }
  }
  
  loadMap(){
    //TODO check if login
    console.log(this.markers)
    this.mapsAPILoader.load().then(() => {
      this.markers = this.getBookLocations();
    }); 
  }
  onSearch(searchValue){
    this.loading = true
    this.books = this.requestService.getCachedBooks();
    if(!searchValue && this.books != null){
      this.loading = false
    }
    else{
      if (searchValue && searchValue.trim() != '') {
        this.books= this.books.filter((item) => {
          this.loading = false
          return (item.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);
        })
      }
    }
  }
  onFilter(isFilter){
    this.books = this.requestService.getCachedBooks();
    if (isFilter){
      const mileRadius = this.filterService.getMileRadius()
      let zipBound: any
      if (mileRadius != -1){
        this.showMap = true
        zipBound = this.locationService.getMileRadius(this.authService.getUserZipCode(), mileRadius)
      }
      this.loading = true
      let filterOptions: string[] = this.filterService.getFilter()
      let booksToShow: Book[] = []
      this.books.forEach(book => {
        if (filterOptions.includes(book.genre)){
          console.log(book.zipcode)
          if (mileRadius != -1 && (!zipBound.includes(book.zipcode.toString()))){
            return;
          } 
          booksToShow.push(book)
        }
      });
      this.books = booksToShow
      this.loadMap()
      this.loading = false
    }
  }
  formatDate(){
    this.books.forEach(book => {
        book.create_date = this.utilService.formatDate(book.create_date);
      });
  }

  getAndSetImage(index){
    console.log(index)
    this.requestService.getImage(this.books[index].imageId).subscribe(res=>{
      let image = res['_body']
      let reader = new FileReader();
      reader.addEventListener("load", () => {
         this.books[index].image = reader.result;
         this.loading = false
         this.requestService.setImage(index, reader.result)
      }, false);
      if (image) {
         reader.readAsDataURL(image);
      }
    })
  }

  getBookLocations(): Array<{ latitude: number, longitude: number }> {
    var res = []
    this.books.forEach(book=>{
      if (book.zipcode != null){
        res.push(this.locationService.getLongLatFromZipcode(book.zipcode))
      }
    })
    return res  
  }

  onViewDetail(book, index){
    console.log(index)
    this.router.navigate(['/detail',book._id], { queryParams: {index: index}})
  }

} 
