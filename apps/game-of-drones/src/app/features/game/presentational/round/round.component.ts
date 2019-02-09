import { Game } from './../../../../core/models/game.model';
import { Round } from './../../../../core/models/round.model';
import { PlayerMoves } from './../../../../core/models/enums/player-moves.enum';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'god-round',
  templateUrl: 'round.component.html'
})
export class RoundComponent implements OnInit {
  @Input() roundNumber = 1;
  @Input() currentGame$: Observable<Game>;

  @Output() completeRound: EventEmitter<Round> = new EventEmitter();

  player1Move: PlayerMoves;
  player2Move: PlayerMoves;

  constructor() {}

  ngOnInit() {}

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
}
