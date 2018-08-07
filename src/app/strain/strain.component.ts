import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {StrainService} from '../services/strain.service';
import {ReviewService} from '../services/review.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-strain',
  templateUrl: './strain.component.html',
  styleUrls: ['./strain.component.css']
})
export class StrainComponent implements OnInit {

  name = "";
  strain = null;
  positiveEffect = [];
  negativeEffect = [];
  medicalEffect = [];
  private sub;
  
  user = null;
  ratingFld = 1;
  descFld = "";
  
  reviews = [];
  
  constructor(private route: ActivatedRoute,
              private strainService: StrainService,
              private reviewService: ReviewService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.strain = null;
    this.userService.currentUser()
        .then(u => this.user = u);
    this.sub = this.route.params.subscribe(params => {
      this.name = params['strain_name'];
      this.strainService.findStrainByName(this.name).then((strain) => {
        this.setStrain(strain);
        this.getReview();
      });
    });
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  setStrain(strain) {
    this.strain = strain;
    this.positiveEffect = [];
    this.negativeEffect = [];
    this.medicalEffect = [];
    strain.effects.forEach((eff) => {
      if (eff.category == "POSITIVE") {
        this.positiveEffect.push(eff);
      } else if (eff.category == "NEGATIVE") {
        this.negativeEffect.push(eff);
      } else {
        this.medicalEffect.push(eff);
      }
    });
  }
  
  getReview() {
    this.reviewService.findReviewByStrain(this.strain._id).then((reviews) => {
      this.reviews = reviews;
    });
  }
  
  postReview() {
    if (this.user == null || this.strain == null) {
      return;
    }
    this.reviewService.postReview({
      user: this.user._id,
      strain: this.strain._id,
      star: this.ratingFld,
      desc: this.descFld
    }).then((review) => {
      this.getReview()
    })
  }
}
