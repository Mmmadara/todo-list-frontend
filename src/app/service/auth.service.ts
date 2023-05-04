import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'http://localhost:8085/api/auth/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private tokenService:TokenStorageService) {
    const token = tokenService.getToken();
    this._isLoggedIn$.next(!!token);
  }

  public _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this._isLoggedIn$.asObservable();

  public login(user: any): Observable<any> {
    return this.http
      .post(AUTH_API + 'signin', {
        email: user.email,
        password: user.password,
      })
      .pipe(
        tap((response: any) => {
          this.tokenService.saveToken(response);
          this._isLoggedIn$.next(true);
        })
      );
  }

  public register(user: any): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      email: user.email,
      password: user.password,
      name: user.name,
    });
  }
}
