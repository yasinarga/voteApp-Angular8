import { TestBed } from '@angular/core/testing';

import { SwalServiceService } from './swal-service.service';

describe('SwalServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SwalServiceService = TestBed.get(SwalServiceService);
    expect(service).toBeTruthy();
  });
});
