import { NgModule } from '@angular/core';
import { BannerComponent } from './banner.component';
import { RouterModule, Routes } from '@angular/router';
import { BannerService } from './_service/banner.service';
import { LibModule } from '../../../libs/common/lib.module';
import { BannerEditComponent } from './banner-edit/banner-edit.component';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { DFormModule } from '../../../libs/dform/dform.module';

const routes: Routes = [{
  path: '',
  component: BannerComponent
}, {
  path: 'edit',
  component: BannerEditComponent
}];

@NgModule({
  imports: [
    LibModule,
    DTableModule,
    DFormModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    BannerComponent,
    BannerEditComponent
  ],
  providers: [
    BannerService,
    {provide: 'banner', useClass: BannerService}
  ]
})
export class BannerModule {
}
