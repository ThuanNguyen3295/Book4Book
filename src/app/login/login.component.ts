import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../services/auth.service'
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading: boolean = false
  userCredentials: FormGroup;
  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  isCreatingNewAccount: boolean = false;
  isEmailTaken: boolean = false;
  isUsernameTaken: boolean = false;
  isUsernameWrong: boolean = false;
  isPasswordWrong: boolean = false;
  constructor(
    public thisDiaLogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: String,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public matDialog: MatDialog
  ){}

  ngOnInit() {
      this.userCredentials = this.formBuilder.group({
        username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9_]*'), Validators.minLength(5), Validators.maxLength(30)])],
        password: ['',Validators.compose([Validators.required, Validators.minLength(6)])],
        email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
        zipcode: ['', Validators.compose([Validators.required,Validators.maxLength(5), Validators.minLength(5)])]
    });
  }

  onCloseConfirm() {
    if(!this.isCreatingNewAccount){
      this.signingIn();
    }else {
      this.registeringAccount();
    }
  }

  //USER SIGNING IN
  signingIn(){
    this.loading = true;
    const user = {
      username:  this.userCredentials.get("username").value,
      password:  this.userCredentials.get("password").value
    };
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
        if(data.msg == " User not found"){
          this.isUsernameWrong = true;
          this.isPasswordWrong = false;
        }
        else{
          this.isPasswordWrong = true;
          this.isUsernameWrong = false;
        }
      }
    });
  }
  
  //REGISTER THE USER
  registeringAccount(){
    const user = {
      username:  this.userCredentials.get("username").value,
      password:  this.userCredentials.get("password").value,
      email: this.userCredentials.get("email").value,
      zipcode: this.userCredentials.get("zipcode").value
    };
    //Check for availbility of username
    this.isUsernameRegistered(user.username).subscribe(data=>{
      if(!data.success){
        this.isUsernameTaken = true;
      }
    });
    //Check email for availability
    this.isEmailRegistered(user.email).subscribe(data2 =>{
      if(!data2.success){
        this.isEmailTaken = true;
      }else {
          //Register
          this.authService.registerUser(user).subscribe(data =>{
            if(data.success){
              this.thisDiaLogRef.close('Confirm');
              this.snackBar.open("User registered!", null, {duration: 5000,})
              this.matDialog.open(LoginComponent);
            }else {
              this.snackBar.open(data.msg, null, {
                duration: 2000,
              });
            }
          });
      }
    })
  }

  onCloseCancel() {
    this.thisDiaLogRef.close('Cancel');
  }

  //PRIAVTE METHODS TOGGLE BETWEEN SIGN IN AND REGISTER
  wantToSignIn(){
    if(this.isCreatingNewAccount == true){
      this.isCreatingNewAccount = !this.isCreatingNewAccount;
    }
    this.isUsernameTaken = this.isEmailTaken = false;
  }

  wantToRegister(){
    if(this.isCreatingNewAccount == false){
      this.isCreatingNewAccount = !this.isCreatingNewAccount;
    }
  }

  //TESTING USER AVAILABILITY
  isUsernameRegistered(username){
    return this.authService.checkUsernameAvailability(username);
  }

  isEmailRegistered(email){
    return this.authService.checkEmailAvailability(email);
  }

}
