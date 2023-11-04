import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var Razorpay: any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})

export class PaymentComponent implements OnInit {
   prefill = {
    name:'',
    phone:'',
    email:''
  }
  constructor(private router: Router){}
  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  ngOnInit() {
    this.prefill.email = localStorage.getItem('email') ?? '';
    this.prefill.name = localStorage.getItem('name') ?? '';
    this.prefill.phone = localStorage.getItem('phone') ?? '';
  }

 
  payNow(){
    const razorpayOptions={
      description: 'Purchase Course',
      currency: 'INR',
      amount: 10000,
      name:'Lets Talk English',
      key:'rzp_test_NUASEzphbNqdHj',
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
        this.router.navigate(['/home'])
      }
    }
  
    const successCallback = (payment_id:any)=>{
      console.log(payment_id);
    }
    const failureCallback = (e:any)=>{
      console.log(e);
    } 
    Razorpay.open(razorpayOptions, successCallback, failureCallback)

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