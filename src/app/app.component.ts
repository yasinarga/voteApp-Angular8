import { Component } from '@angular/core';
import {HelperService} from './services/helperService/helper.service';
import {LSKEY, ORDERTYPE} from './services/helperService/contstants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private helperService: HelperService) {
    localStorage.setItem(LSKEY , JSON.stringify(helperService.defaultData()));
    localStorage.setItem(ORDERTYPE , 'default');
  }
}
