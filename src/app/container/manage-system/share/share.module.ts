import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { LibModule } from '../../../libs/common/lib.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { ShareService } from './_service/share.service';
import { ShareComponent } from './share.component';

const routes: Routes = [{
  path: '',
  component: ShareComponent
}];

@NgModule({
  imports: [
    LibModule,
    DTableModule,
    DFormModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ShareComponent
  ],
  providers: [
    ShareService,
    {provide: 'share', useClass: ShareService},
  ]
})
export class ShareModule {
}
