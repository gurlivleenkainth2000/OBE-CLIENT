import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class HttpRequestsInterceptor implements HttpInterceptor {

  constructor(
    private toast: ToastrService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.url.includes('login')) {
      console.log(">>> Wihout Intercepting");
      return next.handle(request);
    } else {
      console.log(">>> Wih Intercepting");
      console.log(">>> Reuquest Url: ", request.url);
      
      return next.handle(request.clone({
        headers: new HttpHeaders({
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Credentials': 'true'
        }),
        withCredentials: true
      })).pipe(
        catchError((err) => {
          console.log(err);
          if(err instanceof HttpErrorResponse) {
            this.toast.warning(err.statusText);
            if(err.statusText === "Invalid Token") {
              localStorage.clear();
              this.cookieService.deleteAll();
              this.router.navigate(['/login'], { replaceUrl: true });
              return throwError(err);
            }
          }

          return throwError('');
        })
      );
    }
  }
}
