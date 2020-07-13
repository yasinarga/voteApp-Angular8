import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HelperService} from '../helperService/helper.service';
import {LSKEY , PAGELIMIT, ORDERTYPE} from '../helperService/contstants';



interface DataConfig {
  id: string;
  name: string;
  url: string;
  point: number;
  created_date: Date;
  modified_date: Date;
}


@Injectable({
  providedIn: 'root'
})
export class DataService {
  public list = new BehaviorSubject([]);
  public orderType = new BehaviorSubject(ORDERTYPE);
  public data: any = JSON.parse(localStorage.getItem('data')) && true ? JSON.parse(localStorage.getItem('data'))  : [];




  constructor(private helperService: HelperService) {
    let key ;
    this.orderType.subscribe(item => key =item);
    this.sortingArray(key);
  }



  addData = (data) => {
    if(this.data === null || undefined) {
      this.data = [];
    }
    this.data.push({
      id : '_' + Math.random().toString(36).substr(2, 9),
      name : data.name,
      url : data.url,
      point: 0 ,
      created_date : new Date(),
      modified_date : new Date()
    });

    let key ;
    this.orderType.subscribe(item => {key = item});
    this.sortingArray(key);
  };

  deleteData = (index) => {
    this.data.splice(index, 1);
    this.saveChanges(this.data);
  };

  sortingArray = (orderType) => {
    this.orderType.next(orderType);
    switch (orderType) {
      case 'most' :
        this.orderType.next(orderType);
         this.data.sort((one, two) => {
          if (one.point > two.point) {
            return -1;
          } else if (one.point === two.point) {
            const dateArray = [ new Date(one.modified_date).getTime() , new Date(two.modified_date).getTime()];
            return ((dateArray[0] < dateArray[1]) ? 1 : ((dateArray[0] > dateArray[1]) ? -1 : 0));
          } else {
            return 1;
          }
        });
        localStorage.setItem(LSKEY, JSON.stringify(this.data));
        this.list.next(this.data);
        break;
      case 'less' :
        this.data.sort((one, two) => {
          if (one.point > two.point) {
            return 1;
          } else if (one.point === two.point) {
            const dateArray = [ new Date(one.modified_date).getTime() , new Date(two.modified_date).getTime()];
            return ((dateArray[0] < dateArray[1]) ? 1 : ((dateArray[0] > dateArray[1]) ? -1 : 0));
          } else {
            return -1;
          }
        });
        this.saveChanges(this.data);
        break;
      case 'default':
        console.log(orderType);
        this.data.sort((one , two) =>{

          const dateArray = [ new Date(one.created_date).getTime() , new Date(two.created_date).getTime()];
          if (dateArray[0] < dateArray[1]) {
            return 1
          } else {
            return -1
          }
        })
        this.saveChanges(this.data);
        break;
    }

  }

  voteItem = (index , type) => {
    let key : string;
    this.orderType.subscribe(item => key = item);
    switch (type) {
      case 'up':
        this.data[index].point ++;
        this.data[index].modified_date = new Date();
        this.saveChanges(this.data);
        this.sortingArray(key);
        break;
      case 'down':
        this.data[index].point --;
        this.data[index].modified_date = new Date();
        this.saveChanges(this.data);
        this.sortingArray(key);
        break;
    }
  }

  saveChanges(data){
    localStorage.setItem(LSKEY , JSON.stringify(data));
    this.list.next(data);

  }
}
