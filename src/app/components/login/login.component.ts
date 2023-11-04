import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private router: Router){
    }
    login = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  

    register = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    })
  ngOnInit() {
    const token = localStorage.getItem('token');
      if(token?.length){
        this.router.navigate(['/home'])
      }
  }

  submit() {
    if(this.login.valid){
      console.log(this.login.value);
      
      localStorage.setItem('token','xyz')
      //bind API call
      alert("Login Successfully!!")
      this.router.navigate(['/home'])
    }
  }
  signup(){
    if(this.register.valid)
    console.warn(this.register.value);
    //bind signup API
  }
}
