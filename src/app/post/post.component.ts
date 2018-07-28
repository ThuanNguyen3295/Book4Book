import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { RequestService } from '../services/request.service'
import { AuthService } from '../services/auth.service'
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  selectedImage: File = null;
  selectedImagePreview: any = null
  loading: Boolean = false
  bookFormGroup: FormGroup;
  title: AbstractControl;
  description: AbstractControl;
  genre: AbstractControl;
  version: AbstractControl;
  img: AbstractControl;

  constructor(private formBuilder: FormBuilder,
              private requestService: RequestService,
              private router: Router,
              private snackBar: MatSnackBar,
              private authService: AuthService        
  ) {

    this.bookFormGroup = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required,Validators.pattern('[a-zA-Z0-9 ]*'), Validators.minLength(5), Validators.maxLength(30)])],
      description: [''],
      genre: ['', Validators.compose([Validators.required])],
      version: [''],
      img: ['']
    });
   }

  ngOnInit() {
  }

  setSelectedImage(files: FileList){
    let file : File = files.item(0);
    this.selectedImage = file
    var reader = new FileReader();
    reader.onload = (event: ProgressEvent) => {
      console.log(this.selectedImagePreview)
      this.selectedImagePreview = (<FileReader>event.target).result;
    }
    reader.readAsDataURL(file);
  }

  onPostNewBook(){
    if(this.selectedImage ==null){
    }
    this.loading = true
    const fd = new FormData();
    let user = this.authService.loadUser()
    //TODO check if user if null 
    fd.append('image', this.selectedImage, "image")
    fd.append('title', this.bookFormGroup.get("title").value)
    fd.append('ownerName', user.username)
    fd.append('ownerId', user.id)
    fd.append('description', this.bookFormGroup.get("description").value)
    fd.append('genre', this.bookFormGroup.get("genre").value)
    fd.append('version', this.bookFormGroup.get("version").value)
    fd.append('create_date', Date.now() + "")
    fd.append('zipcode', user.zipcode)
    
    this.requestService.postBook(fd).subscribe(res=>{
      this.loading = false
      console.log("Response is ="+res)
      if (res['success']){
        this.router.navigate(['']);
        this.snackBar.open("Thank you! Your book has been added", null, {
          duration: 2000,
        });
      }
      else {
        //TODO show dialog for error message
      }
    })
  }

}
