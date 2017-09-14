import { NgModule } from '@angular/core';
import { MessageComponent } from './message.component';
import { RouterModule, Routes } from '@angular/router';
import { MessageService } from './_service/message.service';
import { LibModule } from '../../../libs/common/lib.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { MdCheckboxModule } from '@angular/material';

const routes: Routes = [{
  path: '',
  component: MessageComponent
}];

@NgModule({
  imports: [
    LibModule,
    DTableModule,
    MdCheckboxModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MessageComponent
  ],
  providers: [
    MessageService,
    {provide: 'message', useClass: MessageService}
  ]
})
export class MessageModule {
}
