import { NgModule } from '@angular/core';

import { StatisticsComponent } from './containers/statistics.component';
import { GodSharedModule } from '@god/god-shared';
import { StatisticsRoutingModule } from './statistics-routing.module';

@NgModule({
  imports: [GodSharedModule, StatisticsRoutingModule],
  exports: [],
  declarations: [StatisticsComponent],
  providers: []
})
export class StatisticsModule {}
