import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;
  err;

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {
  }

  login(username, password) {
    const user = {
      username: username,
      password: password
    };
    this.userService.login(user)
        .then(u => {
          this.userService.update(u);
          this.router.navigate(['profile'])
        })
        .catch(e => this.err = true);
  }

}

