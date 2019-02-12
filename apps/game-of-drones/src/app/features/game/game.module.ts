import { GodSharedModule } from '@god/god-shared';
import { NgModule } from '@angular/core';

import { RoundItemComponent } from './presentational/round-item/round-item.component';
import { RoundComponent } from './presentational/round/round.component';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './containers/game.component';
import { GameOverComponent } from './presentational/game-over/game-over.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [GodSharedModule, GameRoutingModule, RouterModule],
  exports: [],
  declarations: [
    GameComponent,
    RoundItemComponent,
    RoundComponent,
    GameOverComponent
  ],
  providers: []
})
export class GameModule {}
