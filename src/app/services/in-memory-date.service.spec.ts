import { TestBed, inject } from '@angular/core/testing';

import { InMemoryDateService } from './in-memory-date.service';

describe('InMemoryDateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InMemoryDateService]
    });
  });

  it('should be created', inject([InMemoryDateService], (service: InMemoryDateService) => {
    expect(service).toBeTruthy();
  }));
});
