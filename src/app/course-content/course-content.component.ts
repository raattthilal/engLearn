import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css']
})
export class CourseContentComponent implements OnInit{
  userPaymentStatus = 'NotPaid';

  constructor(private router: Router){}
  ngOnInit(): void {
   this.userPaymentStatus = localStorage.getItem('userPaymentStatus') ?? 'NotPaid';
    // if(this.userPaymentStatus==='NotPaid'){
    //   this.router.navigate(['/payment'])
    // }
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }
}
