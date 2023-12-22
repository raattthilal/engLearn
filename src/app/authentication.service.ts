import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }
  token:any = '';
  role:any = '';
  signup(data:any){
    return this.http.post<any>('5000/user/signup',data)
  }

  login(data:any){
    return this.http.post<any>('5000/authenticate/login',data)
  }

    // Example: Check whether the user is authenticated
    isAuthenticated(): boolean {
      this.token = localStorage.getItem('token');
      this.role = localStorage.getItem('role');
      if(this.token && this.role =='LEARNER' ){
        return true;
      }
      return false;
    }

    isAdmin(): boolean {
      this.token = localStorage.getItem('token');
      this.role = localStorage.getItem('role');
      if(this.token && this.role=='SUPERADMIN'){
        return true
      }
      return false;
    }
}
