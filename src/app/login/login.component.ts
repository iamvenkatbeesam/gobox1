import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, AuthenticationService } from '../_services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    errorMessage = 'Invalid Credentials';
    successMessage: string;
    invalidLogin = false;
    loginSuccess = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private toastr: ToastrService
        
    ) {
        // redirect to home if already logged in
        /*if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }*/
    }
    
    
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        
        this.submitted = true;
        // reset alerts on submit
        this.alertService.clear();
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        
       
        
        //this.loading = true;
        this.authenticationService.authenticationService(this.f.username.value, this.f.password.value, this.loginForm.value)
            .subscribe(
                (result) => {
                    //this.router.navigate([this.returnUrl]);
                    this.invalidLogin = false;
                    this.loginSuccess = true;
                    this.successMessage = 'Login Successful.';
                    this.router.navigate(['/dashboard']);
                    
                },
                error => {
                   // this.alertService.error(error);
                   // this.loading = false;
                     this.invalidLogin = true;
                    this.loginSuccess = false;
                    this.toastr.error('Failed', 'Login');
                });
                
    }
/*
    handleLogin() {
        this.authenticationService.authenticationService(this.username, this.password).subscribe((result)=> {
          this.invalidLogin = false;
          this.loginSuccess = true;
          this.successMessage = 'Login Successful.';
          this.router.navigate(['/hello-world']);
        }, () => {
          this.invalidLogin = true;
          this.loginSuccess = false;
        });      
      }

*/
}
