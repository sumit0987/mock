import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'my-petapp';

  isHeaderShow: boolean=true;
  ngOnInit(){

  }

  loginEvent(event){
    this.isHeaderShow=false;
    console.log('in event emitter');
  }
}

