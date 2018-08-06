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
  private sub;
  
  constructor(private route: ActivatedRoute,
              private strainService: StrainService,
              private router: Router) { }

  ngOnInit() {
    this.strain = null;
    this.sub = this.route.params.subscribe(params => {
      this.name = params['strain_name'];
      this.strainService.findStrainByName(this.name).then((strain) => {
        this.strain = strain;
      });
    });
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
