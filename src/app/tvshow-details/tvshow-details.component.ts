import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TvshowService } from '../common/tvshow.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tvshow-details',
  templateUrl: './tvshow-details.component.html',
  styleUrls: ['./tvshow-details.component.css'],
})
export class TvshowDetailsComponent implements OnInit {
  public id: number;
  public showDetails = [];
  public seasonsEpisodes = [];
  public seasonType = 1;
  public noofSeasons = [];

  constructor(
    private tvshowservice: TvshowService,
    private actRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // initial data to be loaded
    this.getshowDetails();
    this.getshowEpisodes();
  }

  getshowDetails(): void {
    // getting each show details
    this.actRouter.params.subscribe((params) => {
      this.id = Number(params.id);
    });
    this.tvshowservice.getShowDetails(this.id).subscribe(
      (response) => {
        this.showDetails.push(response);
      },
      (error) => {
        this.router.navigate(['/404']);
      }
    );
  }

  getshowEpisodes(): void {
    // get all the episodes of season for each show
    this.tvshowservice.getshowEpisdoes(this.id).subscribe((response) => {
      this.seasonsEpisodes = response;
      this.seasonsEpisodes.filter((seasonNo) => {
        this.noofSeasons.push(seasonNo.season);
      });
      this.noofSeasons = [...new Set(this.noofSeasons)];
    });
  }

  showSeason(season: number): void {
    // dynamic tabs data based on season
    this.seasonType = season;
  }
}
