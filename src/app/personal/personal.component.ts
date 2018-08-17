import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

import {UserService} from "../services/user.service";
import {ReviewService} from "../services/review.service";
import {FollowService} from "../services/follow.service";

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  
  user = null;
  reviews = [];
  followed = false;
  disabled = true;
  sub = null;
  loggedUser = null;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private reviewService: ReviewService,
              private followService: FollowService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userService.getUser(params['userId']).then((user) => {
        this.user = user;
        this.userService.currentUser().then(u => {
          this.loggedUser = u;
          this.disabled = false;
          this.followed = this.findFollowed(user._id);
        })
        .catch();
        this.getReview();
      });
    });
  }
  
  getReview() {
    this.reviewService.findReviewByUser(this.user._id).then((reviews) => {
      this.reviews = reviews;
    });
  }
  
  findFollowed(userId) {
    return this.loggedUser != null && this.loggedUser.follows.indexOf(userId) != -1;
  }
  
  follow() {
    if (this.loggedUser == null) {
      window.alert("Please login first");
      return;
    }
    this.disabled = true;
    this.followService.followUser(this.loggedUser._id, this.user._id).then((user) => {
      this.loggedUser = user;
      this.followed = this.findFollowed(this.user._id);
      this.disabled = false;
    });
  }
  
  unfollow() {
    if (this.loggedUser == null) {
      window.alert("Please login first");
      return;
    }
    this.disabled = true;
    this.followService.unfollowUser(this.loggedUser._id, this.user._id).then((user) => {
      this.loggedUser = user;
      this.followed = this.findFollowed(this.user._id);
      this.disabled = false;
    });
  }

}
