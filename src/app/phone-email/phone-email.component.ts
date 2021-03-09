import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService, AuthenticationService, UserService } from '../_services';

@Component({
  selector: 'app-phone-email',
  templateUrl: './phone-email.component.html',
  styleUrls: ['./phone-email.component.css']
})
export class PhoneEmailComponent implements OnInit {

  phone_emailForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private alertService: AlertService
  ) {
    
  }

  ngOnInit() {
      this.phone_emailForm = this.formBuilder.group({
          email: ['', Validators.required],
          phonenumber: ['', [Validators.required, Validators.minLength(10)]]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.phone_emailForm.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.phone_emailForm.invalid) {
          return;
      }

      this.loading = true;
      this.userService.register(this.phone_emailForm.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.alertService.success('phone_email successful', true);
                  this.router.navigate(['/droplocation']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }
}
