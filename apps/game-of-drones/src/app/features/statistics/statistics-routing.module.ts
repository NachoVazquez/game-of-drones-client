import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticsComponent } from './containers/statistics.component';

const routes: Routes = [{ path: '', component: StatisticsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: []
})
export class StatisticsRoutingModule {}
