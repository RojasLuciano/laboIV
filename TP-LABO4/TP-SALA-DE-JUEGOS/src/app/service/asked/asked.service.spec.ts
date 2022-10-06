import { TestBed } from '@angular/core/testing';

import { AskedService } from './asked.service';

describe('AskedService', () => {
  let service: AskedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AskedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
