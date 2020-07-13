import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  defaultData = () => {
    return  [
      {
        id : '_xuivkjasn',
        name : 'Google',
        url : 'http://google.com',
        point : 2,
        created_date : '2020-07-12T11:14:33.830Z',
        modified_date : '2020-07-12T11:14:33.830Z'
      },
      {
        id : '_ia6dgzdj2',
        name : 'Stack Overflow',
        url : 'https://stackoverflow.com/',
        point : -1,
        created_date : '2020-07-12T11:14:43.830Z',
        modified_date : '2020-07-12T11:14:43.830Z'
      },
      {
        id: '_jb76gzd3f',
        name : 'Medium',
        url : 'http://medium.com',
        point : 2,
        created_date : '2020-07-12T11:14:53.830Z',
        modified_date : '2020-07-12T11:14:53.830Z'
      },
      {
        id :'_4ga5av6g6',
        name : 'Devnot',
        url : 'http://devnot.com',
        point : 8,
        created_date : '2020-07-12T11:14:32.830Z',
        modified_date : '2020-07-12T11:14:32.830Z'
      },
      {
        id : '_s4ba8omnb',
        name : 'Github',
        url : 'http://github.com',
        point : 0,
        created_date : '2020-07-12T11:14:30.830Z',
        modified_date : '2020-07-12T11:14:30.830Z'
      },
      {
        id : '_s4da1obnb',
        name : 'Yahoo',
        url : 'http://github.com',
        point : 0,
        created_date : '2020-07-12T11:12:30.830Z',
        modified_date : '2020-07-12T11:12:30.830Z'
      }
    ];
  }
}
