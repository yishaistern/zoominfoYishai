import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoradComponent } from './borad.component';

describe('BoradComponent', () => {
  let component: BoradComponent;
  let fixture: ComponentFixture<BoradComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoradComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
