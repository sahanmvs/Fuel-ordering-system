import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'fo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  createOrder() {
    this.router.navigate(['createOrder']);
  }

  checkStatus() {
    this.router.navigate(['checkStatus']);
  }

}
