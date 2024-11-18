import { TestBed } from '@angular/core/testing';

import { GetWeatherAPIService } from './get-weather-api.service';

describe('GetWeatherAPIService', () => {
  let service: GetWeatherAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetWeatherAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
