import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

import {UserService} from "../services/user.service";
import {ReviewService} from "../services/review.service";
import {FollowService} from "../services/follow.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  user = null;
  reviews = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private reviewService: ReviewService,
              private followService: FollowService) { }

  ngOnInit() {
    this.userService.currentUser().then((user) => {
      this.user = user;
      if (user == null) {
        this.followService.getAllReviewStream().then((reviews) => {
          this.reviews = reviews;
        });
      } else {
        this.followService.getUserReviewStream(user._id).then((reviews) => {
          this.reviews = reviews;
        });
      }
    }).catch(() => {
      this.followService.getAllReviewStream().then((reviews) => {
        this.reviews = reviews;
      });
    });
  }

}
