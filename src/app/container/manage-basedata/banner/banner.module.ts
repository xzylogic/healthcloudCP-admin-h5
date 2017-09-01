import { NgModule } from '@angular/core';
import { BannerComponent } from './banner.component';
import { RouterModule, Routes } from '@angular/router';
import { BannerService } from './_service/banner.service';
import { LibModule } from '../../../libs/common/lib.module';

const routes: Routes = [{
  path: '',
  component: BannerComponent
}];

@NgModule({
  imports: [
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    BannerComponent
  ],
  providers: [
    BannerService,
    {provide: 'banner', useClass: BannerService}
  ]
})
export class BannerModule {
}
