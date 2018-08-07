import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  password: String;
  passwordAgain: String;
  errMatch;
  errReg;

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {
  }

  register(username, password, passwordAgain) {
    this.errMatch = false;
    this.errReg = false;
    if (password != passwordAgain) {
      this.errMatch = true;
      return;
    }
    const user = {
      username: username,
      password: password,
    };
    this.userService.register(user)
        .then(u => {
          this.userService.update(u);
          this.router.navigate(['profile'])
        })
        .catch(e => this.errReg = true);
  }

}

