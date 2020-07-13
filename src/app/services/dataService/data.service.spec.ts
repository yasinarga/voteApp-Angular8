import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import { DataService } from './data.service';
import {inject} from '@angular/core';

describe('DataService', () => {

  let injector : TestBed;
  let service: DataService;
  let fixture: ComponentFixture<DataService>;
  let dummyListData  = [
    {
    name : 'Google',
    url : 'http://google.com',
    point : 0,
    modified_date : new Date(),
    created_date : new Date()
  },
  {
      name : 'Yahoo',
      point : 0,
      modified_date : new Date(),
      created_date : new Date(),
      url: 'http://yahoo.com'
  }];
  beforeEach(async () => {TestBed.configureTestingModule({
    providers: [DataService]
  });
    injector = getTestBed();
    service = injector.get(DataService);

  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should add new data(addData func)' , () => {

    service.data = dummyListData;
    service.addData(dummyListData[0]);
    expect(service.data.length).toBe(3);
    expect(service.data[0].name).toBe('Google');
  });

  it('should increase vote point', () => {
    service.data = dummyListData;
    service.voteItem(0 ,'up');
    expect(service.data[0].point).toBe(1);
  });

  it('item should sorting to less voted', () =>{
    service.data = dummyListData;
    service.sortingArray('less');
    expect(service.data[0].point).toBe(0);

  })
  it('item should sorting to most voted', () => {
    service.data = dummyListData;
    service.sortingArray('most');
    expect(service.data[0].point).toBe(1);
  })

});
