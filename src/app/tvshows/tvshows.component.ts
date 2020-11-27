import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { TvshowService } from '../common/tvshow.service';

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.css'],
})
export class TvshowsComponent implements OnInit {
  allShows = [];
  error: string;
  showGenreBased = [];
  selectedGenre = 'Popular Shows';
  selectedShows = [];
  selectedValue = 'Category';
  searchData = [];
  @ViewChild('myInput')
  myInputVariable: ElementRef;
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
      (error) => {
        this.error = error;
      }
    );
  }

  chooseGenre(e: any): void {
    // Selecting genre from list of categories
    this.selectedGenre = e.target.value;
    this.myInputVariable.nativeElement.value = '';
    this.getAllShows(this.selectedGenre);
  }

  resetFilter(): void {
    // Remove filter
    this.selectedGenre = '';
    this.getAllShows(this.selectedGenre);
    this.selectedValue = 'Category';
    this.selectedGenre = 'Popular Shows';
    this.myInputVariable.nativeElement.value = '';
  }

  getShowDetails(id): void {
    // navigate to show details page
    // tslint:disable-next-line: radix
    this.router.navigate(['/showDetails', parseInt(id)]);
  }

  filterItem(value): void {
    // Filter items based on search
    if (!value) {
      this.getAllShows('');
      this.selectedGenre = 'Popular Shows';
      this.selectedValue = 'Category';
    } // when nothing has typed

    this.tvshowservice.searchResults(value).subscribe(
      (response) => {
        this.allShows = response;
        this.allShows = this.allShows.map((item) => item.show);
      },
      (error) => {}
    );
  }
}
