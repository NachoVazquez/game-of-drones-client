import { HomeRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';

import { HomeComponent } from './containers/home.component';
import { GodSharedModule } from '@god/god-shared';

@NgModule({
  imports: [GodSharedModule, HomeRoutingModule],
  exports: [],
  declarations: [HomeComponent],
  providers: []
})
export class HomeModule {}
