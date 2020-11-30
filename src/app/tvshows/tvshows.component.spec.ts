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

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TvshowsComponent, OrderByPipe],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [Constants],
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(TvshowsComponent);
    router.initialNavigation();
    component = fixture.componentInstance;
    fixture.detectChanges();

    getService = TestBed.inject(TvshowService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set all shows', () => {
    component.allShows = [new AllShows()];
    expect(component.allShows).toBeTruthy();
  });

  it('should click resetFilter methd ', fakeAsync(() => {
    fixture.detectChanges();
    spyOn(component, 'resetFilter').and.callThrough(); // method attached to the click.
    const btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click', null);
    tick(); // simulates the passage of time until all pending asynchronous activities finish
    fixture.detectChanges();
    expect(component.resetFilter).toHaveBeenCalled();
  }));

  it('should click chooseGenre methd ', fakeAsync(() => {
    fixture.detectChanges();
    spyOn(component, 'chooseGenre').and.callThrough(); // method attached to the click.
    const btn = fixture.debugElement.query(By.css('select'));
    btn.triggerEventHandler('change', null);
    tick(); // simulates the passage of time until all pending asynchronous activities finish
    fixture.detectChanges();
    expect(component.chooseGenre).toHaveBeenCalled();
  }));

  it('should click filterItem method ', fakeAsync(() => {
    fixture.detectChanges();
    spyOn(component, 'filterItem').and.callThrough(); // method attached to the click.
    const btn = fixture.debugElement.query(By.css('input'));
    btn.triggerEventHandler('input', null);
    tick(); // simulates the passage of time until all pending asynchronous activities finish
    fixture.detectChanges();
    expect(component.filterItem).toHaveBeenCalled();
  }));

  it('no results found', () => {
    const h6 = fixture.nativeElement.querySelector('h6');
    expect(h6.textContent).toEqual('No Search results found');
  });

  it('#resetGenre()', () => {
    component.resetFilter();
    expect(component.selectedGenre).toBe('Popular Shows');
  });

  it('#chooseGenre() should choose #genre', () => {
    const select = fixture.debugElement.query(By.css('select')).nativeElement;
    select.value = select.options[0].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.selectedGenre).toBe('Category');
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
});
