import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenificiaryComponent } from './benificiary.component';

describe('BenificiaryComponent', () => {
  let component: BenificiaryComponent;
  let fixture: ComponentFixture<BenificiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenificiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenificiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
