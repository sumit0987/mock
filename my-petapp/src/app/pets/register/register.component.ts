import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataService } from '../service/api/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  isSubmitted:boolean=false;
  baseUrl: string = `${environment.baseUrl}/users`;
  constructor(private dataService: DataService, private route: Router) { }

  ngOnInit(): void {
    this.registrationForm= new FormGroup({
      userName: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.pattern('[A-Za-z0-9._%+-]*(@gmail.com)')]),
      mobile: new FormControl('',[Validators.required,Validators.pattern('^(\\+91)[0-9]{10}$')]),
      userPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
      confirmPassword: new FormControl('',Validators.required),
      address: new FormControl('',[Validators.required, Validators.maxLength(150)])
    });
  }

  /**
   * this function initiates registration functionality
   * in the application 
   */
  submitRegistrationForm=()=>{
    this.isSubmitted=true;
    console.log('registration initiated');
    console.log(this.registrationForm);
    if(this.registrationForm.valid){
      console.log(this.registrationForm.value);
      
      let userObj: any= this.registrationForm.value;

      this.dataService.postData(`${this.baseUrl}`,userObj).subscribe((response)=>{
        console.log(response);
        alert('User registered successfully. Please login to continue');
        this.route.navigate(['/login']);
      },(error)=>{
        console.log(error);
      },() => {
  
      }
      )
    }
  }

}
