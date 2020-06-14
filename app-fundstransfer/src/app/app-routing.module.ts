import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/fundstransfer/login/login.component';
import { DashboardComponent } from '../app/fundstransfer/dashboard/dashboard.component';
import { ProfileComponent } from './fundstransfer/profile/profile.component';
import { TransferComponent } from './fundstransfer/transfer/transfer.component';
import { TransactionsComponent } from './fundstransfer/transactions/transactions.component';
import { BenificiaryListComponent } from './fundstransfer/benificiary-list/benificiary-list.component';
import { BenificiaryComponent } from './fundstransfer/benificiary/benificiary.component'


const routes: Routes = [
  {path: 'login' , component: LoginComponent },
  //{path: 'dashboard' , component: DashboardComponent },
  {path: 'dashboard', component: BenificiaryComponent},
  {path: 'profile' , component: ProfileComponent },
  {path: 'benificiary-list' , component: BenificiaryListComponent },
  {path: 'transactions' , component: TransactionsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
