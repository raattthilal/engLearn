import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/settings.service';
import { SuccessAlertService } from 'src/app/success-alert.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  constructor(private router: Router,private settingservice:SettingsService,private successAlertService: SuccessAlertService,){
  }
  id!:string;
  public initialValues:any;
  settings = new FormGroup({
    feesAmount: new FormControl(''),
    passPercentage: new FormControl('')
  })
  ngOnInit(): void {
    this.settingservice.getSettings().subscribe(res=>{
      if(res.success){
        this.settings.setValue({
          feesAmount : res.data.feesAmount,
          passPercentage: res.data.passPercentage
        })
        this.initialValues = this.settings.value;
        this.id = res.data.id;
      }
    })
  }
  update(){
    if(this.initialValues != this.settings.value){
      this.settingservice.updateSettings(this.id,this.settings.value).subscribe(res=>{
        if(res.success){
          this.successAlertService.showSuccess(res.message);
          this.router.navigate(['/dashboard'])
        }else{
          this.successAlertService.showSuccess(res.message);
        }
      })
    }
  }
  logOut(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}