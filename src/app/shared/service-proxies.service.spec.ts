import { TestBed } from '@angular/core/testing';

import { ServiceProxiesService } from './service-proxies.service';

describe('ServiceProxiesService', () => {
  let service: ServiceProxiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceProxiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
