import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatIconModule } from '@angular/material';
import { DTreeExampleComponent } from './drtee-example.component';
import { DTreeChildComponent } from './dtree-child.component';
import { DTreeComponent } from './dtree.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule
  ],
  declarations: [
    DTreeChildComponent,
    DTreeComponent,
    DTreeExampleComponent
  ],
  exports: [
    DTreeChildComponent,
    DTreeComponent,
    DTreeExampleComponent
  ]
})
export class DtreeModule {
}
