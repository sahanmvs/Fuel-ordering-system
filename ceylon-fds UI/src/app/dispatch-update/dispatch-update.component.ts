import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'fd-dispatch-update',
  templateUrl: './dispatch-update.component.html',
  styleUrls: ['./dispatch-update.component.scss']
})
export class DispatchUpdateComponent implements OnInit {

  dispatchOrder = new FormGroup({
    key: new FormControl(''),
    uniqueKey: new FormControl(''),
    amount: new FormControl(''),
    result: new FormControl(''),
    scheduledDate: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

}
