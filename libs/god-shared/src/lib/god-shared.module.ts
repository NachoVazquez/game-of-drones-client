import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { KeysPipe, KeysEasedPipe } from './pipes';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    RouterModule
  ],
  declarations: [
    //Components
    ConfirmDialogComponent,

    //Directives

    //Pipes
    KeysPipe,
    KeysEasedPipe
  ],
  exports: [
    //Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    NgxChartsModule,

    //Components
    ConfirmDialogComponent,

    //Directives

    //Pipes
    KeysPipe,
    KeysEasedPipe
  ]
})
export class GodSharedModule {}
