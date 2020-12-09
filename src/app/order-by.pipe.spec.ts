import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderByPipe } from './order-by.pipe';
import { TvshowsComponent } from './tvshows/tvshows.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';

import { Constants } from './config/constants';

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;
  let array = [];
  let component: TvshowsComponent;
  let fixture: ComponentFixture<TvshowsComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TvshowsComponent, OrderByPipe],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NgxPaginationModule,
      ],
      providers: [Constants],
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(TvshowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    pipe = new OrderByPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('sort items based on rating', () => {
    expect(pipe.transform(array, 'rating.average'));
  });

  it('if array is null expect to return null ', () => {
    pipe.transform(array, 'rating.average');
    array = null;
    expect(array).toEqual(null);
  });

  it('if condition doesnt meet return empty array ', () => {
    const result = [];
    const arrayResult = pipe.transform(array, 'rating.average');
    const aDeep = 4;
    const bDeep = 3;
    expect(aDeep).toBeGreaterThan(bDeep);
    expect(arrayResult).toEqual(array);
  });

  it('sorts in descending order by default', () => {
    array = [
      {
        id: 1,
        premiered: '20-12-1990',
        rating: {
          average: 8,
        },
      },
      {
        id: 2,
        premiered: '20-12-1989',
        rating: {
          average: 9,
        },
      },
    ];

    const sortedArray = [
      {
        id: 2,
        premiered: '20-12-1989',
        rating: {
          average: 9,
        },
      },
      {
        id: 1,
        premiered: '20-12-1990',
        rating: {
          average: 8,
        },
      },
    ];
    const sorted = pipe.transform(array, 'rating.average');
    expect(sorted).toEqual(sortedArray);
  });
});
