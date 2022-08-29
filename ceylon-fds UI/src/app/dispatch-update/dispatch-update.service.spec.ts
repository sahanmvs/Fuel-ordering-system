import { TestBed } from '@angular/core/testing';

import { DispatchUpdateService } from './dispatch-update.service';

describe('DispatchUpdateService', () => {
  let service: DispatchUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DispatchUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
