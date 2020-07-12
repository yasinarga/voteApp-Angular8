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
  private orderType = new BehaviorSubject(ORDERTYPE);
  public data: any = JSON.parse(localStorage.getItem('data')) ;




  constructor(private helperService: HelperService) {
    this.data ? this.list.next(this.data) : this.list.next([]);
  }



  addData = (data) => {
    this.data.push({
      id : '_' + Math.random().toString(36).substr(2, 9),
      name : data.name,
      url : data.url,
      point: 0 ,
      created_date : new Date(),
      modified_date : new Date()
    });
    localStorage.setItem(LSKEY, JSON.stringify(this.data));
    this.list.next(this.data);
  }

  deleteData = (index) => {
    this.data.splice(index, 1);
  }

  sortingDArray = (orderType) => {
    this.orderType.next(orderType);
    switch (orderType) {
      case 'most' :
        this.orderType.next(orderType);
        let newArray = this.data.sort((one, two) => {
          if (one.point > two.point) {
            return -1;
          } else if (one.point === two.point) {
            const dateArray = [ new Date(one.modified_date).getTime() , new Date(two.modified_date).getTime()];
            return ((dateArray[0] < dateArray[1]) ? 1 : ((dateArray[0] > dateArray[1]) ? -1 : 0));
          } else {
            return 1;
          }
        });
        localStorage.setItem(LSKEY, JSON.stringify(newArray));
        this.list.next(this.data);
        break;
      case 'less' :
        this.orderType.next(orderType);
       let newArray2 = this.data.sort((one, two) => {
          if (one.point > two.point) {
            return 1;
          } else if (one.point === two.point) {
            const dateArray = [ new Date(one.modified_date).getTime() , new Date(two.modified_date).getTime()];
            return ((dateArray[0] < dateArray[1]) ? 1 : ((dateArray[0] > dateArray[1]) ? -1 : 0));
          } else {
            return -1;
          }
        });
        localStorage.setItem(LSKEY, JSON.stringify(newArray2));
        this.list.next(this.data);
        break;
      case 'default':
        break;
    }

  }

  voteItem = (index , type) => {
    console.log(index);
    let key : string;
    this.orderType.subscribe(item => key = item);
    switch (type) {
      case 'up':
        this.data[index].point ++;
        this.data[index].modified_date = new Date();
        localStorage.setItem(LSKEY , JSON.stringify(this.data));
        this.list.next(this.data);
        this.sortingDArray(key);
        break;
      case 'down':
        this.data[index].point --;
        this.data[index].modified_date = new Date();
        localStorage.setItem(LSKEY , JSON.stringify(this.data));
        this.list.next(this.data);
        this.sortingDArray(key);
        break;
    }
  }
}
