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
      providers: [{ TvshowService }, Constants],
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

  it(
    'should fetch allshows data as an Observable',
    waitForAsync(
      inject(
        [HttpTestingController, TvshowService],
        (httpClient: HttpTestingController) => {
          const shows = [
            {
              id: 1,
              url: 'http://www.tvmaze.com/shows/1/under-the-dome',
              name: 'Under the Dome',
              type: 'Scripted',
              language: 'English',
              genres: ['Drama', 'Science-Fiction', 'Thriller'],
              status: 'Ended',
              runtime: 60,
              premiered: '2013-06-24',
              officialSite: 'http://www.cbs.com/shows/under-the-dome/',
              schedule: { time: '22:00', days: ['Thursday'] },
              rating: { average: 6.5 },
              weight: 97,
              network: {
                id: 2,
                name: 'CBS',
                country: {
                  name: 'United States',
                  code: 'US',
                  timezone: 'America/New_York',
                },
              },
              webChannel: null,
              externals: { tvrage: 25988, thetvdb: 264492, imdb: 'tt1553656' },
              image: {
                medium:
                  'http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg',
                original:
                  'http://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg',
              },
              summary:
                '<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The towns inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.</p>',
              updated: 1573667713,
              links: {
                self: { href: 'http://api.tvmaze.com/shows/1' },
                previousepisode: {
                  href: 'http://api.tvmaze.com/episodes/185054',
                },
              },
            },
          ];

          getService.getAllShows().subscribe((menu: any) => {
            expect(shows.length).toBe(1);
          });

          const req = httpMock.expectOne('http://api.tvmaze.com/shows');
          expect(req.request.method).toBe('GET');

          req.flush(shows);
          httpMock.verify();
        }
      )
    )
  );

  it('should have getShowDetails function', () => {
    expect(getService.getAllShows).toBeTruthy();
  });

  it(
    'should fetch eachshow data as an Observable',
    waitForAsync(
      inject(
        [HttpTestingController, TvshowService],
        (httpClient: HttpTestingController) => {
          const showDetails = [
            {
              id: 1,
              url: 'http://www.tvmaze.com/episodes/1/under-the-dome-1x01-pilot',
              name: 'Pilot',
              season: 1,
              number: 1,
              type: 'regular',
              airdate: '2013-06-24',
              airtime: '22:00',
              airstamp: '2013-06-25T02:00:00+00:00',
              runtime: 60,
              image: {
                medium:
                  'http://static.tvmaze.com/uploads/images/medium_landscape/1/4388.jpg',
                original:
                  'http://static.tvmaze.com/uploads/images/original_untouched/1/4388.jpg',
              },
              summary:
                '<p>When the residents of Chesters Mill find themselves trapped under a massive transparent dome with no way out, they struggle to survive as resources rapidly dwindle and panic quickly escalates.</p>',
              links: { self: { href: 'http://api.tvmaze.com/show/1' } },
            },
          ];

          getService.getShowDetails(1).subscribe((menu: any) => {
            expect(showDetails.length).toBe(1);
          });

          const req = httpMock.expectOne('http://api.tvmaze.com/shows/1');
          expect(req.request.method).toBe('GET');

          req.flush(showDetails);
          httpMock.verify();
        }
      )
    )
  );

  it('should have getshowEpisdoes function', () => {
    expect(getService.getshowEpisdoes).toBeTruthy();
  });

  it(
    'should fetch allseasons data as an Observable',
    waitForAsync(
      inject(
        [HttpTestingController, TvshowService],
        (httpClient: HttpTestingController) => {
          const seasons = [
            {
              id: 1,
              url: 'http://www.tvmaze.com/episodes/1/under-the-dome-1x01-pilot',
              name: 'Pilot',
              season: 1,
              number: 1,
              type: 'regular',
              airdate: '2013-06-24',
              airtime: '22:00',
              airstamp: '2013-06-25T02:00:00+00:00',
              runtime: 60,
              image: {
                medium:
                  'http://static.tvmaze.com/uploads/images/medium_landscape/1/4388.jpg',
                original:
                  'http://static.tvmaze.com/uploads/images/original_untouched/1/4388.jpg',
              },
              summary:
                'p>When the residents of Chesters Mill find themselves trapped under a massive transparent dome with no way out, they struggle to survive as resources rapidly dwindle and panic quickly escalates.</p>',
              links: { self: { href: 'http://api.tvmaze.com/episodes/1' } },
            },
          ];

          getService.getshowEpisdoes(1).subscribe((menu: any) => {
            expect(seasons.length).toBe(1);
          });

          const req = httpMock.expectOne(
            'http://api.tvmaze.com/shows/1/episodes'
          );
          expect(req.request.method).toBe('GET');

          req.flush(seasons);
          httpMock.verify();
        }
      )
    )
  );

  it('should have getsearchepisodes function', () => {
    expect(getService.searchResults).toBeTruthy();
  });

  it(
    'should fetch getsearchepisodes data as an Observable',
    waitForAsync(
      inject(
        [HttpTestingController, TvshowService],
        (httpClient: HttpTestingController) => {
          const searchSeasons = [
            {
              score: 17.680965,
              show: {
                id: 139,
                url: 'http://www.tvmaze.com/shows/139/girls',
                name: 'Girls',
                type: 'Scripted',
                language: 'English',
                genres: ['Drama', 'Romance'],
                status: 'Ended',
                runtime: 30,
                premiered: '2012-04-15',
                officialSite: 'http://www.hbo.com/girls',
                schedule: {
                  time: '22:00',
                  days: ['Sunday'],
                },
                rating: { average: 6.7 },
                weight: 81,
                network: {
                  id: 8,
                  name: 'HBO',
                  country: {
                    name: 'United States',
                    code: 'US',
                    timezone: 'America/New_York',
                  },
                },
                webChannel: null,
                externals: {
                  tvrage: 30124,
                  thetvdb: 220411,
                  imdb: 'tt1723816',
                },
                image: {
                  medium:
                    'http://static.tvmaze.com/uploads/images/medium_portrait/31/78286.jpg',
                  original:
                    'http://static.tvmaze.com/uploads/images/original_untouched/31/78286.jpg',
                },
                summary:
                  '<p>This Emmy winning series is a comic look at the assorted humiliations and rare triumphs of a group of girls in their 20s.</p>',
                updated: 1600633829,
                _links: {
                  self: { href: 'http://api.tvmaze.com/shows/139' },
                  previousepisode: {
                    href: 'http://api.tvmaze.com/episodes/1079686',
                  },
                },
              },
            },
          ];

          getService.searchResults('girls').subscribe((menu: any) => {
            expect(searchSeasons.length).toBe(1);
          });

          const req = httpMock.expectOne(
            'http://api.tvmaze.com/search/shows?q=girls'
          );
          expect(req.request.method).toBe('GET');

          req.flush(searchSeasons);
          httpMock.verify();
        }
      )
    )
  );
});
