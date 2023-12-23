import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SuccessAlertService } from 'src/app/success-alert.service';
import { UserService } from 'src/app/user.service';
interface USER {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone:string;
  paymentStatus:string
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  constructor(private router: Router, private userService:UserService,private successAlertService: SuccessAlertService){
  }
  users:USER[]=[];
  filteredUsers:USER[]=[];
  ngOnInit(): void {
   this.userService.listAllusers().subscribe(res=>{
    if(res.success){
      this.users=res.data;
      this.filteredUsers = [...this.users];
    }
   })
  }
  logOut(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }
  delete(id:any){
    this.userService.deleteUser(id).subscribe(res=>{
      if(res.success){
        this.successAlertService.showSuccess(res.message);
        this.ngOnInit();
      }
    })
  }
  sortDirection = 'asc'; // Initial sort direction
  sortKey = 'id'; // Initial sort key

  // Function to filter data based on search input
  filterData(evt: any): void {
    let searchText= evt.target.value;
    this.filteredUsers = this.users.filter(user =>
      user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  // Function to sort data based on a given key
  sortData(key: keyof typeof UserComponent.prototype.users[0]): void {
    this.sortKey = key;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    this.filteredUsers.sort((a, b) => {
      const valueA = a[key].toString().toLowerCase();
      const valueB = b[key].toString().toLowerCase();

      return this.sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    });
  }
}