import { TestBed, inject } from '@angular/core/testing';

import { StrainService } from './strain.service';

describe('StrainService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StrainService]
    });
  });

  it('should be created', inject([StrainService], (service: StrainService) => {
    expect(service).toBeTruthy();
  }));
});
