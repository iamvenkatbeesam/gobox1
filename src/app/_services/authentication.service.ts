import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models';
import { AppComponent } from '../app.component';
import { UserLogin } from '../_models/UserLogin';
import { UserInfoDsiplayService } from '../_services/userInfoDisplay';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
 
 private baseUrl = 'https://localhost:443/gobox-rest/api/medical';

   private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  public get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(
        private http: HttpClient,
        private userinfoDisplay: UserInfoDsiplayService,
        ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();       
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
/*
    login(username, password) {
        return this.http.post<any>(`${this.baseUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
*/

/**  Follwing for the login and logout methods code */

 USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

 public username: String;
 public password: String;
 
 authenticationService(username: String, password: String, userLogin: UserLogin) {
   // return this.http.post(`http://localhost:57263/gobox-rest/api/medical/basicauth`,
   return this.http.post(`${this.baseUrl}/users/authenticate`, userLogin,
     { 
       headers: { authorization: this.createBasicAuthToken(username, password) } 
     }).pipe(map((res) => {
       this.username = username;
       this.password = password;
       //alert(JSON.stringify(res));
       this.registerSuccessfulLogin(res, username, password);
                    
     }));
 }


 createBasicAuthToken(username: String, password: String) {
   return 'Basic ' + window.btoa(username + ":" + password)
 }

 registerSuccessfulLogin(res, username, password) {

   sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
   localStorage.setItem('currentUser', JSON.stringify(username));

   AppComponent.isLoginValue = true;

   this.loggedIn.next(true);
   this.currentUserSubject.next(res);

   this.userinfoDisplay.username = res.firstName+" "+res.lastName;
   this.userinfoDisplay.phonenumber = res.phoneNumber;
   this.userinfoDisplay.emailId = res.emailId;

 }

 logout() {

  //alert("Inside logout1");
  console.log("check1"+JSON.stringify(this.username));

   AppComponent.isLoginValue = false;

   sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
   this.username = null;
   this.password = null;

   localStorage.removeItem('currentUser');
   this.loggedIn.next(false);
  this.currentUserSubject.next(null);
  
  
 }

 isUserLoggedIn() {
   let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
   if (user === null) return false
   return true
   
 }

 getLoggedInUserName() {
   let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
   if (user === null) return ''
   return user
 }


}
