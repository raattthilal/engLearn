import { Component, OnInit } from '@angular/core';
import { SuccessAlertService } from '../success-alert.service';

@Component({
  selector: 'app-success-alert',
  templateUrl: './success-alert.component.html',
  styleUrls: ['./success-alert.component.css']
})
export class SuccessAlertComponent implements OnInit {
  successMessage!: string | null;

  constructor(private successAlertService: SuccessAlertService) {}

  ngOnInit() {
    this.successAlertService.getSuccessAlert().subscribe(message => {
      this.successMessage = message;
    });
  }

  dismissAlert() {
    this.successAlertService.showSuccess('');
  }
}
