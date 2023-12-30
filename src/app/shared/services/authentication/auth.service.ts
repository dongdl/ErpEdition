import { Injectable } from '@angular/core';
@Injectable()
export class AuthService {
  private static tokenPayload: any;
  constructor() {}
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    return true;
  }
  removeToken() {
    localStorage.clear();
  }
}
