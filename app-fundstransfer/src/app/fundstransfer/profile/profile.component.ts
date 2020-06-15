import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  fName: string;
  lName: string;
  accountNumber: string;
  userName: string;
  mobile: string;
  address: string;
  email: string;
  accountBalance:number;
  accountStatus: string;
  accountType: string;
  sessionUser: User;
  userId: number;
  
  constructor() { }

  ngOnInit(): void {
    this.populateProfileSection();
  }

  /**
   * this function will populate the dashboard/profile with necessary account details of the 
   * logged in user.
   */
  populateProfileSection=()=>{
    this.sessionUser = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.sessionUser);
    this.fName= this.sessionUser[0].firstName;
    this.lName= this.sessionUser[0].lastName;
    this.accountNumber= this.sessionUser[0].accountNumber;
    this.userName= this.sessionUser[0].userName;
    this.mobile= this.sessionUser[0].userMobile;
    this.address= this.sessionUser[0].userAddress;
    this.email= this.sessionUser[0].userEmail;
    this.accountBalance= this.sessionUser[0].accountBalance;
    this.accountStatus= this.sessionUser[0].accountStatus;
    this.accountType= this.sessionUser[0].accountType;
    this.userId = this.sessionUser[0].id;
  }

}
