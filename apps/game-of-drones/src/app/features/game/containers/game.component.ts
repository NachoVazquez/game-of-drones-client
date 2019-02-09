import { GameService } from './../../../core/services/game.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, share } from 'rxjs/operators';
import { Game } from '../../../core/models/game.model';
import { Observable } from 'rxjs';
import { Round } from '../../../core/models/round.model';

@Component({
  selector: 'god-rounds',
  templateUrl: 'game.component.html'
})
export class GameComponent implements OnInit {
  protected currentGame$: Observable<Game>;
  protected gameId: number;

  constructor(
    private route: ActivatedRoute,
    protected gameService: GameService
  ) {}

  ngOnInit() {
    this.currentGame$ = this.getGameFromUrl().pipe(share());
  }

  private getGameFromUrl(): Observable<Game> {
    return this.route.paramMap.pipe(
      switchMap(params => {
        this.gameId = +params.get('id');
        return this.gameService.get(this.gameId);
      })
    );
  }

  completeRound(round: Round) {
    this.gameService
      .createRound(round)
      .pipe(switchMap(() => this.gameService.get(this.gameId)));
  }
}
