import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first, catchError, retry } from 'rxjs/operators';
import { AlertService,  AuthenticationService } from '../_services';
import { MedicalserviceService } from '../_services/medicalservice.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ContactusByuser } from '../_models/contactusbyuser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
contactForm: FormGroup;
loading = false;
submitted = false;
contact = ContactusByuser;

constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private medicalService: MedicalserviceService,
    private alertService: AlertService,
    private http: HttpClient
) {
    // redirect to home if already logged in
    /*if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/']);
    }*/
}

ngOnInit() {
    this.contactForm = this.formBuilder.group({
        name: ['', Validators.required],
        emailId: ['', Validators.required],
        phonenumber: ['', Validators.required],
        message: ['', [Validators.required, Validators.minLength(2)]],
    });
}


// convenience getter for easy access to form fields
  get f() { return this.contactForm.controls; }

onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.contactForm.invalid) {
       return;
    }

    alert("in submit3");
    this.loading = true;

    alert(JSON.stringify(this.contactForm.value));


    this.medicalService.contactusByuser(this.contactForm.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Contact form submitted successful', true);
                this.router.navigate(['/home']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
}
}