import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/api/data.service';
import { environment } from 'src/environments/environment';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit {

  addPetForm: FormGroup;
  baseUrl: string = `${environment.baseUrl}/pets`;
  constructor(private dataService: DataService, private route: Router) { }

  ngOnInit(): void {
    this.addPetForm= new FormGroup({
      petName: new FormControl(''),
      petAge: new FormControl(''),
      ownerAddress: new FormControl(''),
      ownerEmail: new FormControl(''),
      ownerPhone: new FormControl('')
    });
  }

  submitAddPet=()=>{
    if(this.addPetForm.valid){
      let petObj = {petName: this.addPetForm.value.petName,
        petAge: this.addPetForm.value.petAge,
        ownerAddress: this.addPetForm.value.ownerAddress,
        ownerEmail: this.addPetForm.value.ownerEmail,
        ownerPhone: this.addPetForm.value.ownerPhone
      }
      console.log(this.addPetForm.value);
      console.log(this.addPetForm.value.ownerPhone);

      this.dataService.postData(`${this.baseUrl}`,petObj).subscribe((response)=>{
        console.log(response);
        alert('Pet details added successfully');
        this.route.navigate(['/pets-list']);
      },(error)=>{
        console.log(error);
      },() => {
  
      }
      )

    }
  }

}
