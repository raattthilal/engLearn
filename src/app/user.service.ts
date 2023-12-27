import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUserById(id:any){
    return this.http.get<any>(`5000/user/get/${id}`)
  }
  deleteUser(id:any){
    return this.http.delete<any>(`5000/user/delete/${id}`)
  }
  updateUser(id:string,body:any){
    return this.http.put<any>(`5000/user/update/${id}`,body);
  }
  resetPass(id:string,body:any){
    return this.http.put<any>(`5000/user/resetpassword/${id}`,body);
  }

  listAllusers(){
    return this.http.get<any>('5000/user/list/')
  }
}
