import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthenticationService } from '../services/core/authentication.service';
import { UtilsService } from '../services/core/utils.service';
import { Router } from '@angular/router';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    appToken: any;
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);


    constructor(private authenticationService: AuthenticationService, private utilsService: UtilsService,private router: Router) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.appToken = JSON.parse(localStorage.getItem('app-token'));

        // add authorization header with jwt token if available
        if (this.appToken && this.appToken.token) {
            request = this.addToken(request, this.appToken.token);
        }

        return next.handle(request).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    if (this.appToken && this.appToken.accessTokenExpiration) {
                        const accessTokenExpiration = new Date(this.appToken.accessTokenExpiration);
                        const now = new Date();
                        if (now.getTime() > accessTokenExpiration.getTime()) {
                            return this.handle401Error(request, next);
                        }
                    }
                }
                return throwError(error);
            })
        );
    }
    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                'x-token': `${token}`
            }
        });
    }
    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authenticationService
            .refreshToken({ accessToken: this.appToken.token, refreshToken: this.appToken.refreshToken })
            .pipe(
                switchMap((token: any) => {
                    if(token.accessToken == null) {
                        this.authenticationService.logout();
                        this.router.navigate(['/sessiontimeout']);
                    } else{
                        // localStorage.setItem('lastSignedInTime', new Date().getTime().toString());
                        this.isRefreshing = false;

                        this.appToken.token = token.accessToken;
                        this.appToken.accessTokenExpiration = token.accessTokenExpiration;
                        this.appToken.refreshToken = token.refreshToken;
                        localStorage.setItem('app-token', JSON.stringify(this.appToken));
                        this.authenticationService.appTokenSubject.next(this.appToken);

                        this.refreshTokenSubject.next(token.accessToken);
                        return next.handle(this.addToken(request, token.accessToken));
                    }
                })
            );
        } else {
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(accessToken => {
                    return next.handle(this.addToken(request, accessToken));
                }));
        }
    }
}