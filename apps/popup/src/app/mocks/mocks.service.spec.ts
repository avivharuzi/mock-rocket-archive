import { TestBed } from '@angular/core/testing';

import { MocksService } from './mocks.service';

describe('MocksService', () => {
  let service: MocksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MocksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
