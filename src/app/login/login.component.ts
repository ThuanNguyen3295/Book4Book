import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../services/auth.service'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading: boolean = false
  userCredentials: FormGroup;
  username: AbstractControl;
  password: AbstractControl;
  email: AbstractControl;
  zipcode: AbstractControl;
  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  isCreatingNewAccount: boolean = false;

  constructor(
    public thisDiaLogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: String,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ){}

  ngOnInit() {
    this.userCredentials = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9_]*'), Validators.minLength(5), Validators.maxLength(30)])],
      password: ['',Validators.compose([Validators.required, Validators.minLength(6)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
      zipcode: ['', Validators.compose([Validators.required, Validators.maxLength(5), Validators.minLength(5)])]
    });
  }

  onCloseConfirm() {
    this.loading = true
    const user = {
      username:  this.userCredentials.get("username").value,
      password:  this.password = this.userCredentials.get("password").value
    }
    //Verify the username and password
    this.authService.authenticateUser(user).subscribe(data =>{
      this.loading = false;
      if(data.success){
        this.thisDiaLogRef.close('Confirm');
        console.log(data.user)
        this.authService.storeUserData(data.token, data.user);
        this.snackBar.open("Welcome back, " + data.user.username + '!', null, {
          duration: 2000,
        });
      }else {
        //TODO display error message in the form 
        this.snackBar.open(data.msg, null, {
          duration: 2000,
        });
      }
    });
  }

  onCloseCancel() {
    this.thisDiaLogRef.close('Cancel');
  }

  //PRIAVTE METHODS
  wantToSignIn(){
    if(this.isCreatingNewAccount == true)
      this.isCreatingNewAccount = !this.isCreatingNewAccount;
  }

  wantToRegister(){
    if(this.isCreatingNewAccount == false)
      this.isCreatingNewAccount = !this.isCreatingNewAccount;
  }

}
