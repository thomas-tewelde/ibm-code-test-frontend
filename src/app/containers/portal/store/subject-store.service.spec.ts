import { TestBed } from '@angular/core/testing';

import { SubjectStoreService } from './subject-store.service';

describe('SubjectStoreService', () => {
  let service: SubjectStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
