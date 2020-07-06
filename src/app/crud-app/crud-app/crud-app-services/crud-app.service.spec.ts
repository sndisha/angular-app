import { TestBed, inject } from '@angular/core/testing';

import { CrudAppService } from './crud-app.service';

describe('CrudAppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrudAppService]
    });
  });

  it('should be created', inject([CrudAppService], (service: CrudAppService) => {
    expect(service).toBeTruthy();
  }));
});
