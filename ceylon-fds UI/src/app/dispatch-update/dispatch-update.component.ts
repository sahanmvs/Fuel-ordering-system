import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DispatchUpdateService } from './dispatch-update.service';

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

  constructor(private router: ActivatedRoute, private dispatchUpdate: DispatchUpdateService) { }

  ngOnInit(): void {
    console.log(this.router.snapshot.params['id']); 
    this.dispatchUpdate.getDispatch(this.router.snapshot.params['id'])
                      .subscribe((res) => {
                        console.log(res);  
                      });
  }

}
