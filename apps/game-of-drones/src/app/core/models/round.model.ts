import { PlayerMoves } from './enums/player-moves.enum';
import { BaseEntity } from '@god/god-shared';
export interface Round extends BaseEntity<number> {
  player1Move: PlayerMoves;
  player2Move: PlayerMoves;
  winnerMove?: PlayerMoves;
  gameId?: number;
}
