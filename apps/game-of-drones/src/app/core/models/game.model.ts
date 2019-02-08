import { BaseEntity } from '@god/god-shared';

export interface Game extends BaseEntity<number> {
  Player1Id: number;
  Player2Id: number;
}
