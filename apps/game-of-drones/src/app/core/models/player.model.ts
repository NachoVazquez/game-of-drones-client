import { BaseEntity } from '@god/god-shared';

export interface Player extends BaseEntity<number> {
  userName: string;
  gamesWon: number;
  gamesLost: number;
  roundsWon: number;
  roundsLost: number;
}
