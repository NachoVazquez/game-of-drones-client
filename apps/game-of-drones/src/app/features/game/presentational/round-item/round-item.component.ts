import { PlayerMoves } from './../../../../core/models/enums/player-moves.enum';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'god-round-item',
  templateUrl: 'round-item.component.html',
  styleUrls: ['round-item.component.scss']
})
export class RoundItemComponent implements OnInit {
  @Input() playerName: string;
  @Input() previousRoundMove: PlayerMoves = null;

  @Output() moveSelected: EventEmitter<PlayerMoves> = new EventEmitter();

  selectedMove: PlayerMoves;

  playerMoves = PlayerMoves;

  constructor() {}

  ngOnInit() {}

  selectMove() {
    this.moveSelected.emit(this.selectedMove);
  }
}
