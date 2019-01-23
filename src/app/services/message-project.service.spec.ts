import { TestBed } from '@angular/core/testing';

import { MessageProjectService } from './message-project.service';

describe('MessageProjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageProjectService = TestBed.get(MessageProjectService);
    expect(service).toBeTruthy();
  });
});
