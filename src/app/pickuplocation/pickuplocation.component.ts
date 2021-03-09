import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService, UserService } from '../_services';

@Component({
  selector: 'app-pickuplocation',
  templateUrl: './pickuplocation.component.html',
  styleUrls: ['./pickuplocation.component.css']
})
export class PickuplocationComponent implements OnInit {

  pickuplocationComponent: FormGroup;
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
    this.pickuplocationComponent = this.formBuilder.group({
      pickupaddressLine1: ['', Validators.required],
      pickupaddressLine2: ['', Validators.required],
      pickupzipcode: ['', [Validators.required, Validators.minLength(7)]],
      pickupcity: ['', Validators.required],
      pickupcountry: ['',Validators.required]
    });
}

  // convenience getter for easy access to form fields
  get f() { return this.pickuplocationComponent.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.pickuplocationComponent.invalid) {
          return;
      }

      this.loading = true;
      this.userService.register(this.pickuplocationComponent.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.alertService.success('Pickup location Component successful', true);
                  this.router.navigate(['/droplocation']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }
}

