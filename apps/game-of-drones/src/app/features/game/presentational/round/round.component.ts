import { Game } from './../../../../core/models/game.model';
import { Round } from './../../../../core/models/round.model';
import { PlayerMoves } from './../../../../core/models/enums/player-moves.enum';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { Observable, config } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'god-round',
  templateUrl: 'round.component.html',
  styleUrls: ['round.component.scss']
})
export class RoundComponent implements OnInit, OnDestroy {
  @Input() roundNumber = 1;
  @Input() currentGame$: Observable<Game>;
  @Input() roundReset$: Observable<number>;

  @Output() completeRound: EventEmitter<Round> = new EventEmitter();

  player1Move: PlayerMoves;
  player2Move: PlayerMoves;

  constructor(protected snack: MatSnackBar) {}

  ngOnInit() {
    if (this.roundReset$)
      this.roundReset$
        .pipe(untilDestroyed(this))
        .subscribe(resetRoundNumber => {
          if (resetRoundNumber && resetRoundNumber === this.roundNumber) {
            this.snack.open(
              'THERE WAS A TIE!!! PLAY UNTIL WE HAVE A WINNER!!',
              'close',
              { duration: 3500 }
            );

            this.player1Move = null;
            this.player2Move = null;
          }
        });

    if (this.currentGame$) this.currentGame$.subscribe(game => {});
  }

  player1MoveSelected(move: PlayerMoves) {
    this.player1Move = move;
  }

  player2MoveSelected(move: PlayerMoves) {
    this.player2Move = move;
    this.completeRound.emit({
      player1Move: this.player1Move,
      player2Move: this.player2Move
    });
  }

  ngOnDestroy(): void {}
}
