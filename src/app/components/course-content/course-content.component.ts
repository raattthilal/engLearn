import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css']
})
export class CourseContentComponent implements OnInit{
  userPaymentStatus!:string;

  constructor(private router: Router){}
  ngOnInit(): void {
   this.userPaymentStatus = localStorage.getItem('payment') ?? 'PENDING';
    if(this.userPaymentStatus!='PAID'){
      this.router.navigate(['/payment'])
    }
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
