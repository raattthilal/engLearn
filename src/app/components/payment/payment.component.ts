import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { SuccessAlertService } from 'src/app/success-alert.service';
import { SettingsService } from 'src/app/settings.service';
declare var Razorpay: any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})

export class PaymentComponent implements OnInit {
   userid = '';
   paymentStatus!:string;
   prefill = {
    name:'',
    phone:'',
    email:''
  }
  amount!:number;
  constructor(private router: Router,private userService:UserService,private successAlertService: SuccessAlertService,private setting: SettingsService){}
  logOut(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  ngOnInit() {
    this.paymentStatus = localStorage.getItem('payment')??'PENDING';
    this.userid = localStorage.getItem('id') ?? '';
    this.prefill.email = localStorage.getItem('email') ?? '';
    this.prefill.name = localStorage.getItem('name') ?? '';
    this.prefill.phone = localStorage.getItem('phone') ?? '';
    this.setting.getSettings().subscribe(res=>{
      if(res.success){
        this.amount = res.data.feesAmount;
      }
    })
  }

 
  payNow(){
    const razorpayOptions={
      description: 'Purchase Course',
      currency: 'INR',
      amount: this.amount*100,
      name:`Let's Talk English`,
      key:'rzp_test_hA91y8eiLIPlNl',
      image:'../../../assets/logo.jpeg',
      prefill:this.prefill,
      theme:{
        color:'#162472'
      },
      modal: {
        ondismiss : () => {
          console.log('dismissed')
        },
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      handler:(res:any)=>{
        console.log(res);
        let update={
          verified:true,
          paymentId:res.razorpay_payment_id
        }
        this.userService.updateUser(this.userid,update).subscribe(res=>{
          console.log(res);
          if(res.success){
            this.successAlertService.showSuccess("Payment Successfull. Thank you");
            localStorage.setItem('payment',"PAID")
          }
        })
        this.router.navigate(['/course-content'])
      }
    }
  
    const successCallback = (payment_id:any)=>{
      console.log("payment_id:"+payment_id);
    }
    const failureCallback = (e:any)=>{
      console.log(e);
    } 
    if(this.paymentStatus=='PAID'){
      this.router.navigate(['/course-content'])
    }else{
      Razorpay.open(razorpayOptions, successCallback, failureCallback)
    }

}
  // createRzpayOrder(data:any) {
  //   console.log(data);
  //   // call api to create order_id
  //   const order_id='12xx'
  //   this.payWithRazor(order_id);
  // }

  // payWithRazor(val:any) {

  //   const options: any = {
  //     key: 'rzp_test_NUASEzphbNqdHj',
  //     amount: 100, // amount should be in paise format to display Rs 1255 without decimal point
  //     currency: 'INR',
  //     name: '', // company name or product name
  //     description: '',  // product description
  //     image: './assets/logo.png', // company logo or product image
  //     order_id: val, // order_id created by you in backend
  //     modal: {
  //       // We should prevent closing of the form when esc key is pressed.
  //       escape: false,
  //     },
  //     notes: {
  //       // include notes if any
  //     },
  //     theme: {
  //       color: '#0c238a'
  //     }
  //   };

  //   options.handler = ((response:any, error:Error) => {

  //     options.response = response;

  //     console.log(response);

  //     console.log(options);

  //     // call your backend api to verify payment signature & capture transaction

  //   });

  //   options.modal.ondismiss = (() => {

  //     // handle the case when user closes the form while transaction is in progress

  //     console.log('Transaction cancelled.');

  //   });

  //   const rzp = new this.winRef.nativeWindow.Razorpay(options);

  //   rzp.open();

  // }
}