import { TestBed } from '@angular/core/testing';

import { VoteUserService } from './vote-user.service';

describe('VoteUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VoteUserService = TestBed.get(VoteUserService);
    expect(service).toBeTruthy();
  });
});
