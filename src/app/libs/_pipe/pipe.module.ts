import { NgModule } from '@angular/core';
import { DatexPipe } from './datex.pipe';
import { YesornoPipe } from './yesorno.pipe';

@NgModule({
  declarations: [
    DatexPipe,
    YesornoPipe
  ],
  exports: [
    DatexPipe,
    YesornoPipe
  ]
})
export class PipeModule {
}
