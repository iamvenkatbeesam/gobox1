import { Component } from '@angular/core';

import { AuthenticationService } from './_services';
import { User } from './_models';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gobox';

    currentUser: User;
    isLogin: boolean;
    static isLoginValue: boolean;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        this.isLogin = false;
    }   

  isLoggedIn$: Observable<boolean>;   
  
  ngOnInit() {
    

    let username = localStorage.getItem('currentUser');
    if(username !== "" && username !== null){
        AppComponent.isLoginValue = true;
        this.router.navigate(['/dashboard']);
    }
    else{
        AppComponent.isLoginValue = true;
        this.router.navigate(['/login']);
    }

    this.isLoggedIn$ = this.authenticationService.isLoggedIn;
  }               

    get staticIsLoggedValue(){
      return AppComponent.isLoginValue;
    }


   onLogout() {
        this.authenticationService.logout();
       // AppComponent.isLoginValue = false;
      this.router.navigate(['/home']);
    }
}
