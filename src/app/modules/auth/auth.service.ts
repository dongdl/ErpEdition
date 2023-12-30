import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, defer, map, of } from 'rxjs';
import { apiLogin } from '../../utils/mock-data';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  loginUser({ username, password }: { username: string; password: string }) {
    return defer(() => apiLogin({ username, password })).pipe(
      map((response) => {
        if (response) {
          localStorage.setItem('token', '123123213123');
        }

        return of(response);
      }),
      catchError((error) => {
        throw new Error('username or password is incorrect');
      })
    );
  }
}
