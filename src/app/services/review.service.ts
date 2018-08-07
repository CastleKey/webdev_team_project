import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  url = "";

  constructor() { 
    if (window.location.port == "4200") {
      this.url = "http://localhost:3000"
    }
  }
  
  postReview(review) {
    return fetch(this.url + '/api/review', {
      method: 'post',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(review)
    }).then(response => response.json());
  }
  
  findReviewByUser(userId) {
    return fetch(this.url + '/api/review/user/' + userId, {
      method: 'get'
    }).then(response => response.json());
  }
  
  findReviewByStrain(strainId) {
    return fetch(this.url + '/api/review/strain/' + strainId, {
      method: 'get'
    }).then(response => response.json());
  }

  findReviewById(reviewId) {
    return fetch(this.url + '/api/review/' + reviewId, {
      method: 'get'
    }).then(response => response.json())
  }
  
  updateReview(review) {
    return fetch(this.url + '/api/review/' + review._id, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(review)
    }).then(response => response.json());
  }
  
  deleteReview(reviewId) {
    return fetch(this.url + '/api/review/' + reviewId, {
      method: 'DELETE',
      credentials: 'include'
    }).then(response => response.json());
  }
}
