import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

import { TvshowService } from '../common/tvshow.service';
import { TvshowsComponent } from './tvshows.component';
import { Constants } from '../config/constants';
import { OrderByPipe } from '../order-by.pipe';
import { AllShows } from './tvshow.model';

describe('TvshowsComponent', () => {
  let component: TvshowsComponent;
  let fixture: ComponentFixture<TvshowsComponent>;
  let router: Router;
  let location: Location;
  let getService: TvshowService;
  let hostElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TvshowsComponent, OrderByPipe],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NgxPaginationModule,
        FormsModule,
      ],
      providers: [Constants],
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(TvshowsComponent);
    router.initialNavigation();
    component = fixture.componentInstance;
    hostElement = fixture.nativeElement;
    fixture.detectChanges();

    getService = TestBed.inject(TvshowService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have onDataChange function', () => {
    expect(component.onDataChange).toBeTruthy();
  });

  it('should set all shows', () => {
    component.allShows = [new AllShows()];
    expect(component.allShows).toBeTruthy();
  });

  it('set selectedShows to empty when getAllShows method is clicked ', () => {
    component.getAllShows('Family');
    expect(component.selectedShows.length).toEqual(0);
  });

  it('click on card to navigate to tvshow details page ', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const id = '1';
    component.getShowDetails(id);
    expect(navigateSpy).toHaveBeenCalledWith(['/showDetails', Number(id)]);
  });

  it('change default page to 1 when resetFilter method is clicked ', () => {
    component.resetFilter();
    expect(component.page).toBe(1);
  });

  it('clear showName when chooseGenre method is clicked ', fakeAsync(() => {
    const select: HTMLInputElement = hostElement.querySelector('select');
    select.value = 'category';
    select.dispatchEvent(new Event('select'));
    fixture.detectChanges();
    expect(component.showName).toBe('');
  }));

  it('if filter applied set selectedGenre  when filterItem method is clicked ', fakeAsync(() => {
    component.showName = 'search string';
    const result = `search results for '${component.showName}'`;
    component.filterItem(component.showName);
    expect(component.selectedGenre).toEqual(result);
  }));

  it('#resetGenre()', () => {
    component.resetFilter();
    expect(component.selectedGenre).toBe('Popular Shows');
  });

  it('should call getDetails and return list of showdetails', fakeAsync(() => {
    const response = [];
    spyOn(getService, 'getAllShows').and.returnValue(of(response));
    component.getAllShows('Family');
    fixture.detectChanges();
    expect(component.allShows).toEqual(response);
  }));

  it('should call filterItem and return list of filteredshowdetails', fakeAsync(() => {
    const response = [];
    spyOn(getService, 'searchResults').and.returnValue(of(response));
    component.filterItem('Family');
    fixture.detectChanges();
    expect(component.allShows).toEqual(response);
  }));

  it('if clicked pagination on data change should call filterItem', fakeAsync(() => {
    component.showName = 'search string';
    component.onDataChange('');
    tick();
    fixture.detectChanges();
    expect(component.selectedValue).toEqual('category');

    component.showName = '';
    component.onDataChange('');
    tick();
    fixture.detectChanges();
    expect(component.selectedShows.length).toEqual(0);
  }));

  it('if rating ? returns rating :else NA', fakeAsync(() => {
    const falseresult = component.rating('');
    tick();
    fixture.detectChanges();
    expect(falseresult).toEqual('NA');

    const trueresult = component.rating('9');
    component.onDataChange('');
    tick();
    fixture.detectChanges();
    expect(trueresult).toEqual('9/10');
  }));
});
