import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { HomeComponent } from './home.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {PaginationComponent} from '../pagination/pagination.component';
import {Query} from '@angular/core';

describe('HomeComponent', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let debugElement: DebugElement;
  let listData ;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, PaginationComponent ],
      imports : [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeAll( () => {
    listData =[{
    created_date: "2020-07-13T17:28:07.370Z",
    id: "_sl7ks8xmv",
    modified_date: "2020-07-13T18:02:26.648Z",
    name: "Hüseyin",
    point: 0,
    url: "http://google.com"
    }];
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });




  it('should increase point click Up Vote', fakeAsync(async () => {
    spyOn(component, 'voteItem');
    const button = fixture.debugElement.nativeElement.querySelector('#voteUp');
    button.click();
    tick();
    await expect(component.list[0].point).toBe(1);
  }));
  it('should decrease point click  Down Vote', fakeAsync(async () => {
    spyOn(component, 'voteItem');
    const buttonDown = fixture.debugElement.nativeElement.querySelector('#voteDown');
    buttonDown.click();
    tick();
    await expect(component.list[0].point).toBe(-1);
  }));
  it('should show delete button when hover div', fakeAsync(async () => {
    spyOn(component, 'deleteItem');
    const itemList = fixture.debugElement.nativeElement.querySelector('#listArea');
    itemList.dispatchEvent(new MouseEvent('mouseover',{view: window,
      bubbles: true,
      cancelable: true}));
    tick();
    await expect(component.hoverID).toBe(0);






  }));

})
