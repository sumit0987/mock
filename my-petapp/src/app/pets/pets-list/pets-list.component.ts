import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/api/data.service';
import { environment } from 'src/environments/environment';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.css']
})
export class PetsListComponent implements OnInit {

  
  pets: any=[];
  baseUrl: string = `${environment.baseUrl}/pets`;
  selectedPet: any=null;
  color: string='#ddd';
  colorMain: string='#ffffff';
  isAddNewPetClicked: boolean=false;
  
  
  constructor(private dataService: DataService, private route: Router) {}

  /**
   * this method gets called when the pets list component loads.
   * this will subscribe on the getData method of the data service
   */
  ngOnInit(): void {
    this.getData();
  }
  getData=()=>{
    this.dataService.getData(this.baseUrl).subscribe((response)=>{
      this.pets=response;
      console.log(this.pets);
    },(error)=>{
      console.log(error);
    },() => {

    }

    )
  }
  /**
   * function called to change boolean value of the new click new pet details form
   */
  // addPet=()=>{
  //   this.isAddNewPetClicked=true;
  // }

  /**
   * to refresh the list of pets avaibale after deleting data from child component
   * i.e pet-detail component
   */
  // onDelete=(pet)=>{
  //   this.getData();
  // }

  /**
   * function called whenever there is a change with pet list
   * trackBy throws the index and the object of which the list is changed
   */
  trackByPetId=(index: number, pet :any) => {
    return pet.id;
  }

/**
   * when select button is clicked, this function gets invoked
   * Selected pet is passed as parameter to this function and we are mapping
   * its value with a variable selectedPet
   */
  selectPet=(pet) => {
    this.isAddNewPetClicked=false;
    this.selectedPet=pet;
    console.log(this.selectedPet.id);
    this.route.navigate(['/updatePet',this.selectedPet.id]);
  }

  deletePet=(pet)=>{
    console.log('In delete');
    console.log(pet);
    confirm('Are you sure to delete..')
    this.dataService.deleteData(`${this.baseUrl}/${pet.id}`).subscribe((response)=>{
      alert('Pet deleted successfully');
      //this.route.navigate(['/pets-list']);
      this.getData();
    },(error)=>{
      console.log(error);
    },() => {

    }

    )
    
  }

}
