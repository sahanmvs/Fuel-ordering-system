import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderCreationService } from './order-creation.service';

@Component({
  selector: 'fo-order-creation',
  templateUrl: './order-creation.component.html',
  styleUrls: ['./order-creation.component.scss']
})
export class OrderCreationComponent implements OnInit {

  alert: boolean = false;
  errAlert: boolean = false;
  uniqueKey: any
  errMessage: any 

  order = new FormGroup({
    NIC: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    amount: new FormControl('', [
      Validators.required,
    ])
  });

  constructor(private orderCreationService: OrderCreationService) { }

  ngOnInit(): void {
  }

  createOrder() {
      //console.log(this.order.value);
    this.orderCreationService.createOrder(this.order.value)
            .subscribe({
              next: data => {
                console.log(data);
                this.uniqueKey = data;
                this.alert = true;
                this.order.reset();
              },
              error: err => {
                console.log(err);
                this.errMessage = err;
                this.errAlert = true;
                this.order.reset()   
              }
            })
                // .subscribe((res) => {
                //   console.log(res);
                //   this.uniqueKey = res;
                //   this.alert = true;
                //   this.order.reset();
                // });
  }

  closeAlert() {
    this.alert = false;
  }

  closeErrAlert() {
    this.errAlert = false;
  }

  get NIC() { return this.order.get('NIC'); }

  get amount() { return this.order.get('amount'); }

}
