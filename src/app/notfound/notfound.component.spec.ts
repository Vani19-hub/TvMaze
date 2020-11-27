import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';

import { routes } from '../app-routing.module';
import { NotfoundComponent } from './notfound.component';

describe('NotfoundComponent', () => {
  let component: NotfoundComponent;
  let fixture: ComponentFixture<NotfoundComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [NotfoundComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(NotfoundComponent);
    router.initialNavigation();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render not found text in a p tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain(
      '404 Page not found'
    );
  });

  it('should render not found text in a p tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a').textContent).toContain(
      'you might want to go to the home Page?'
    );
  });

  it('navigate to "" redirects you to /home', fakeAsync(() => {
    router.navigate(['']).then(() => {
      tick(); // simulates the passage of time until all pending asynchronous activities finish
      fixture.detectChanges();
      expect(location.path()).toBe('/home');
    });
  }));
});
