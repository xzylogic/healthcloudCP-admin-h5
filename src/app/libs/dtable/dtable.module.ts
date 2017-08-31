import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdIconModule } from '@angular/material';

import { DTableComponent } from './dtable.component';
import { DPageComponent } from './page.component';

export * from './dtable.entity';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdIconModule
  ],
  declarations: [
    DTableComponent,
    DPageComponent
  ],
  exports: [
    CommonModule,
    MdButtonModule,
    MdIconModule,
    DTableComponent,
    DPageComponent
  ]
})
export class DTableModule {
}
