import { MutationResponse } from './../../interfaces/query';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Apollo } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UtilsService } from './utils.service';
import gql from 'graphql-tag';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    appTokenSubject: BehaviorSubject<any>;
    appToken: Observable<any>;
    header: HttpHeaders;

    private signInMutation: DocumentNode = gql`
        mutation signIn($email: String!, $password: String!){
            signIn(email:$email, password: $password){
                token
            }
        }
    `;
    constructor(
        private http: HttpClient,
        private apollo: Apollo,
        private utils: UtilsService
    ) {
        const headerSettings: {[name: string]: string | string[]; } = {};
        this.header = new HttpHeaders(headerSettings);
        const obj = localStorage.getItem('app-token');
        if(obj != null){
            try{
            this.appTokenSubject = new BehaviorSubject<any>(JSON.parse(obj));
            }catch(e) {
                this.appTokenSubject = new BehaviorSubject<any>({});
            }
        } else {
            this.appTokenSubject = new BehaviorSubject<any>({});
        }
        this.appToken = this.appTokenSubject.asObservable();
    }

    public get appTokenValue(): any {
        return this.appTokenSubject.value;
    }

    login(email: string, password: string): Observable<MutationResponse> {
        const loginInfo = {
            email,
            password
        };

        return this.apollo.mutate({
            mutation: this.signInMutation,
            variables: loginInfo
        }).pipe(
            map(user => {
            // const helper = new JwtHelperService();
                console.log(user);
            // if (user && user.userInfo && user.status === 0) {
            //     // store user details and jwt token in local storage to keep user logged in between page refreshes
            //     localStorage.setItem('app-token', JSON.stringify(user.userInfo));
            //     this.appTokenSubject.next(user.userInfo);

            // }
            return user;
        }));
            //  return this.http.post<any>(environment.apiUrl+'/Authenticate/Login', loginInfo, { headers: this.header })
    }
    refreshToken(refreshTokenModel: any){
        return this.http.post(`${environment.apiUrl}${this.version}/Authenticate/Refresh`, refreshTokenModel);
    }

    logout() {
        localStorage.clear();
        this.appTokenSubject.next(null);
    }
}