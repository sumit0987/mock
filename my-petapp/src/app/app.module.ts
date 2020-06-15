import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PetsListComponent } from './pets/pets-list/pets-list.component';
import { PetsDetailComponent } from './pets/pets-detail/pets-detail.component';
import { DataService } from './pets/service/api/data.service';
import { RecordHighlightDirective } from './pets/record-highlight.directive';
import { LoginComponent } from './pets/login/login.component';
import { RegisterComponent } from './pets/register/register.component';
import { WelcomeHeaderComponent } from './header/welcome-header/welcome-header.component';
import { MainHeaderComponent } from './header/main-header/main-header.component';
import { AddPetComponent } from './pets/add-pet/add-pet.component';
import { UpdatePetComponent } from './pets/update-pet/update-pet.component';
import { NotFoundComponent } from './pets/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    PetsListComponent,
    PetsDetailComponent,
    RecordHighlightDirective,
    LoginComponent,
    RegisterComponent,
    WelcomeHeaderComponent,
    MainHeaderComponent,
    AddPetComponent,
    UpdatePetComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
