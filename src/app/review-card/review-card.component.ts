import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import {Router} from "@angular/router";

import {UserService} from "../services/user.service";
import {ReviewService} from '../services/review.service';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})
export class ReviewCardComponent implements OnInit {

  @Input() review;
  @Input() deletable?: boolean = false;
  @Input() user?: any = null;
  @Output() onDeleted = new EventEmitter<boolean>();

  constructor(private router: Router,
              private reviewService: ReviewService,
              private userService: UserService) { }

  ngOnInit() {
  }
  
  goToStrain() {
    this.router.navigate(["strain", this.review.strain]);
  }
  
  goToUser(str) {
    this.router.navigate(["profile", str]);
  }
  
  updateStarLit() {
    this.review.starLit = !this.review.starLit;
    this.reviewService.updateReview(this.review).then((review) => {
      
    });
  }

  deleteReview(review) {
    if (this.deletable) {
      this.reviewService.deleteReview(review._id).then((reviews) => {
        this.onDeleted.emit(true);
      });
    }
  }

}
