import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StrainService {

  url = "";

  constructor() {
    if (window.location.port == "4200") {
      this.url = "http://localhost:3000"
    }
  }
  
  search(str) {
    return fetch(this.url + '/api/strain/search/' + str).then(response => response.json());
  }
  
  findStrainByName(str) {
    return fetch(this.url + '/api/strain/' + str).then(response => response.json());
  }
}
