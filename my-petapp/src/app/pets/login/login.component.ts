import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataService } from '../service/api/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted:boolean=false;
  isLoggedIn: boolean=false;
  baseUrl: string = `${environment.baseUrl}/users?userName=`;
  dbUserName: string;
  dbPassword: string;
  userName: string;
  password: string;
  loggedInuser: string;
  isUserLoggedIn: boolean=true;
  constructor(private route: Router, private dataService:DataService) { }


  ngOnInit(): void {
    this.loginForm= new FormGroup({
      userName: new FormControl('',[Validators.required,Validators.pattern('[A-Za-z0-9._%+-]*(@gmail.com)')]),
      password: new FormControl('',[Validators.required,Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    });
  }

  /**
   * function to login into the eshopping cart app
   * it will check for various validations and throw required errors, if any issue with
   * data format
   */
  submitLoginForm=()=>{
    this.isSubmitted=true;
    console.log("login submitted");
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      console.log(this.loginForm.controls.value);
      this.userName=this.loginForm.controls.userName.value;
      this.password=this.loginForm.controls.password.value;
      
      this.dataService.getData(`${this.baseUrl}${this.userName}`).subscribe((response)=>{
        console.log(JSON.stringify(response));
        if(response!=='undefined'){
        this.dbUserName = response[0].userName;
        this.dbPassword = response[0].userPassword;
        console.log(this.dbUserName);
        console.log(this.dbPassword);
        
          if(this.dbUserName===this.userName && this.dbPassword===this.password){
          
            alert('Login is successfull.');
            sessionStorage.setItem('userId',response[0].id);
            sessionStorage.setItem('userName',response[0].userName);
            sessionStorage.setItem('userMobile',response[0].userMobile);
            sessionStorage.setItem('userPassword',response[0].userPassword);
            sessionStorage.setItem('userAddress',response[0].userAddress);
            this.isLoggedIn=true;
            this.route.navigate(['/pets-list']);
          }else{
            alert('Incorrect username/password. Please try again');
          }
        }else{
          alert('User is not registered, pls register and login again');
          this.route.navigate(['/registration']);
        }
        
        
      },(error)=>{
        console.log(error);
        alert('User is not registered, pls register and login again');
          this.route.navigate(['/registration']);
      },() => {
  
      }
      )

    }
  }

}
