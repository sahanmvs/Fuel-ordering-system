import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DispatchUpdateService } from './dispatch-update.service';
import { DispatchUpdate } from './DispatchUpdate.model';

@Component({
  selector: 'fd-dispatch-update',
  templateUrl: './dispatch-update.component.html',
  styleUrls: ['./dispatch-update.component.scss']
})
export class DispatchUpdateComponent implements OnInit {

  dispatch!: DispatchUpdate[];

  dispatchOrder = new FormGroup({
    key: new FormControl(''),
    uniqueKey: new FormControl(''),
    amount: new FormControl(),
    result: new FormControl(''),
    scheduledDate: new FormControl(''),
    dispatchedDate: new FormControl('')
  });

  constructor(private router: ActivatedRoute, private dispatchUpdate: DispatchUpdateService) { }

  ngOnInit(): void {
    const id = this.router.snapshot.params['id']; 
    console.log(id);   

    this.dispatchUpdate.getDispatch(id)
    .subscribe({
      next: data => {
        // console.log(data) // array
        this.dispatch = data;

        for(let dispatch of this.dispatch) {
          this.dispatchOrder = new FormGroup({
                                  key: new FormControl(dispatch.NIC),
                                  uniqueKey: new FormControl(dispatch.uniqueKey),
                                  amount: new FormControl(dispatch.amount),
                                  result: new FormControl(dispatch.status),
                                  scheduledDate: new FormControl(dispatch.scheduledDate),
                                  dispatchedDate: new FormControl(dispatch.time)
                                }) 
        }
      }
    })
                      
  }

}
