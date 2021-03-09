import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Payment } from '../_models/payment';
import { MedicalserviceService } from '../_services/medicalservice.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  alertService: any;
  payment: Payment;

  constructor(private http: HttpClient,
    private medicalService: MedicalserviceService,
    ) { }

  ngOnInit(): void {
  }

  chargeCreditCard() {
    let amount = 100
    let form = document.getElementsByTagName("form")[0];
    (<any>window).Stripe.card.createToken({
      number: form.cardNumber.value,
      exp_month: form.expMonth.value,
      exp_year: form.expYear.value,
      cvc: form.cvc.value
    }, (status: number, response: any) => {
      if (status === 200) {
        let token = response.id;

        this.payment.token = response.id;

        alert("token:::"+token);
        

        this.medicalService.chargeCard(token)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success(' Payment successful', true);
                //alert(" Order Request successful:::---"+JSON.stringify(data));
              //  this.historyDetails = data;
               // this.makeRequestSuccessfulLogin(data);
               console.log("payment data::::::"+data);
            },
            error => {
                this.alertService.error(error);
                //this.loading = false;
            });

      } else {
        console.log(response.error.message);
      }
    });
  }
/*
  chargeCard(token: string) {
    const headers = new Headers({'token': token, 'amount': 100});
    this.http.post('http://localhost:8080/payment/charge', {}, {headers: headers})
      .subscribe(resp => {
        console.log(resp);
      })
  }

  */

  
}
