import { Round } from './../../../../core/models/round.model';
import { Game } from './../../../../core/models/game.model';
import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'god-game-over',
  templateUrl: 'game-over.component.html',
  styleUrls: ['game-over.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameOverComponent implements OnInit {
  @Input() currentGame$: Observable<Game>;

  constructor() {}

  ngOnInit() {}

  getRoundWinner(game: Game, round: Round): string {
    const wasPlayer1Winner = round.winnerMove === round.player1Move;

    return wasPlayer1Winner ? game.player1Name : game.player2Name;
  }

  getGameWinner(game: Game): string {
    console.log(game);

    const isPlayer1Winner = game.player1RoundsWon === game.roundsToWin;

    return isPlayer1Winner ? game.player1Name : game.player2Name;
  }
}
