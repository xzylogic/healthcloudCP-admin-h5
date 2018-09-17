import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tree-node',
  templateUrl: './treenode.component.html',
  styleUrls: ['./treenode.component.scss']
})
export class TreenodeComponent {
  @Input() menu: any;
  @Input() permission: any;
  @Output() toggleEmitter: EventEmitter<any> = new EventEmitter();
  @Output() newEmitter: EventEmitter<any> = new EventEmitter();
  @Output() updateEmitter: EventEmitter<any> = new EventEmitter();

  toggle(menu) {
    this.toggleEmitter.emit(menu);
  }

  new(menu) {
    this.newEmitter.emit(menu);
  }

  update(menu) {
    this.updateEmitter.emit(menu);
  }
}
