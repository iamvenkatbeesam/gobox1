import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class HelloWordService {

  constructor(private http: HttpClient) { }

  //Here getting Greeting from Backend project using URL
     // helloWorldService() {
        //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('javaguides' + ':' + 'password') });
     //   return this.http.get<Message>('http://localhost:57263/gobox-rest/api/medical/greeting');
     // }
}
