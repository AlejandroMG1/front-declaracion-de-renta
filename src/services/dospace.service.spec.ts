import { TestBed } from '@angular/core/testing';

import { DOSpaceService } from './dospace.service';

describe('DOSpaceService', () => {
  let service: DOSpaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DOSpaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
