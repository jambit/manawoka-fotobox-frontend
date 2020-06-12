import { TestBed } from '@angular/core/testing';

import { PhotoboothService } from './photobooth.service';

describe('PhotoboothService', () => {
  let service: PhotoboothService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoboothService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
