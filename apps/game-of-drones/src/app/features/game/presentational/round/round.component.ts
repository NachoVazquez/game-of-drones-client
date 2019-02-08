import { PlayerMoves } from './../../../../core/models/enums/player-moves.enum';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'god-round',
  templateUrl: 'round.component.html'
})
export class RoundComponent implements OnInit {
  @Input() roundNumber = 1;

  player1Move: PlayerMoves;
  player2Move: PlayerMoves;

  constructor() {}

  ngOnInit() {}
}
