import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IbmDataTableComponent } from './ibm-data-table.component';

describe('IbmDataTableComponent', () => {
  let component: IbmDataTableComponent;
  let fixture: ComponentFixture<IbmDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IbmDataTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IbmDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
