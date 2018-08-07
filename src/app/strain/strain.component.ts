import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {StrainService} from '../services/strain.service';

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
  
  constructor(private route: ActivatedRoute,
              private strainService: StrainService,
              private router: Router) { }

  ngOnInit() {
    this.strain = null;
    this.sub = this.route.params.subscribe(params => {
      this.name = params['strain_name'];
      this.strainService.findStrainByName(this.name).then((strain) => {
        this.setStrain(strain);
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
}
