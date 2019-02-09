import { BaseEntity } from '@god/god-shared';
import { Round } from './round.model';

export interface Game extends BaseEntity<number> {
  player1Id: number;
  player2Id: number;
  player1Name: string;
  player2Name: string;

  player1RoundsWon: number;
  player2RoundsWon: number;

  rounds: Round[];
}
