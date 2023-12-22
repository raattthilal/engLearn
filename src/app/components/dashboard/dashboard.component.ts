import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router,private userServ:UserService){
  }
  users:any=[];
  totalUser=0;
  paidUser:any=[];
  ngOnInit(): void {
   console.log("welcome admin");
   this.userServ.listAllusers().subscribe(res=>{
    if(res.success){
      this.users = res.data;
      this.totalUser=res.data.length ?? 0;
      this.paidUser = this.users.filter((user: { paymentStatus: string; }) => user.paymentStatus=="PAID")
    }
   })
  }
  logOut(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
