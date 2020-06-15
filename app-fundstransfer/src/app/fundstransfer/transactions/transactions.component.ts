import { Component, OnInit } from '@angular/core';
import { Transaction } from '../models/Transaction';
import { environment } from 'src/environments/environment';
import { CommonService } from '../services/common.service';  

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transactions: Transaction[];
  baseUrl: string=`${environment.baseUrl}/transactions`;
  displayedColumns: string[] = ['id', 'transactionDate', 'from', 'to','transactionType','transactionAmount'];
  constructor(private dataService: CommonService) { }

  ngOnInit(): void {
    this.getData();
  }

  /**
   * this function selects data i.e transaction list for the bank account
   * it will display list of transactions.
   */
  getData=()=>{
    this.dataService.getData(this.baseUrl).subscribe((response: Transaction[])=>{
      this.transactions=response;
      console.log(this.transactions);
    },(error)=>{
      console.log(error);
    },() => {
      
    }

    )
  }

}
