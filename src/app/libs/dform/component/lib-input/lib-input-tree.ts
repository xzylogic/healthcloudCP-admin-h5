import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormTree } from '../../_entity/form-tree';

@Component({
  selector: 'app-input-tree',
  template: `
    <div [formGroup]="form">
      <div class="input_container">
        <section calss="input_content">
          <div class="clear">
            <md-icon style="float:left" *ngIf="!data.options.open" (click)="toggle(data.options)">add</md-icon>
            <md-icon style="float:left" *ngIf="data.options.open" (click)="toggle(data.options)">remove</md-icon>
            <div style="float:left">
              <md-checkbox [(checked)]="data.options.checked" (change)="getChecked($event, data.options)">
                {{data.options.menuName}}
              </md-checkbox>
              <div *ngIf="data.options.open&&data.options.children">
                <div *ngFor="let opt of data.options.children" class="clear">
                  <md-icon style="float:left" *ngIf="!opt.open" (click)="toggle(opt)">add</md-icon>
                  <md-icon style="float:left" *ngIf="opt.open" (click)="toggle(opt)">remove</md-icon>
                  <div style="float:left">
                    <md-checkbox [(checked)]="opt.checked" (change)="getChecked($event, opt)">
                      {{opt.menuName}}
                    </md-checkbox>
                    <div *ngIf="opt.open&&opt.children">
                      <div *ngFor="let subopt of opt.children" class="clear">
                        <md-icon style="float:left">remove</md-icon>
                        <div style="float:left">
                          <md-checkbox [(checked)]="subopt.checked" (change)="getChecked($event, subopt)">
                            {{subopt.menuName}}
                          </md-checkbox>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <span class="input_span">{{data.label}}</span>
        <input type="hidden" [formControlName]="data.key" [(ngModel)]="value" (change)="change()">
        <!--<p *ngIf="this.value.length===0">{{data.errMsg}}</p>-->
      </div>
    </div>
  `,
  styleUrls: ['./lib-input.scss']
})
export class LibInputTreeComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() data: FormTree;
  @Input() value: Array<any>;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('date') date: any;

  constructor() {
  }

  ngOnInit() {
    console.log(this.data.options);
    this.setInit(this.data.options);
    console.log(this.data.options);
  }

  getChecked(div, opt) {
    if (div.checked) {
      this.setChecked(opt);
      this.setParentChecked(opt.parentId);
    } else {
      this.setUnChecked(opt);
      this.setParentUnChecked(opt);
    }
  }

  setInit(data) {
    data.open = false;
    if (data.children && data.children.length !== 0) {
      data.children.forEach(obj => {
        this.setInit(obj);
      });
    }
  }

  setChecked(data) {
    data.checked = true;
    if (data.children && data.children.length !== 0) {
      data.children.forEach(obj => {
        this.setChecked(obj);
      });
    }
  }

  setParentChecked(pid) {
    if (this.data.options.menuId === pid) {
      this.data.options.checked = true;
    }
    this.data.options.children.forEach(obj => {
      if (obj.menuId === pid) {
        obj.checked = true;
        this.setParentChecked(obj.parentId);
      }
      if (obj.children && obj.children.length !== 0) {
        obj.children.forEach(subObj => {
          if (subObj.menuId === pid) {
            subObj.checked = true;
            this.setParentChecked(subObj.parentId);
          }
        });
      }
    });
  }

  setUnChecked(data) {
    data.checked = false;
    if (data.children && data.children.length !== 0) {
      data.children.forEach(obj => {
        this.setUnChecked(obj);
      });
    }
  }

  setParentUnChecked(opt) {
    this.data.options.children.forEach(obj => {
      if (obj.children && obj.children.length !== 0) {
        obj.children.forEach(subObj => {
          if (subObj.parentId === opt.parentId) {
            let flag = 0;
            if (obj.children && obj.children.length !== 0) {
              obj.children.forEach(pobj => {
                if (pobj.checked && pobj.menuId !== opt.parentId) {
                  flag++;
                }
              });
            }
            obj.checked = flag > 0;
            this.setParentUnChecked(obj);
          }
        });
        if (obj.parentId === opt.parentId) {
          let flag = 0;
          this.data.options.children.forEach(pobj => {
            if (pobj.checked && pobj.menuId !== opt.parentId) {
              flag++;
            }
          });
          this.data.options.checked = flag > 0;
        }
      }
    });
  }

  toggle(data) {
    data.open = !data.open;
  }

  change() {
    this.valueChange.emit(this.value);
  }
}
