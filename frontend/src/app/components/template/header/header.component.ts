import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean;
  constructor() { }


  logout() {
    //this.authService.logout('/');
  }
  ngOnInit(): void {
    // this.isAuthenticated = await this.authService.checkAuthenticated();
  }

}
