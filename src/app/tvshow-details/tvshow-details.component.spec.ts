import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TvshowService } from '../common/tvshow.service';

import { TvshowDetailsComponent } from './tvshow-details.component';
import { Constants } from '../config/constants';
import { By } from '@angular/platform-browser';

describe('TvshowDetailsComponent', () => {
  let component: TvshowDetailsComponent;
  let fixture: ComponentFixture<TvshowDetailsComponent>;
  let getService: TvshowService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [TvshowDetailsComponent],
      providers: [Constants, TvshowService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvshowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    getService = TestBed.inject(TvshowService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expect initial season to be 1', () => {
    expect(component.seasonType).toEqual(1);
  });

  it('should call getshowEpisdoes and return list of episodes', fakeAsync(() => {
    const response = [];
    spyOn(getService, 'getshowEpisdoes').and.returnValue(of(response));
    component.getshowEpisodes();
    fixture.detectChanges();
    expect(component.seasonsEpisodes).toEqual(response);
  }));

  it('show season', fakeAsync(() => {
    const season = 1;
    component.showSeason(season);
    expect(component.seasonType).toBe(1);
  }));
});
