import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TvshowService } from '../common/tvshow.service';

@Component({
  selector: 'app-tvshow-details',
  templateUrl: './tvshow-details.component.html',
  styleUrls: ['./tvshow-details.component.css'],
})
export class TvshowDetailsComponent implements OnInit {
  id: number;
  showDetails = [];
  showSummary;
  seasonsEpisodes;
  seasonType = 1;
  noofSeasons = [];

  constructor(
    private tvshowservice: TvshowService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // initial data to be loaded
    this.getshowDetails();
    this.getshowEpisodes();
  }

  getshowDetails(): void {
    // getting each show details
    this.router.params.subscribe((params) => {
      // tslint:disable-next-line: radix
      this.id = parseInt(params.id);
    });
    this.tvshowservice.getShowDetails(this.id).subscribe(
      (response) => {
        this.showDetails.push(response);
        this.showSummary = this.showDetails[0].summary.replace(
          /<\/?[^>]+(>|$)/g,
          ''
        );
      },
      (error) => {}
    );
  }

  getshowEpisodes(): void {
    // get all the episodes of season for each show
    this.tvshowservice.getshowEpisdoes(this.id).subscribe(
      (response) => {
        this.seasonsEpisodes = response;
        this.seasonsEpisodes.filter((seasonNo) => {
          this.noofSeasons.push(seasonNo.season);
        });
        this.noofSeasons = [...new Set(this.noofSeasons)];
      },
      (error) => {}
    );
  }

  showSeason(season): void {
    // dynamic tabs based on data
    console.log(season);
    this.seasonType = season;
  }
}
