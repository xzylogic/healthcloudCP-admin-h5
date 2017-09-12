import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'fullcalendar';
import { Options } from 'fullcalendar';

@Component({
  selector: 'app-calendar',
  template: `
    <div></div>`,
})
export class CalendarComponent implements OnInit, AfterViewInit {
  @Input() options: Options;
  text: string;

  constructor(
    private element: ElementRef
  ) {
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  ngAfterViewInit() {
    setTimeout(() => {
      $(this.element.nativeElement).fullCalendar(this.options);
    }, 100);
  }

  updateEvent(event) {
    return $(this.element.nativeElement).fullCalendar('updateEvent', event);
  }

  clientEvents(idOrFilter) {
    return $(this.element.nativeElement).fullCalendar('clientEvents', idOrFilter);
  }
}
