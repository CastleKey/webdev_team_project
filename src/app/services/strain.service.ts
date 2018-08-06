import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StrainService {

  constructor() { }
  
  search(str) {
    return fetch('/api/strain/search/' + str).then(response => response.json());
  }
  
  findStrainByName(str) {
    return fetch('/api/strain/' + str).then(response => response.json());
  }
}
