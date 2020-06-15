import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../service/api/data.service';
import { environment } from 'src/environments/environment';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-pet',
  templateUrl: './update-pet.component.html',
  styleUrls: ['./update-pet.component.css']
})
export class UpdatePetComponent implements OnInit {

  updatePetId: number;
  selectedPetData: any;
  selectedPetId: any;
  private sub: any;
  baseUrl: string = `${environment.baseUrl}/pets`;
  updatePetForm: FormGroup;
  constructor(private route: ActivatedRoute,private dataService: DataService,private router: Router) { }

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      this.updatePetId = +params['id']; // (+) converts string 'id' to a number
      console.log('Id got :'+this.updatePetId);
      // In a real app: dispatch action to load the details here.
      this.getSelectedPetData();
   });
   this.updatePetForm= new FormGroup({
    petName: new FormControl(''),
    petAge: new FormControl(''),
    ownerAddress: new FormControl(''),
    ownerEmail: new FormControl(''),
    ownerPhone: new FormControl('')
  });
  }

  setFormdata=()=>{
    this.updatePetForm.setValue({
      petName: this.selectedPetData.petName,
      petAge: this.selectedPetData.petAge,
      ownerAddress: this.selectedPetData.ownerAddress,
      ownerEmail: this.selectedPetData.ownerEmail,
      ownerPhone: this.selectedPetData.ownerPhone
    })
  }

  getSelectedPetData=()=>{
    this.dataService.getData(`${this.baseUrl}/${this.updatePetId}`).subscribe((response)=>{
      this.selectedPetData=response;
      console.log(this.selectedPetData);
      this.setFormdata();
    },(error)=>{
      console.log(error);
    },() => {

    }

    )
  }

  updatePet=()=>{
    
    let petObj = {petName: this.updatePetForm.value.petName,
      petAge: this.updatePetForm.value.petAge,
      ownerAddress: this.updatePetForm.value.ownerAddress,
      ownerEmail: this.updatePetForm.value.ownerEmail,
      ownerPhone: this.updatePetForm.value.ownerPhone
    }
    console.log('in update');
    console.log(petObj);
    this.selectedPetId=this.selectedPetData.id;
    this.dataService.updateData(`${this.baseUrl}/${this.selectedPetId}`,petObj).subscribe((response)=>{
      console.log(response);
      alert('Pet details updated successfully');
      this.router.navigate(['/pets-list']);
    },(error)=>{
      console.log(error);
    },() => {

    }
    )
  }

}
