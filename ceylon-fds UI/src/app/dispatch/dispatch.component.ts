import { Component, OnInit } from '@angular/core';
import { Dispatch } from './Dispatch.model';
import { DispatchService } from './dispatch.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'

@Component({
  selector: 'fd-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.scss']
})
export class DispatchComponent implements OnInit {
  dispatches!: Dispatch[];
  filteredDispatches!: Dispatch[];
  private _nicFilter: string = '';

  set nicFilter(value: string) {
    this._nicFilter = value;
    this.filterByNIC();
  }

  get nicFilter() {
    return this._nicFilter;
  }

  constructor(private dispatchService: DispatchService) { }

  ngOnInit(): void {
    this.dispatchService.getDispatches().subscribe({
      next: data => {
        this.dispatches = data;
        this.filteredDispatches = data;
      }
    })
  }

  filterByNIC() {
    this.filteredDispatches = this.dispatches.filter(dispatch => dispatch.NIC.includes(this._nicFilter));
  }

}
