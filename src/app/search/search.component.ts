import { Component, OnInit } from '@angular/core';
import {StrainService} from '../services/strain.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  query = "";
  result = [];
  selectedStrain = null;

  constructor(private strainService: StrainService) { }

  ngOnInit() {
  }
  
  search(query) {
    this.strainService.search(query).then((res) => {
      this.result = res;
    });
  }
  
  select(name) {
    this.strainService.findStrainByName(name).then((strain) => {
      this.selectedStrain = JSON.stringify(strain);
    });
  }
}
