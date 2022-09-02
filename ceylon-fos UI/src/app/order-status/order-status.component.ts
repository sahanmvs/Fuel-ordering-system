import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderStatusService } from './order-status.service';
import { Order } from './Order.Model';

@Component({
  selector: 'fo-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {

  alert: boolean = false;
  errAlert: boolean = false;
  message: any
  errMessage: any
  confirmAlert: boolean = false;
  confirmErrAlert: boolean = false;

  order = new FormGroup({
    NIC: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    uniqueKey: new FormControl('', [
      Validators.required,
    ])
  });

  confirmOrder = new FormGroup({
    NIC: new FormControl(''),
    amount: new FormControl(''),
    uniqueKey: new FormControl(''),
    status: new FormControl(''),
    time: new FormControl(''),
  });

  constructor(private orderStatusService: OrderStatusService) { }

  ngOnInit(): void {
  }

  checkStatus() {
    this.orderStatusService.checkStatus(this.order.value).subscribe({
      next: data => {
        console.log(data);
        this.message = data;
        this.alert = true;
        this.order.reset();
        
        this.confirmOrder = new FormGroup({
          NIC: new FormControl(this.message.NIC),
          amount: new FormControl(this.message.amount),
          uniqueKey: new FormControl(this.message.uniqueKey),
          status: new FormControl(this.message.status),
          time: new FormControl(this.message.time),
        });
      }, 
      error: err => {
        console.log(err);
        this.errMessage = err;
        this.errAlert = true;
        this.order.reset();
      }
    })
  }

  get NIC() { return this.order.get('NIC'); } // default validation getters
  get uniqueKey() { return this.order.get('uniqueKey'); }

  confirm(data: Order) {
    this.orderStatusService.confirmOrder(data).subscribe({
      next: data => {
        console.log(data);
        this.confirmAlert = true;
      },
      error: err => {
        console.log(err);
        this.confirmErrAlert = true;
      }
    })
  }

  closeAlert() {
    this.alert = false;
  }

  closeErrAlert() {
    this.errAlert = false;
  }
  closeConfirmAlert() {
    this.confirmAlert = false;
    window.location.href = 'checkStatus';
  }
  closeConfirmErrAlert() {
    this.confirmErrAlert = false; 
  }

}
