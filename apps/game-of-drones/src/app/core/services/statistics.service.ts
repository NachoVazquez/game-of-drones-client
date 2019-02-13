import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '@god/god-shared';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { GlobalStatistics } from '../models/global-statistics.model';
import { retryBackoff } from 'backoff-rxjs';
import { catchError } from 'rxjs/operators';
import { PlayerStatistics } from '../models/player-stats.model';

@Injectable({ providedIn: 'root' })
export class StatisticsService extends BaseCrudService<unknown, unknown> {
  constructor(private httpClient: HttpClient, private snackbar: MatSnackBar) {
    super(environment.apiUrl + 'Statistics', httpClient, snackbar);
  }

  public getGlobalStatistics(): Observable<GlobalStatistics> {
    return this.http
      .get<GlobalStatistics>(this.url + '/GetGlobalStatistics')
      .pipe(
        catchError(this.handleError),
        retryBackoff(this.retryConfig)
      );
  }

  getPlayerStatistics(playerName: string): Observable<PlayerStatistics> {
    return this.http
      .get<PlayerStatistics>(this.url + '/GetPlayerStatistics/' + playerName)
      .pipe(
        catchError(this.handleError),
        retryBackoff(this.retryConfig)
      );
  }
}
