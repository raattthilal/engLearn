import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  constructor(private router: Router,private userService: UserService){}
  id= '';
  paymentStatus='';
  public initalValues:any;

  updateData = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
  })
 
  
  ngOnInit(): void {
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
  }
  logOut(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }
  update(){
    if(this.initalValues != this.updateData.value){
      this.userService.updateUser(this.id,this.updateData.value).subscribe(res=>{
        if(res.success){
          alert("Updated");
          this.router.navigate(['/home']);
        }
      })
    }
  }
}
