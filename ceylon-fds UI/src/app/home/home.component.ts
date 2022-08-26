import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'fd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  loadOrders() {
    this.router.navigate(['/orders'])
  }

  loadDispatches() {
    this.router.navigate(['/dispatch'])
  }

}
