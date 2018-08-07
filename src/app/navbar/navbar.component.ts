import { Component, OnInit } from '@angular/core';

import {UserService} from "../services/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  user = null;
  private sub;
  
  constructor(private userService: UserService) { 
    userService.subscribe(this.setUser.bind(this));
  }

  ngOnInit() {
    this.updateCurrentUser();
  }
  
  updateCurrentUser() {
    this.userService.currentUser()
        .then(u => this.user = u)
        .catch(e => this.user = null);
  }

  setUser(user) {
    this.user = user;
  }

}
