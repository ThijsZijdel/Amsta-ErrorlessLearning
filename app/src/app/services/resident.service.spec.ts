import { TestBed, inject } from '@angular/core/testing';

import { ResidentService } from './resident.service';

describe('ResidentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResidentService]
    });
  });

  it('should be created', inject([ResidentService], (service: ResidentService) => {
    expect(service).toBeTruthy();
  }));
});
