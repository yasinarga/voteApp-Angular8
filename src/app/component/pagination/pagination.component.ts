import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges, OnDestroy{

  constructor(){

  }
  @Input() paginationList = [];
  @Input() itemsPerPage: number;
  @Input() currentPage: number;
  @Input() itemsLength: number;
  @Output() newCurrentPage = new EventEmitter<any>();
  public pageNumbers = [];
  public getClickedNumber: number;

  static removeHover(e){
    if (!e.target.className.includes('current-page')){
      e.target.classList.add('can-touch');
    }
  }

  ngOnInit(): void {
    console.log(this.paginationList);
    if (this.getClickedNumber === undefined) {
      this.getClickedNumber = this.currentPage;
    }
    document.addEventListener('touchstart', (e) => PaginationComponent.removeHover(e), false);
    document.removeEventListener('touchstart', PaginationComponent.removeHover);
  }

  ngOnChanges(){
    this.pageNumbers = [];
    if (this.paginationList.length > 0) {
      for (let i = 1; i <= Math.ceil(this.itemsLength / this.itemsPerPage); i++) {
        this.pageNumbers.push(i);
      }
    }
  }

  getPageNumber(number) {
    this.newCurrentPage.emit(number);
    this.getClickedNumber = number;
  }

  goPrevPage(){
    this.newCurrentPage.emit(this.getClickedNumber - 1);
    this.getClickedNumber--;
  }

  goNextPage(){
    this.newCurrentPage.emit(this.getClickedNumber + 1);
    this.getClickedNumber++;
  }

  ngOnDestroy(): void {
  }
}
