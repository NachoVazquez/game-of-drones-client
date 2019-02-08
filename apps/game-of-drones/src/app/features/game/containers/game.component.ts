import { GameService } from './../../../core/services/game.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Game } from '../../../core/models/game.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'god-rounds',
  templateUrl: 'game.component.html'
})
export class GameComponent implements OnInit {
  protected currentGame$: Observable<Game>;

  constructor(
    private route: ActivatedRoute,
    protected gameService: GameService
  ) {}

  ngOnInit() {
    this.currentGame$ = this.route.paramMap.pipe(
      switchMap(params => {
        const gameId = +params.get('id');
        return this.gameService.get(gameId);
      })
    );
  }
}
