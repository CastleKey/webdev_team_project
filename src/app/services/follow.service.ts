import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  url = "";

  constructor() { 
    if (window.location.port == "4200") {
      this.url = "http://localhost:3000"
    }
  }
  
  followUser(fromUserId, toUserId) {
    return fetch(this.url + "/api/follow/user/" + fromUserId + "/" + toUserId, {
      method: 'post',
      credentials: 'include'
    }).then(res => res.json());
  }
  
  unfollowUser(fromUserId, toUserId) {
    return fetch(this.url + "/api/follow/user/" + fromUserId + "/" + toUserId, {
      method: "DELETE",
      credentials: 'include'
    }).then(res => res.json());
  }
  
  getFollows(userId) {
    return fetch(this.url + "/api/follow/user/" + userId).then(res => res.json());
  }
  
  getAllReviewStream() {
    return fetch(this.url + "/api/follow/stream").then(res => res.json());
  }
  
  getUserReviewStream(userId) {
    return fetch(this.url + "/api/follow/stream/" + userId).then(res => res.json());
  }
}
