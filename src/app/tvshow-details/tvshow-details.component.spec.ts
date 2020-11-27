import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TvshowDetailsComponent } from './tvshow-details.component';
import { Constants } from '../config/constants';
import { By } from '@angular/platform-browser';

describe('TvshowDetailsComponent', () => {
  let component: TvshowDetailsComponent;
  let fixture: ComponentFixture<TvshowDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [TvshowDetailsComponent],
      providers: [Constants],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvshowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('#showSeason() should choose season', () => {
  //   const id = fixture.debugElement.query(By.css('#seasonTabs')).nativeElement;
  //   id.value = id.options[0].value;
  //   id.dispatchEvent(new Event('click'));
  //   fixture.detectChanges();
  //   expect(component.seasonType).toBe(1);
  // });

  // it('should click showSeason methd ', fakeAsync(() => {
  //   fixture.detectChanges();
  //   spyOn(component, 'showSeason').and.callThrough(); // method attached to the click.
  //   const btn = fixture.debugElement.queryAll(By.css('#seasonTabs'));
  //   for (let i = 0; i < btn.length; i++) {
  //     btn[i].triggerEventHandler('click', null);
  //   }

  //   tick(); // simulates the passage of time until all pending asynchronous activities finish
  //   fixture.detectChanges();
  //   expect(component.showSeason).toHaveBeenCalled();
  // }));
});
