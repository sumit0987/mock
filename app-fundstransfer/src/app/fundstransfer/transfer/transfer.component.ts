import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { CommonService } from '../services/common.service'; 
import { Benificiary } from '../models/Benificiary';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  userList: Array<User> = [];
  //benificiaryList: Array<Benificiary> = [];
  baseUrl: string=`${environment.baseUrl}/users`;
  
  constructor(private dataService: CommonService) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList=()=>{
    this.dataService.getData(this.baseUrl).subscribe((response: User[])=>{
      this.userList=response;
      console.log(this.userList);
      //this.createBeneficiaryList();
    },(error)=>{
      console.log(error);
    },() => {
      
    }

    )
  }
  
  // createBeneficiaryList = ()=>{
  //   console.log(`length: ${this.userList.length}`);
  //     for(let i=0; i<this.userList.length;i++){
  //       console.log(this.userList[i].id);
  //       if(!(this.userList[i].id===parseInt(sessionStorage.getItem('userId')))){
  //         console.log(this.userList[i].id);
  //         let benificiaryObj = new Benificiary();
  //         benificiaryObj.accountNumber=this.userList[i].accountNumber;
  //         benificiaryObj.accountName=this.userList[i].userName;
  //         this.benificiaryList.push(benificiaryObj);
  //       }
  //     }
  //     console.log(this.benificiaryList);
  //     console.log(`length of b: ${this.benificiaryList.length}`);
  // }

}
