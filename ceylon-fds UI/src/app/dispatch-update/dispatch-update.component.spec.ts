import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchUpdateComponent } from './dispatch-update.component';

describe('DispatchUpdateComponent', () => {
  let component: DispatchUpdateComponent;
  let fixture: ComponentFixture<DispatchUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispatchUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DispatchUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
