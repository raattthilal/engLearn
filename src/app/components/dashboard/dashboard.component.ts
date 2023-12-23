import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/question.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router,private userServ:UserService,private quest: QuestionService){
  }
  users:any=[];
  totalUser=0;
  paidUser:any=[];
  totalQuestions=0;
  ngOnInit(): void {
   console.log("welcome admin");
   this.userServ.listAllusers().subscribe(res=>{
    if(res.success){
      this.users = res.data;
      this.totalUser=res.data.length ?? 0;
      this.paidUser = this.users.filter((user: { paymentStatus: string; }) => user.paymentStatus=="PAID")
    }
   })
   this.quest.getAllQuestions().subscribe(res=>{
    if(res.success){
      this.totalQuestions= res.data.length;
    }
   })
  }
  logOut(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
