import { waitForAsync, inject, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Constants } from '../config/constants';
import { TvshowService } from './tvshow.service';

describe('TvshowService', () => {
  let getService: TvshowService;
  //   const constant: Constants;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TvshowService, Constants],
    });

    getService = TestBed.inject(TvshowService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(getService).toBeTruthy();
  });

  it('should have getAllShows function', () => {
    expect(getService.getAllShows).toBeTruthy();
  });

  it('should have getShowDetails function', () => {
    expect(getService.getAllShows).toBeTruthy();
  });

  it('should have getshowEpisdoes function', () => {
    expect(getService.getshowEpisdoes).toBeTruthy();
  });

  it('should have getsearchepisodes function', () => {
    expect(getService.searchResults).toBeTruthy();
  });
});
