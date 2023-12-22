import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  constructor(private router: Router){
  }
  settings = new FormGroup({
    amount: new FormControl(''),
  })
  ngOnInit(): void {
   this.settings.setValue({amount:"100"})
  }
  update(){
    if(this.settings.valid){
      alert("Updated")
      this.router.navigate(['/dashboard'])
    }
  }
  logOut(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}