import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "";

  constructor() {
    if (window.location.port == "4200") {
      this.url = "http://localhost:3000"
    }
  }

  login(user) {
    return fetch(this.url + '/api/user/login', {
      method: 'post',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(response => response.json());
  }

  logout() {
    return fetch(this.url + '/api/user/logout', {
      method: 'post',
      credentials: 'include'
    });
  }

  register(user) {
    return fetch(this.url + '/api/user/register', {
      method: 'post',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(response => response.json());
  }

  createUser(user) {
    return fetch(this.url + '/api/user/createUser', {
      method: 'post',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(response => response.json());
  }

  currentUser() {
    return fetch(this.url + '/api/user/profile', {
      method: 'get',
      credentials: 'include'
    }).then(response => response.json())
  }

  findAllUsers() {
    return fetch(this.url + '/api/user/findusers', {
      method: 'get',
      credentials: 'include'
    }).then(response => response.json())
  }

  updateUser(user) {
    return fetch(this.url + '/api/user/profile', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(response => response.json());
  }

  updatePassword(password) {
    return fetch(this.url + '/api/user/updatePassword', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({password:password})
    }).then(response => response.json());
  }

  /**
  deleteUser() {
    return fetch(this.url + '/api/profile', {
      method: 'DELETE',
      credentials: 'include'
    });
  }
  */

  deleteUser(username) {
    return fetch(this.url + '/api/user/' + username, {
      method: 'DELETE',
      credentials: 'include'
    }).then(response => response.json());
  }

  listeners = [];

  subscribe(fun) {
    this.listeners.push(fun);
  }

  update(user) {
    if (user._id == undefined || user._id == null){
      user = null;
    }
    this.listeners.forEach((fun) => {
      fun(user);
    });
  }
}
