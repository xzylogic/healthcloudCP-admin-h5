import { NgModule } from '@angular/core';
import { MdDialog, MdDialogModule } from '@angular/material';
import { DFormModule } from '../dform/dform.module';
import { DialogEditComponent } from './dialog-edit.component';

export * from './dialog-edit.component';

@NgModule({
  imports: [
    MdDialogModule,
    DFormModule
  ],
  declarations: [
    DialogEditComponent
  ],
  entryComponents: [
    DialogEditComponent
  ],
  exports: [
    DFormModule,
    MdDialogModule,
    DialogEditComponent,
  ],
  providers: [
    MdDialog
  ]
})
export class LibDialogEditModule {
}
