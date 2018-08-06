import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = {username: "", name:"", role:"REGULAR", email:null};
  err;
  
  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.currentUser()
        .then(u => this.user = u)
        .catch(e => this.err = true);
  }

  update() {
    this.userService.updateUser(this.user)
        .then(u => window.alert("Updated"))
        .catch(e => this.err = true);
  }

  logout() {
    this.userService.logout()
        .then(u => {
          this.userService.update(u);
          this.router.navigate([''])
        })
        .catch(e => this.err = true);
  }

}

