import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailpageComponent } from './detailpage.component';

describe('DetailpageComponent', () => {
  let component: DetailpageComponent;
  let fixture: ComponentFixture<DetailpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
