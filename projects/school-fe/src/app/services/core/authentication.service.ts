import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpHeaders, HttpParams } from '@angular/common/http';
import { UtilsService } from './utils.service';
import { environment } from '@environment';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    currentUserSubject: BehaviorSubject<any>;
    currentUser: Observable<any>;
    header: HttpHeaders;
    version = 'v1.0';
    constructor(private http: HttpClient, private utils: UtilsService) {
        const headerSettings: {[name: string]: string | string[]; } = {};
        this.header = new HttpHeaders(headerSettings);
        let obj = localStorage.getItem('currentUser');
        if(obj != null){
            try{
            this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(obj));
            }catch(e) {
                this.currentUserSubject = new BehaviorSubject<any>({});
            }
        } else {
            this.currentUserSubject = new BehaviorSubject<any>({});
        }
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
    let loginInfo = {
       userName: username,
       passwordHash: password
    };
             return this.http.post<any>(environment.apiUrl+this.version+'/Authenticate/Login', loginInfo, { headers: this.header })
            .pipe(
                map(user => {
                // const helper = new JwtHelperService();
               
                if (user && user.userInfo && user.status === 0) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user.userInfo));
                    this.currentUserSubject.next(user.userInfo);

                }
                return user;
            }));
    }
    refreshToken(refreshTokenModel: any){
        return this.http.post(`${environment.apiUrl}${this.version}/Authenticate/Refresh`, refreshTokenModel);
    }

    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('nienhochientai');
        localStorage.removeItem('danhSachHoiDongThiTrongKyThi');
        localStorage.removeItem('nienhocList');
        localStorage.removeItem('decentralizedMenu');
        this.currentUserSubject.next(null);
    }
}