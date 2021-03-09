import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class RequestOrderSuccessDetailsHistory {
 

     productDescription: string;
	 pickUpAddress: string;
	 dropUpAddress: string;
	 status: string;
	 productType: string;
    
    constructor(private http: HttpClient) { }

}
