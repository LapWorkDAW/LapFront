import { TestBed } from '@angular/core/testing';

import { StorageServiceModuleService } from './storage-service-module.service';

describe('StorageServiceModuleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StorageServiceModuleService = TestBed.get(StorageServiceModuleService);
    expect(service).toBeTruthy();
  });
});
