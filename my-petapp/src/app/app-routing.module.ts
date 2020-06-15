import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pets/login/login.component';
import { RegisterComponent } from './pets/register/register.component';
import { PetsListComponent } from './pets/pets-list/pets-list.component';
import { AddPetComponent } from './pets/add-pet/add-pet.component';
import { UpdatePetComponent } from './pets/update-pet/update-pet.component';
import { NotFoundComponent } from './pets/not-found/not-found.component';


const routes: Routes = [
  { path: 'login' , component: LoginComponent },
  { path: 'register' , component: RegisterComponent },
  { path: 'pets-list' , component: PetsListComponent},
  { path: 'addPet' , component: AddPetComponent},
  { path: 'updatePet/:id' , component: UpdatePetComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
