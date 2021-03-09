import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "../employee.service";
import { Router } from '@angular/router';
import { HelloWordService } from '../_services/hello-word.service';
import { AlertService, AuthenticationService } from '../_services';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private helloWorldService: HelloWordService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

}
