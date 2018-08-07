import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import {UserService} from "../services/user.service";
import {ReviewService} from '../services/review.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = null;
  newPass = "";
  err;
  
  reviews = [];
  
  constructor(private router: Router,
              private reviewService: ReviewService,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.currentUser()
        .then(u => {
          this.user = u;
          this.getReview();
          })
        .catch(e => this.err = true);
  }

  update() {
    this.userService.updateUser(this.user)
        .then(u => {
          this.userService.update(u);
          window.alert("Updated");
        })
        .catch(e => this.err = true);
  }

  updatePassword() {
    this.userService.updatePassword(this.newPass)
        .then(u => {
          this.userService.update(u);
          window.alert("Updated");
        })
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
  
  getReview() {
    if (this.user == null) {
      this.reviews = [];
      return;
    }
    this.reviewService.findReviewByUser(this.user._id).then((reviews) => {
      this.reviews = reviews;
    });
  }

  deleteReview(review) {
    this.reviewService.deleteReview(review._id).then((reviews) => {
      this.getReview();
    });
  }
}

