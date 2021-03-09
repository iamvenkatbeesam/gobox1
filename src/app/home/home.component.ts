import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelloWordService } from '../_services/hello-word.service';
import { AlertService, AuthenticationService } from '../_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 // message: string;
  
  constructor(private helloWorldService: HelloWordService,
      private authenticationService: AuthenticationService,) { }

  ngOnInit() {

  /*  console.log("HelloWorldComponent");
    this.helloWorldService.helloWorldService().subscribe( (result) => {
      this.message = result.content;
    });
  */

   /* this.authenticationService.getLoggedInUserName().subscribe( (result) => {
       this.message = result.content;
    });
   */ 

  }
}