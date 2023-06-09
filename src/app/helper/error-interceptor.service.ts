import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { NotificationService } from '../service/notification.service';
import { TokenStorageService } from '../service/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(private tokenService: TokenStorageService, private notificationService: NotificationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.tokenService.logOut();
          window.location.reload();
        }

        const error = err.error || err.message || err
        console.log(error);
        this.notificationService.showSnackBar(error)

        return throwError(error);
      })
    );
  }
}

export const errorInterceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptorService,
    multi: true,
  },
];
