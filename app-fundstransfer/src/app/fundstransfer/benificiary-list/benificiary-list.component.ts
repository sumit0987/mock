import { Component, OnInit } from '@angular/core';
import { Benificiary } from '../models/Benificiary';
import { environment } from 'src/environments/environment';
import { CommonService } from '../services/common.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BenificiaryComponent } from '../benificiary/benificiary.component';
import { FormGroup,FormControl } from '@angular/forms';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { Transaction } from '../models/Transaction';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-benificiary-list',
  templateUrl: './benificiary-list.component.html',
  styleUrls: ['./benificiary-list.component.css']
})
export class BenificiaryListComponent implements OnInit {

  //searchKey: string;
  benificiaryList: Array<Benificiary> = [];
  baseUrl: string=`${environment.baseUrl}/benificiaries`;
  baseUrl_transaction: string=`${environment.baseUrl}/transactions`;
  baseUrl_user: string=`${environment.baseUrl}/users`;

  displayedColumns: string[] = ['id', 'benificiaryName', 'benificiaryAccountNumber', 'bankName', 'actions'];
  transferFundsForm: FormGroup;
  selectedBenificiary: Benificiary;
  accountBalance: number=0;
  transferAmount: number=0;
  sessionUser: User;

  constructor(private dataService: CommonService, private dialog: MatDialog, private route: Router) { }

  ngOnInit(): void {
    this.getBenificiaryList();

    this.transferFundsForm= new FormGroup({
      benificiaryName: new FormControl(''),
      benificiaryAccountNumber: new FormControl(''),
      transferAmount: new FormControl('')
    });
  }

  /**
   * this function selects data i.e the list of existing benificiaries for a particular account
   * it will display list of benificiaries.
   */
  getBenificiaryList=()=>{
    this.dataService.getData(this.baseUrl).subscribe((response: Benificiary[])=>{
      this.benificiaryList=response;
      console.log(this.benificiaryList);
      //this.createBeneficiaryList();
    },(error)=>{
      console.log(error);
    },() => {
      
    }

    )
  }


  /**
   * generates a pop up modal having a 
   * form for adding a new benificiary to the account
   */
  onCreate=()=>{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    //dialogConfig.width="50%";
    this.dialog.open(BenificiaryComponent,dialogConfig);

  }

  /**
   * will delete the selected benificiary from the selected account
   * @param rowId {number}
   */
  onDelete=(rowId: number)=>{
    if(confirm('Are you sure to delete the benificiary?')){
      this.dataService.deleteData(`${this.baseUrl}/${rowId}`).subscribe((response)=>{
        this.getBenificiaryList();
        alert('Items removed from your cart successfully');
      },(error)=>{
        console.log(error);
      },() => {

      }
      )
      }
  }

  /**
   * selectes a particular  becificiary from the benificiary list
   * @param row {number}
   */
  onSelect=(row: number)=>{
    console.log(row);
    this.dataService.getData(`${this.baseUrl}/${row}`).subscribe((response: Benificiary)=>{
      this.selectedBenificiary=response;
      console.log(this.selectedBenificiary);
      this.populateTransferFundsForm(this.selectedBenificiary);
      
      //this.createBeneficiaryList();
    },(error)=>{
      console.log(error);
    },() => {
      
    }

    )
  }

  /**
   * once a beificiary is selected in the benificiary list, it will populare the 
   * funds transfer form with some data already existing in the db
   * @param selectedPayee {Benificiary}
   */
  populateTransferFundsForm=(selectedPayee: Benificiary)=>{
    this.transferFundsForm.setValue({
      benificiaryName: selectedPayee.benificiaryAccountName,
      benificiaryAccountNumber: selectedPayee.benificiaryAccountNumber,
      transferAmount: ''
    })
  }

  /**
   * submits/initiates the funds transfer process for a account
   */
  submitFundsTransfer=()=>{
    console.log(this.transferFundsForm);
    const transaction_credit: string='Credit';
    const transaction_debit: string='Debit';
    let transactionFromObj: any;
    let transactionToObj: any;
    this.sessionUser = JSON.parse(sessionStorage.getItem('user'));
    this.accountBalance=this.sessionUser[0].accountBalance;
    this.transferAmount=this.transferFundsForm.controls.transferAmount.value;
    if(this.transferFundsForm.valid && this.accountBalance>=this.transferAmount){

      transactionFromObj = {transactionDate: new Date(),
        from: this.sessionUser[0].userName,
        to: this.transferFundsForm.controls.benificiaryAccountNumber.value,
        transactionType: transaction_debit,
        transactionAmount: this.transferAmount
      }
      transactionToObj = {transactionDate: new Date(),
        from: this.sessionUser[0].userName,
        to: this.transferFundsForm.controls.benificiaryName,
        transactionType: transaction_credit,
        transactionAmount: this.transferFundsForm.controls.transactionAmount
      }
      console.log(this.transferFundsForm.value);

      this.updateAccountFrom(this.transferAmount);
     
      console.log('updated account');
      this.updateTransactions(transactionFromObj);
      this.updateSessionUserBalance();
    }
    else{
      alert('please verify benificiary details/account balance before proceeding');
    }
  }

  /**
   * updates the account balance once transfer amount is debited/credited to the account
   * @param transactionAmount {number}
   */
  updateAccountFrom=(transactionAmount)=>{
    this.sessionUser = JSON.parse(sessionStorage.getItem('user'));
    let accountFromObj = {userName: this.sessionUser[0].userName,
      firstName: this.sessionUser[0].firstName,
      lastName: this.sessionUser[0].lastName,
      userEmail: this.sessionUser[0].userEmail,
      userPassword: this.sessionUser[0].userPassword,
      accountNumber: this.sessionUser[0].accountNumber,
      accountType:this.sessionUser[0].accountType,
      accountStatus:this.sessionUser[0].accountStatus,
      userAddress: this.sessionUser[0].userAddress,
      userMobile: this.sessionUser[0].userMobile,
      id:this.sessionUser[0].id,
      accountBalance: parseInt(this.sessionUser[0].accountBalance)-parseInt(transactionAmount)
    }
    console.log('updated obj');
    console.log(accountFromObj);

    this.dataService.updateData(`${this.baseUrl_user}/${this.sessionUser[0].id}`,accountFromObj).subscribe((response)=>{
      console.log(response);
    },(error)=>{
      console.log(error);
    },() => {

    }
    )
    //sessionStorage.setItem('user',accountFromObj);
  }
  /**
   * inserting a record in transactions table for every successful funds transfer
   * @param transactionFromObj {Transaction}
   * 
   */
  updateTransactions=(transactionFromObj: Transaction)=>{
    console.log('update transactions');
    console.log(transactionFromObj);
    this.dataService.postData(`${this.baseUrl_transaction}`,transactionFromObj).subscribe((response)=>{
      alert('Fund transferred successfully.');
      //this.getBenificiaryList();
      //this.route.navigate(['/profile']);
    },(error)=>{
      console.log(error);
    },() => {

    }
    )
  }

  updateSessionUserBalance=()=>{
    this.sessionUser = JSON.parse(sessionStorage.getItem('user'));
    sessionStorage.removeItem('user');
    
    this.dataService.getData(`${this.baseUrl_user}/?userName=${this.sessionUser[0].userName}`).subscribe((response: User)=>{
      console.log(JSON.stringify(response));
      console.log(response);
      sessionStorage.setItem('user',JSON.stringify(response));
      this.route.navigate(['/profile']);
    },(error)=>{
      console.log(error);
    },() => {

    }
    )
  }

    
}
