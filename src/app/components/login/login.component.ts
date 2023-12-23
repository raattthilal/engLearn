import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { SuccessAlertService } from 'src/app/success-alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private router: Router, private authentication:AuthenticationService, private successAlertService: SuccessAlertService){
    }
    login = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  
    forgetPassword = new FormGroup({
      username: new FormControl('',Validators.required)
    })

    register = new FormGroup({
      firstName: new FormControl('',[Validators.required,Validators.minLength(3)]),
      lastName: new FormControl('',[Validators.required,Validators.minLength(3)]),
      phone: new FormControl('',[Validators.required,Validators.minLength(10)]),
      email: new FormControl('',Validators.email),
      password: new FormControl('',[Validators.required,Validators.minLength(5)]),
    })
  ngOnInit() {
    const token = localStorage.getItem('token');
      if(token?.length){
        this.router.navigate(['/home'])
      }
  }
  
forget(){
  if(this.forgetPassword.valid){    
    this.authentication.forgetPass(this.forgetPassword.value).subscribe(res=>{
      if(res.success){
        this.successAlertService.showSuccess(res.message);
      }
    })
  }
}
  submit() {
    if(this.login.valid){
      this.authentication.login(this.login.value).subscribe(res=>{
        if(res?.success==true && res?.token){
          localStorage.setItem('token',res.token);
          localStorage.setItem('role',res.user?.role);
          localStorage.setItem('id',res.user?.id);
          if(res.user.role === 'LEARNER'){
            this.router.navigate(['/home']);
          }else{
            this.router.navigate(['/dashboard'])
          }
        }else{
          this.successAlertService.showSuccess(res.message);
          this.login.reset();
        }
        
      });    
    }
  }

  signup(){
    if(this.register.valid){
    //bind signup API
      this.authentication.signup(this.register.value).subscribe(res=>{
       if(res?.success){
         this.successAlertService.showSuccess(res.message);
         this.register.reset();
       }else{
        this.successAlertService.showSuccess(res.message);
        this.register.reset();
       }
      })
    }else{
      this.successAlertService.showSuccess('Invalid Form');
    }
  }
}