import { GodSharedModule } from '@god/god-shared';
import { NgModule } from '@angular/core';

import { RoundItemComponent } from './presentational/round-item/round-item.component';
import { RoundComponent } from './presentational/round/round.component';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './containers/game.component';

@NgModule({
  imports: [GodSharedModule, GameRoutingModule],
  exports: [],
  declarations: [GameComponent, RoundItemComponent, RoundComponent],
  providers: []
})
export class RoundsModule {}
