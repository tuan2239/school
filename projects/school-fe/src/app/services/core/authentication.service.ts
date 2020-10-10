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
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public appTokenSubject: BehaviorSubject<any>;
    public appToken: Observable<any>;
    private header: HttpHeaders;

    private signInMutation: DocumentNode = gql`
        mutation signIn($email: String!, $password: String!){
            signIn(email:$email, password: $password){
                token
            }
        }
    `;
    private signUpMutation: DocumentNode = gql`
        mutation signUp($signUpInput: SignUpInput!){
            signUp(signUpInput: $signUpInput){
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

    public login(loginInfo: any): Observable<MutationResponse> {
        return this.apollo.mutate({
            mutation: this.signInMutation,
            variables: loginInfo
        })
        .pipe(
            map(this.mapUserHandle)
        );
    }
    public register(data: any): Observable<MutationResponse> {
        const registerInfo = {
            signUpInput: data
        };

        return this.apollo.mutate({
            mutation: this.signUpMutation,
            variables: registerInfo
        })
        .pipe(
            map(this.mapUserHandle)
        );
    }
    public refreshToken(refreshTokenModel: any){
        return this.http.post(`${environment.apiUrl}/Authenticate/Refresh`, refreshTokenModel);
    }

    public logout() {
        localStorage.clear();
        this.appTokenSubject.next(null);
    }

    private mapUserHandle(user: any) {
        const token = user?.data?.signIn?.token;
        if (token){
            const helper = new JwtHelperService();
            const data = helper.decodeToken(token);
            localStorage.setItem('app-token', JSON.stringify({...data, token}));
            this.appTokenSubject.next(data);
            return data;
        }
        return user;
    }
}