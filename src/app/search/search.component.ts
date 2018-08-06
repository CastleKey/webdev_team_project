import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {StrainService} from '../services/strain.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  query = "";
  result = [];

  constructor(private strainService: StrainService,
              private router: Router) { }

  ngOnInit() {
  }
  
  search(query) {
    this.strainService.search(query).then((res) => {
      this.result = res;
    });
  }
  
  select(name) {
    this.router.navigate(['strain', name]);
  }
}
