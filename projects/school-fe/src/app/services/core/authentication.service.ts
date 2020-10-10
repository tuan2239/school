import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@environment';
import { setToken } from '@webapp-helpers/token.helper';
import { Apollo } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MutationResponse } from './../../interfaces/query';
import { UtilsService } from './utils.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
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
    }


    public login(loginInfo: any): Observable<MutationResponse> {
        return this.apollo.mutate({
            mutation: this.signInMutation,
            variables: loginInfo
        })
        .pipe(
            map((resp: any) => this.mapUserHandle(resp, resp?.data?.signIn?.token))
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
            map((resp: any) => this.mapUserHandle(resp, resp?.data?.signUp?.token))
        );
    }
    public refreshToken(refreshTokenModel: any){
        return this.http.post(`${environment.apiUrl}/Authenticate/Refresh`, refreshTokenModel);
    }

    public logout() {
        localStorage.clear();
    }

    private mapUserHandle(resp: any, token: any) {
        if (token){
            const helper = new JwtHelperService();
            const data = helper.decodeToken(token);
            setToken({...data, token});
            return data;
        }
        return resp;
    }
}