import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatIconModule } from '@angular/material';

import { DTableComponent } from './dtable.component';
import { DPageComponent } from './page.component';
import { PipeModule } from '../_pipe/pipe.module';

export * from './dtable.entity';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    PipeModule,
    FormsModule,
    MatCheckboxModule
  ],
  declarations: [
    DTableComponent,
    DPageComponent
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    DTableComponent,
    DPageComponent,
    PipeModule
  ]
})
export class DTableModule {
}
