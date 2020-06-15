import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Benificiary } from '../models/Benificiary';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { environment } from 'src/environments/environment';
import { MatDialogRef } from '@angular/material/dialog';
import { BenificiaryListComponent } from '../benificiary-list/benificiary-list.component';

@Component({
  selector: 'app-benificiary',
  templateUrl: './benificiary.component.html',
  styleUrls: ['./benificiary.component.css']
})
export class BenificiaryComponent implements OnInit {

  payeeForm: FormGroup;
  baseUrl: string = `${environment.baseUrl}/benificiaries`;
  constructor(private route: Router,private dataService:CommonService, public dialogRef: MatDialogRef<BenificiaryListComponent>) { }


  ngOnInit(): void {
    this.payeeForm= new FormGroup({
      benificiaryName: new FormControl(''),
      benificiaryAccountName: new FormControl(''),
      bankName: new FormControl(''),
      benificiaryAccountNumber: new FormControl(''),
      benificiaryAccountType: new FormControl(''),
      ifsc: new FormControl('')
    });
  }

  /**
   * submits the benificiary details from add benificiary pop up form.
   * it validates and submits the data to the db
   */
  submitPayee=()=>{
    console.log('submitted');
    console.log(this.payeeForm);
    if(this.payeeForm.valid){
      console.log(this.payeeForm.value);
      let payeeObj: Benificiary= this.payeeForm.value;

      this.dataService.postData(`${this.baseUrl}`,payeeObj).subscribe((response)=>{
        console.log(response);
        alert('Benificiary added successfully.');
        this.route.navigate(['/benificiary-list']);
        this.dialogRef.close();
        window.location.reload();
      },(error)=>{
        console.log(error);
      },() => {
  
      }
      )
    }
  }

  /**
   * to close the pop up window
   */
  onClose=()=>{
   this.dialogRef.close();
  }
 

}
