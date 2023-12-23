import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http:HttpClient) { }

  getSettings(){
    return this.http.get<any>(`5000/settings/get/`)
  }

  updateSettings(id:string,body:any){
    return this.http.put<any>(`5000/settings/update/${id}`,body);
  }
}

