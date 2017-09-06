import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MdButtonModule, MdGridListModule } from '@angular/material';
import { MenuComponent } from './menu.component';
import { MenuService } from './_service/menu.service';
import { LibModule } from '../../../libs/common/lib.module';
import { DFormModule } from '../../../libs/dform/dform.module';

const routes: Routes = [{
  path: '',
  component: MenuComponent
}];

@NgModule({
  imports: [
    CommonModule,
    LibModule,
    DFormModule,
    MdGridListModule,
    MdButtonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MenuComponent
  ],
  providers: [
    MenuService,
    {provide: 'menu', useClass: MenuService}
  ]
})
export class MenuModule {
}
