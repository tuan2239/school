import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/core/authentication.service';

@Injectable({ providedIn: 'root' })
export class ReLoginGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const appToken = this.authenticationService.appTokenValue;
        if (appToken && appToken.id) {
            this.router.navigate([state.url]);
            return false;
        }
        return true;
    }
}