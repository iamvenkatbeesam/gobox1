import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicalserviceService } from '../_services/medicalservice.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../_services';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../_models';
import { UserInfoDsiplayService } from '../_services/userInfoDisplay';
import { RequestOrderSuccessDetailsHistory } from '../_services/requestOrderSuccessDetails';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-makerequest',
  templateUrl: './makerequest.component.html',
  styleUrls: ['./makerequest.component.css']
})
export class MakerequestComponent implements OnInit {
 // [x: string]: any;
  isSubmitted=false;
  payment_selection:FormGroup
  pick_address:FormGroup;
  userrequestforproduct__makerequest:FormGroup;
  drop_address:FormGroup;
  // payment:FormGroup;
  submitted = false;
  check = false;
  verify = false;
  // registered = false;
  public newData:any;
  //public currentUserValue: Observable<User>;
  username : string;
  emailId : string;
  phonenumber : string;
  
   stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden
   };
  

  constructor(private formBuilder: FormBuilder,
    private ngWizardService: NgWizardService,
    private medicalService: MedicalserviceService,
    private alertService: AlertService,
    private userinfoDisplay: UserInfoDsiplayService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    
    private requestOrderSuccessDetailsHistory: RequestOrderSuccessDetailsHistory
   ) {

     this.emailId = this.userinfoDisplay.emailId;
     this.phonenumber = this.userinfoDisplay.phonenumber;
     this.username = this.userinfoDisplay.username;

    /*
    For user values to show on dashaborad from authentication service
    this.currentUserValue.subscribe((receiveObjectHere) => {
      alert(JSON.stringify(receiveObjectHere));
    });
    */ 
  }

  ngOnInit(): void {

      // First get the product id from the current route.
      const routeParams = this.route.snapshot.paramMap;
      const productIdofRequestType = Number(routeParams.get('id'));  

   this.userrequestforproduct__makerequest = this.formBuilder.group({
      //userId:[''],
     // pickupAddressId:['' ],
     // dropAddressId:['' ],
     // paymentId:[''],
      productType:[productIdofRequestType,Validators.required],
      productDes:['',Validators.required],
      emailId: [this.userinfoDisplay.emailId]
      
    });
     this.pick_address = this.formBuilder.group({
      
      pick_addressLine1:['',Validators.required],
      pick_addressLine2:['',Validators.required],
      pick_city:['',Validators.required],
      pick_county:['',Validators.required],
      pick_country:['',Validators.required],
      pick_postcode:['',Validators.required]

     });
     this.drop_address = this.formBuilder.group({
      
      drop_addressLine1:['',Validators.required],
      drop_addressLine2:['',Validators.required],
      drop_city:['',Validators.required],
      drop_county:['',Validators.required],
      drop_country:['',Validators.required],
      drop_postcode:['',Validators.required]

     });

    //  this.payment = this.formBuilder.group({
      
    //    creditcard:['',Validators.required],
    //    debitcard:['',Validators.required],
    //    upi:['',Validators.required]
    //  });

     this.payment_selection = this.formBuilder.group({
      paymentType: ['', Validators.required]
     })

   }


   config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    toolbarSettings: {
     toolbarExtraButtons: [
        { text: 'Finish', class: 'btn btn-info', event: () => { 

         let settings = Object.assign(this.userrequestforproduct__makerequest.value, this.pick_address.value, 
                                      this.drop_address.value, this.payment_selection.value, this.formData.value);
         console.log(settings)
         console.log(this.userrequestforproduct__makerequest.value,
                     this.pick_address.value,
                     this.drop_address.value,
                      this.payment_selection.value,
                    );                   
                    //Calling the MEdicalService Class to Post API
                    this.medicalService.makeRequestFormSubmit(settings)
                    .pipe(first())
                    .subscribe(
                        data => {
                            this.alertService.success(' Order Request successful', true);
                           // alert(" Order Request successful:::---"+JSON.stringify(data));
                            this.makeRequestSuccessfulLogin(data);
                          
                            this.toastr.success('Submitted Successfully', 'Request');
                        },
                        error => {
                            this.alertService.error(error);
                            //this.loading = false;
                            this.userrequestforproduct__makerequest.reset();
                            this.pick_address.reset();
                            this.drop_address.reset();
                            this.payment_selection.reset();
                            this.toastr.error('Failed', 'Request');
                        });
                   
                   }}
     ],
    }
  };
  makeRequestSuccessfulLogin(data) {

    this.requestOrderSuccessDetailsHistory.productDescription = data.productDescription;
    this.requestOrderSuccessDetailsHistory.pickUpAddress = data.pickUpAddress;
    this.requestOrderSuccessDetailsHistory.dropUpAddress = data.dropUpAddress;
    this.requestOrderSuccessDetailsHistory.status = data.status;
    this.requestOrderSuccessDetailsHistory.productType = data.productType;

   // this.router.navigate(['/history']);
  }

 get myForm() {  
    return this.payment_selection.get("payment");
  }
  get formData(){
    return this.userrequestforproduct__makerequest.controls;
   }
    get addressform(){
     return this.pick_address.controls;
    }

    get contactform(){
     return this.drop_address.controls;
    }

  //  get paymentform(){
  //   return this.payment.controls;
  //  }
   showPreviousStep(event?: Event) {
     this.ngWizardService.previous();
   }
 
   showNextStep(event?: Event) {
     this.ngWizardService.next();
   }
 
    resetWizard(event?: Event) {
      this.ngWizardService.reset();
    }
 
   setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
   }
  
   stepChanged(args: StepChangedArgs) { 
   }
 
  isValidTypeBoolean: boolean = true;
  
  isValidFunctionReturnsBoolean(args: StepValidationArgs,form:any) {
    
    this.submitted = true;
    if(this.userrequestforproduct__makerequest.invalid){
      return;
    }
    return true;
    
  }
   isaddressformvalid(args: StepValidationArgs,form:any) {
     console.log(form);
    this.check = true;
     if(this.pick_address.invalid){
       return;
     }
     return true;
    
   }

   iscontactdetailsformvalid(args: StepValidationArgs,form:any) {
     console.log(form);
     this.verify = true;
     if(this.drop_address.invalid){
       return;
     }
     return true;
    
   }

  // ispaymentdetailsformvalid(args: StepValidationArgs,form:any) {
  //   console.log(form);
  //   this.registered = true;
  //   if(this.payment.invalid){
  //     return;
  //   }
  //   return true;
    
  // }
 
   isValidFunctionReturnsObservable(args: StepValidationArgs) {
     return of(true);
   }

   

}
