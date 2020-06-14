import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenificiaryListComponent } from './benificiary-list.component';

describe('BenificiaryListComponent', () => {
  let component: BenificiaryListComponent;
  let fixture: ComponentFixture<BenificiaryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenificiaryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenificiaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
