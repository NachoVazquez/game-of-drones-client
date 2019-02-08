import { GodSharedModule } from '@god/god-shared';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { AntToolbarComponent } from './components/main-menu/toolbar.component';
import { ContentComponent } from './components/content/content.component';
import { NavVerticalItemComponent } from './components/side-nav/nav-vertical-item.component';

@NgModule({
  imports: [CommonModule, GodSharedModule, RouterModule],
  exports: [
    LayoutComponent,
    AntToolbarComponent,
    ContentComponent,
    NavVerticalItemComponent
  ],
  declarations: [
    LayoutComponent,
    AntToolbarComponent,
    ContentComponent,
    NavVerticalItemComponent
  ],
  providers: []
})
export class LayoutModule {}
