import { Injectable } from '@angular/core';
import { Constants } from 'src/app/config/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TvshowService {
  constructor(private http: HttpClient, public constant: Constants) {}

  public getAllShows(): Observable<any> {
    // get all shows
    return this.http.get(`${this.constant.APIAllShows}shows`);
  }

  public getShowDetails(id: number): Observable<any> {
    // get show details by id
    return this.http.get(`${this.constant.APIAllShows}shows/${id}`);
  }

  public getshowEpisdoes(id: number): Observable<any> {
    // get all episodes of show
    return this.http.get(`${this.constant.APIAllShows}shows/${id}/episodes`);
  }

  public searchResults(searchString: string): Observable<any> {
    // getting shows by filter
    return this.http.get(
      `${this.constant.APIAllShows}search/shows?q=${searchString}`
    );
  }
}
