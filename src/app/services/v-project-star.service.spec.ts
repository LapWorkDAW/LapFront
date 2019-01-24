import { TestBed } from '@angular/core/testing';

import { VProjectStarService } from './v-project-star.service';

describe('VProjectStarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VProjectStarService = TestBed.get(VProjectStarService);
    expect(service).toBeTruthy();
  });
});
