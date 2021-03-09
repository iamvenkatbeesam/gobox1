import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { Observable } from "rxjs";
import { EmployeeService } from "../employee.service";
import { Employee } from "../employee";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { RequestOrderSuccessDetailsHistory } from '../_services/requestOrderSuccessDetails';
import { MedicalserviceService } from '../_services/medicalservice.service';
import { AlertService } from '../_services';
import { first } from 'rxjs/operators';
import { UserInfoDsiplayService } from '../_services/userInfoDisplay';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  productDescription: string;
  pickUpAddress: string;
  dropUpAddress: string;
  status: string;
  productType: string;

  columnDefs = [
    { field: 'productDescription' },
    { field: 'pickAddress' },
    { field: 'dropAddress'},
    { field: 'status'}
   ];
/*
rowData = [
    { productDescription: 'syringe', pickAddress: 'Sydney', dropAddress: 'Australia', status:'checked' },
    { productDescription: 'thermometre', pickAddress: 'Mexico', dropAddress: 'Los Angels', status:'On The Way' },
    { productDescription: 'medicalGlove', pickAddress: 'Brazil', dropAddress: 'egypt', status:'submitted'},
    { productDescription: 'inhaler', pickAddress: 'Russia', dropAddress: 'Italy', status:'done'},
    { productDescription: 'firstAidKit', pickAddress: 'India', dropAddress: 'Delhi', status:'pending'}
  ];
*/


  //employees: Observable<Employee[]>;
  historyDetails: Observable<RequestOrderSuccessDetailsHistory[]>;
  emailId: string;

  constructor(private employeeService: EmployeeService,
    private router: Router,
    private requestOrderSuccessDetailsHistory: RequestOrderSuccessDetailsHistory,
    private medicalService: MedicalserviceService,
    private alertService: AlertService,
    private userinfoDisplay: UserInfoDsiplayService,


    ) {
    
    /*  this.productDescription =  requestOrderSuccessDetailsHistory.productDescription;
      this.pickUpAddress =  requestOrderSuccessDetailsHistory.pickUpAddress;
      this.dropUpAddress =  requestOrderSuccessDetailsHistory.dropUpAddress;
      this.status =  requestOrderSuccessDetailsHistory.status;
      this.productType =  requestOrderSuccessDetailsHistory.productType;
*/
    this.emailId = this.userinfoDisplay.emailId;

    }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
   // this.requestOrderSuccessDetailsHistory = this.requestOrderSuccessDetailsHistory
    //this.employees = this.employeeService.getEmployeesList();
    //this.historyDetails = this.employeeService.getEmployeesList();

    //alert(this.emailId);
    this.medicalService.getRequestHistoryDetailsList(this.emailId)
    .pipe(first())
    .subscribe(
        data => {
            this.alertService.success(' Order Request successful', true);
            //alert(" Order Request successful:::---"+JSON.stringify(data));
            this.historyDetails = data;
           // this.makeRequestSuccessfulLogin(data);
        },
        error => {
            this.alertService.error(error);
            //this.loading = false;
        });
    
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  employeeDetails(id: number){
    this.router.navigate(['details', id]);
  }
}
