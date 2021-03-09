import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService, UserService } from '../_services';

@Component({
  selector: 'app-droplocation',
  templateUrl: './droplocation.component.html',
  styleUrls: ['./droplocation.component.css']
})
export class DroplocationComponent implements OnInit {

  droplocationComponent: FormGroup;
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
    this.droplocationComponent = this.formBuilder.group({
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.minLength(7)]],
      city: ['', Validators.required],
      country: ['',Validators.required]
    });
}



  // convenience getter for easy access to form fields
  get f() { return this.droplocationComponent.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.droplocationComponent.invalid) {
          return;
      }

      this.loading = true;
      this.userService.register(this.droplocationComponent.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.alertService.success('Drop location Component successful', true);
                  this.router.navigate(['/paymenttypeselection']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }
}

