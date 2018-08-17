import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {UserService} from '../services/user.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {

  query = '';
  result = [];

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {
  }

  search(query) {
    this.userService.searchUser(query).then((res) => {
      this.result = res;
    });
  }

  select(name) {
    this.router.navigate(['profile', name]);
  }

}
