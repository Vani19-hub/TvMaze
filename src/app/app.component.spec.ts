import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AppComponent } from './app.component';
import { TvshowsComponent } from './tvshows/tvshows.component';
import { TvshowDetailsComponent } from './tvshow-details/tvshow-details.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { TvshowService } from './common/tvshow.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AppComponent,
        TvshowsComponent,
        TvshowDetailsComponent,
        NotfoundComponent,
      ],
      providers: [TvshowService],
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'tvshow'`, () => {
    expect(component.title).toEqual('Welcome to TVMaze');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.toolbar p').textContent).toContain(
      'Welcome to TVMaze'
    );
  });

  it('navigate to "" redirects you to /home', fakeAsync(() => {
    router.navigate(['']).then(() => {
      tick(); // simulates the passage of time until all pending asynchronous activities finish
      fixture.detectChanges();
      expect(location.path()).toBe('/');
    });
  }));
});
