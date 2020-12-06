import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { TvshowService } from '../common/tvshow.service';

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.css'],
})
export class TvshowsComponent implements OnInit {
  public allShows = [];
  public showGenreBased = [];
  public selectedShows = [];
  public selectedGenre = 'Popular Shows';
  public selectedValue = 'category';
  public showName = '';
  public page = 1;
  public count = 0;
  public tableSize = 8;
  public searchString = '';
  faSearch = faSearch;

  constructor(private tvshowservice: TvshowService, private router: Router) {}

  ngOnInit(): void {
    this.getAllShows(''); // initial data to be loaded
  }

  getAllShows(selectedGenre): void {
    // getting all the shows
    this.selectedShows = [];
    this.tvshowservice.getAllShows().subscribe(
      (response) => {
        this.allShows = response;
        this.allShows.filter((show: any) => {
          show.genres.filter((genre: any) => {
            this.showGenreBased.push(genre);
            if (selectedGenre === genre) {
              this.selectedShows.push(show);
            }
          }, this);
        });
        if (selectedGenre !== '') {
          this.allShows = this.selectedShows;
        }
        this.showGenreBased = [...new Set(this.showGenreBased)];
      },
      (error) => {}
    );
  }

  chooseGenre(e: any): void {
    // Selecting genre from list of categories
    this.selectedGenre = e.target.value;
    this.showName = '';
    this.getAllShows(this.selectedGenre);
  }

  resetFilter(): void {
    // Remove filter
    this.selectedGenre = '';
    this.getAllShows(this.selectedGenre);
    this.selectedValue = 'category';
    this.selectedGenre = 'Popular Shows';
    this.showName = '';
    this.page = 1;
  }

  getShowDetails(id): void {
    // navigate to show details page
    // tslint:disable-next-line: radix
    this.router.navigate(['/showDetails', parseInt(id)]);
  }

  filterItem(value): void {
    // Filter items based on search
    this.searchString = value;

    if (!value) {
      this.getAllShows('');
      this.selectedGenre = 'Popular Shows';
    } // when nothing has typed

    this.selectedValue = 'category';
    this.tvshowservice.searchResults(value).subscribe(
      (response) => {
        this.allShows = response;
        this.allShows = this.allShows.map((item) => item.show);
      },
      (error) => {}
    );
  }

  onDataChange(event): void {
    this.page = event;
    // this.showName = '';
    if (this.searchString) {
      this.filterItem(this.searchString);
    } else {
      this.getAllShows('');
    }
  }
}
