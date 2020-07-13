import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../services/dataService/data.service';
import {SwalService} from '../../services/swalService/swal-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public list: any = [];
  public itemsPerPage = 5;
  public totalItems = 10;
  public currentPage = 1;
  public hoverID : number;


  constructor(
    private dataService: DataService,
    private swalService: SwalService) {
    this.dataService.list.subscribe(data => this.list = data);
    this.totalItems = this.list.length;
  }

  ngOnInit() {

  }

  trackByFn(index, list) {
    return list.id;
  }
  getNewCurrentPage(event) {
    this.currentPage = event;  // trigger to new page number
  }

  voteItem( index, type)  {
    this.dataService.voteItem(index + ((this.currentPage - 1) * this.itemsPerPage) , type);
  }

  selectOrderType(ordeyType){

    this.currentPage = 1;
    this.dataService.sortingArray(ordeyType); // it will sort according to selected order type
  }

  deleteItem(index, item){
    this.swalService.generateDialog(item.name).then( result => {
      if (result.value) {  // dialog value is true selected item will remove.
        this.dataService.deleteData(index + ((this.currentPage - 1) * this.itemsPerPage));
        this.totalItems = this.list.length;
        if(this.currentPage !== 1) { // it calculate current page number.
          this.currentPage = this.list.length / this.itemsPerPage;
        }
        this.swalService.generateToaster('success', `${item.name} removed`, 'center');
      }
    });
  }

  ngOnDestroy(): void {
    this.dataService.orderType.next('default');
  }


}
