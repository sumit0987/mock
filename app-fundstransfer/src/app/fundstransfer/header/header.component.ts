import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * logout the current users session and delete all entries from session
   * storage
   */
  logout=()=>{
    sessionStorage.removeItem('user');
  }

}
