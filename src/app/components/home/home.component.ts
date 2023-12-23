import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router,private userService:UserService){
  }
  userPaymentStatus = '';
  userverified = false;
  currentYear!: number;
  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    let id = localStorage.getItem('id');
    this.userService.getUserById(id).subscribe(res=>{
      if(res.success){
          localStorage.setItem('payment',res.data?.paymentStatus);
          localStorage.setItem('name',res.data?.firstName+res.data?.lastName);
          localStorage.setItem('email',res.data?.email);
          localStorage.setItem('phone',res.data?.phone);
        this.userverified = res.data.verified ?? false
      }
    })
   this.userPaymentStatus = localStorage.getItem('payment') ?? 'PENDING';

  }
  
  logOut(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }

  beginOrPayment(){
    if(this.userPaymentStatus==='PAID' && this.userverified){
      this.router.navigate(['/course-content'])
    }else{
      this.router.navigate(['/payment'])
    }
  }
}
