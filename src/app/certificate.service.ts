import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private http:HttpClient) { }

  createCertificate(){
    return this.http.post<any>(`5000/certificates/create/`,{})
  }

  getCertificate(){
    return this.http.get<any>('5000/certificates/get/');
  }
}

