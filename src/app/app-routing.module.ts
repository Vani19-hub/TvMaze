import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TvshowsComponent } from './tvshows/tvshows.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { TvshowDetailsComponent } from './tvshow-details/tvshow-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: TvshowsComponent },
  { path: '404', component: NotfoundComponent },
  { path: 'showDetails/:id', component: TvshowDetailsComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
