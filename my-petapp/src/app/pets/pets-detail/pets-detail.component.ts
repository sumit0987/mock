import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';

import { DataService } from '../service/api/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pets-detail',
  templateUrl: './pets-detail.component.html',
  styleUrls: ['./pets-detail.component.css']
})
export class PetsDetailComponent implements OnInit {

  /**
   * studObj received from parent list component
   */
  @Input() petObj: any;
  @Input() isSelectedFormHidden: boolean=false;
  @Output() deletedPet = new EventEmitter();
  @Output() updatedPet = new EventEmitter();
  baseUrl: string = `${environment.baseUrl}/pets`;
  selectedPetId: string=null;
  updatePetForm: FormGroup;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.updatePetForm= new FormGroup({
      petName: new FormControl(''),
      petAge: new FormControl(''),
      ownerAddress: new FormControl(''),
      ownerEmail: new FormControl(''),
      ownerPhone: new FormControl('')
    });
    console.log('ngonInit');
    console.log(this.petObj);
    this.updatePetForm.setValue({
      petName: this.petObj.petName,
      petAge: this.petObj.petAge,
      ownerAddress: this.petObj.ownerAddress,
      ownerEmail: this.petObj.ownerEmail,
      ownerPhone: this.petObj.ownerPhone
    })
  }

  /**
   * when delete button is clicked, this function gets invoked
   * it sets the selected student to null so that the selected pet div is cleared
   */
  clearSelectedPet=()=>{
    this.petObj=null;
  }

  /**
   * update the selected pet with new data whenever this button is clicked
   * It subscribes to the updateData function in service 
   */
  updatePet=()=>{
    let petObj = {petName: this.updatePetForm.value.petName,
      petAge: this.updatePetForm.value.petAge,
      ownerAddress: this.updatePetForm.value.ownerAddress,
      ownerEmail: this.updatePetForm.value.ownerEmail,
      ownerPhone: this.updatePetForm.value.ownerPhone
    }
    console.log('in update');
    console.log(petObj);
    this.selectedPetId=this.petObj.id;
    this.dataService.updateData(`${this.baseUrl}/${this.selectedPetId}`,petObj).subscribe((response)=>{
      console.log(response);
      this.updatedPet.emit(this.petObj);
    },(error)=>{
      console.log(error);
    },() => {

    }
    )
  }

  /**
   * Delete the selected pet from saved list of pets data whenever this button is clicked
   * It subscribes to the deleteDate function in service 
   */
  deleteSelectedPet=()=>{
    this.selectedPetId=this.petObj.id;
    this.dataService.deleteData(`${this.baseUrl}/${this.selectedPetId}`).subscribe((response)=>{
      console.log(response);
      //this.ngOnInit();
      this.clearSelectedPet();
      this.deletedPet.emit(this.petObj);
    },(error)=>{
      console.log(error);
    },() => {

    }
    )
  }
}
