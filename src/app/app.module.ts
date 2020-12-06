import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Constants } from './config/constants';
import { OrderByPipe } from './order-by.pipe';
import { TvshowsComponent } from './tvshows/tvshows.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { TvshowDetailsComponent } from './tvshow-details/tvshow-details.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderByPipe,
    TvshowsComponent,
    NotfoundComponent,
    TvshowDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxPaginationModule,
    FontAwesomeModule,
  ],
  providers: [Constants],
  bootstrap: [AppComponent],
})
export class AppModule {}
