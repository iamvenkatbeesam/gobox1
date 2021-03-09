import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService, AuthenticationService, UserService } from '../_services';

@Component({
  selector: 'app-paymenttypeselection',
  templateUrl: './paymenttypeselection.component.html',
  styleUrls: ['./paymenttypeselection.component.css']
})
export class PaymenttypeselectionComponent implements OnInit {

  paymenttypeselectionComponent: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private userService: UserService,
      private alertService: AlertService
  ) {
      
  }

  ngOnInit() {
      this.paymenttypeselectionComponent = this.formBuilder.group({
        credit_debit_card: ['', Validators.required],
        cash: ['']
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.paymenttypeselectionComponent.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.paymenttypeselectionComponent.invalid) {
          return;
      }

      this.loading = true;
      this.userService.register(this.paymenttypeselectionComponent.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.alertService.success('paymenttypeselectionComponent successful', true);
                  this.router.navigate(['/droplocation']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }
}
