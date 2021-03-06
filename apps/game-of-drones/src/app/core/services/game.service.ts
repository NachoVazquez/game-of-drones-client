import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCrudService } from '@god/god-shared';
import { Game } from '../models/game.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { publishLast, catchError } from 'rxjs/operators';
import { retryBackoff } from 'backoff-rxjs';
import { Round } from '../models/round.model';

@Injectable({ providedIn: 'root' })
export class GameService extends BaseCrudService<Game, number> {
  constructor(private httpClient: HttpClient, protected snack: MatSnackBar) {
    super(environment.apiUrl + 'games', httpClient, snack);
  }

  createGameByPlayersNames(playersData: {
    player1Name: string;
    player2Name: string;
  }): Observable<Game> {
    return this.http
      .post<Game>(this.url + '/createByPlayersName', playersData)
      .pipe(
        catchError(error => this.handleError(error)),
        retryBackoff(this.retryConfig)
      );
  }

  createRound(roundToCreate: Round): Observable<Game> {
    return this.http.patch<Game>(this.url + '/createRound', roundToCreate).pipe(
      catchError(error => this.handleError(error)),
      retryBackoff(this.retryConfig)
    );
  }

  getGameWithPlayersById(id: number): Observable<Game> {
    return this.http.get<Game>(this.url + '/getGameWithPlayersById/' + id).pipe(
      catchError(error => this.handleError(error)),
      retryBackoff(this.retryConfig)
    );
  }
}
