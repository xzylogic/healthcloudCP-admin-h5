import { NgModule } from '@angular/core';
import { MenuComponent } from './menu.component';
import { RouterModule, Routes } from '@angular/router';
import { MenuService } from './_service/menu.service';
import { LibModule } from '../../../libs/common/lib.module';

const routes: Routes = [{
  path: '',
  component: MenuComponent
}];

@NgModule({
  imports: [
    LibModule,
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
