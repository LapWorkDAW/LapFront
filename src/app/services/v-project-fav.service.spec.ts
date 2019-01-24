import { TestBed } from '@angular/core/testing';

import { VProjectFavService } from './v-project-fav.service';

describe('VProjectFavService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VProjectFavService = TestBed.get(VProjectFavService);
    expect(service).toBeTruthy();
  });
});
