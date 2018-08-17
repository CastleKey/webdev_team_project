import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  username: String;
  password: String;
  err;

  errMatch;
  errReg;

  users = []

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.findAllUsers().then((users) => {
      this.users = users;
    });
  }

  deleteUser(user) {
    this.userService.deleteUser(user.username).then((users) => {
      this.getUsers();
    });
  }

  createUser(username, password) {
    this.errMatch = false;
    this.errReg = false;
    const user = {
      username: username,
      password: password,
    };
    this.userService.createUser(user)
        .then(u => {
          this.userService.update(u);
          this.getUsers();
        })
        .catch(e => this.errReg = true);
  }

}
