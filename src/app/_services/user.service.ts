import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import { config, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    private baseUrl = 'http://localhost:57263/springboot-medical-rest/api/medical';

  
    getEmployee(id: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/${id}`);
    }
  

    getAll() {
        return this.http.get<User[]>(`${this.baseUrl}/users`);
    }

    register(user: User) {
        return this.http.post(`${this.baseUrl}/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.baseUrl}/users/${id}`);
    }


          /* User creation methods  */
      getUser(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`);
      }
    
      createUser(userregister: User): Observable<Object> {
        alert("create user in api");
        return this.http.post(`${this.baseUrl}/user`, userregister);
      }
    
      updateUser(id: number, value: any): Observable<Object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
      }
    
      deleteUser(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
      }
    
      getUsersList(): Observable<any> {
        return this.http.get(`${this.baseUrl}`);
      }
}