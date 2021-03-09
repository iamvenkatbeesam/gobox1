import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';

import { AuthenticationService } from '../_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate1(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // authorised so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<boolean> {
        return this.authenticationService.isLoggedIn         // {1}
          .pipe(
            take(1),                              // {2} 
            map((isLoggedIn: boolean) => {         // {3}
              if (!isLoggedIn){
                this.router.navigate(['/login']);  // {4}
                return false;
              }
              return true;
            })
          )
      }


}