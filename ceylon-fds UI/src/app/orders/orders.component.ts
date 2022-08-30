import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { Order } from './Orders.model';

@Component({
  selector: 'fd-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders!: Order[];
  private _filter: string = '';
  filteredOrders!: Order[];

  set filter(value: string) {
    this._filter = value;
    this.filterByNIC();
  }

  get filter() {
    return this._filter;
  }

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe({
      next: data => {
        this.orders = data;
        console.log(this.orders);
        this.filteredOrders = data;
      }
    })
  }

  filterByNIC() {
    this.filteredOrders = this.orders.filter(order => order.NIC.includes(this._filter));
  }

}
