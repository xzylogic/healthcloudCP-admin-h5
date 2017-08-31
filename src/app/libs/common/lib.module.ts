import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdIconModule } from '@angular/material';

import { ContainerComponent } from './container/container.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { SearchService } from './search/search.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MdIconModule,
    RouterModule
  ],
  declarations: [
    ContainerComponent,
    SearchComponent
  ],
  providers: [
    SearchService,
    {provide: 'search', useClass: SearchService},
  ],
  exports: [
    MdIconModule,
    FormsModule,
    ContainerComponent,
    SearchComponent
  ]
})
export class LibModule {
}
