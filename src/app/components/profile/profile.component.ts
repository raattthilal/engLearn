import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { SuccessAlertService } from 'src/app/success-alert.service';
import { QuestionService } from 'src/app/question.service';
import { CertificateService } from 'src/app/certificate.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  constructor(private router: Router,private userService: UserService,private successAlertService: SuccessAlertService,private questionService:QuestionService,private certif: CertificateService){}
  id= '';
  paymentStatus='';
  public initalValues:any;
  certificateUrl = '';
  title='';
  result={
    result:'',
    totalscore:''
  }
  currentYear!: number;
  updateData = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
  })
  resetPassword = new FormGroup({
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
  })
  
  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.id=localStorage.getItem('id')??'';
    this.userService.getUserById(this.id).subscribe(res=>{
      if(res.success){
        this.updateData.setValue({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          phone: res.data.phone,
          email: res.data.email
        });
        this.paymentStatus=res.data.paymentStatus;
        this.initalValues = this.updateData.value;
      }
    })
    this.getResult();
  }
  getResult(){
    this.questionService.getResult().subscribe(res=>{
      if(res.success){
        this.result=res.data;
        this.certif.getCertificate().subscribe(res=>{
          if(res.success){
            this.certificateUrl=res.data.url;
            this.title = res.data.title
          }
        })
      }
    })
  }
  logOut(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }
  resetPass(){
    if(this.resetPassword.valid){
      this.userService.resetPass(this.id,this.resetPassword.value).subscribe(res=>{
        if(res.success){
          this.successAlertService.showSuccess(res.message);
        }else{
          this.successAlertService.showSuccess(res.message);
        }
        this.resetPassword.reset();
      })
    }
  }
  update(){
    if(this.initalValues != this.updateData.value){
      this.userService.updateUser(this.id,this.updateData.value).subscribe(res=>{
        if(res.success){
          this.successAlertService.showSuccess(res.message);
          this.router.navigate(['/home']);
        }
      })
    }
  }
}
