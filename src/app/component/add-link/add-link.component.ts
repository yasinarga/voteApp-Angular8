import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {SwalService} from '../../services/swalService/swal-service.service';
import {DataService} from '../../services/dataService/data.service';



@Component({
  selector: 'app-add-link',
  templateUrl: './add-link.component.html',
  styleUrls: ['./add-link.component.scss']
})

export class AddLinkComponent implements OnInit {
  public addLinkFormGroup: FormGroup;
  public urlRegex : string = 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,4}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)';
  public urlFocus = false;

  constructor(
    private formBuilder: FormBuilder,
    private swalService: SwalService,
    private dataService :DataService
  ) { }

  ngOnInit() {
    this.addLinkFormGroup = this.formBuilder.group({
      name : ['' , [Validators.required , Validators.minLength(1)]],
      url : ['' ,[Validators.required , Validators.pattern(this.urlRegex)]]
    });
  }

  saveLinkInformation() {
    const newData = {
      name : this.name.value,
      url : this.url.value
    };
    if(this.addLinkFormGroup.valid) {
        this.dataService.addData(newData);
        this.swalService.generateToaster('success','Url was added');
    } else {
      this.swalService.generateToaster('warning' , 'Form is invalid' );
    }
  }

  get name() { return this.addLinkFormGroup.get('name'); }
  get url() { return this.addLinkFormGroup.get('url'); }

}
