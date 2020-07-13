import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLinkComponent } from './add-link.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HelperService} from '../../services/helperService/helper.service';
import {init} from 'protractor/built/launcher';

describe('AddLinkComponent', () => {
  let component: AddLinkComponent;
  let fixture: ComponentFixture<AddLinkComponent>;
  let initData : HelperService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLinkComponent ],
      imports : [ReactiveFormsModule, FormsModule],
      providers : [HelperService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('name field validity' , () => {
    let name = component.addLinkFormGroup.controls.name;
    expect(name.valid).toBeFalsy();
    name.setValue('');
    expect(name.hasError('required')).toEqual(true);
    name.setValue('ABC');
    expect(name.hasError('required')).toEqual(false);
  });

  it('url field validity' , () => {
    let url = component.addLinkFormGroup.controls.url;
    expect(url.valid).toBeFalsy();
    expect(url.hasError('required')).toEqual(true);
    url.setValue('google.com');
    expect(url.valid).toBeFalsy();
    url.setValue('http://google.com');
    expect(url.valid).toBeTruthy();
  });
});
