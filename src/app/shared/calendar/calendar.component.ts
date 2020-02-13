import { Component, OnInit } from '@angular/core';
import { CalendarView, CalendarDateFormatter } from 'angular-calendar';
import { CustomDateFormatter } from './calendar-formatter.provider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class CalendarComponent implements OnInit {

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  /**
   * TODO
   * Importer les events de la base de données
   * Peut utiliser CalendarEvent ??
   */

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
  } 

  dayClicked(event): void {
    console.log('Je clique sur une date du calendrier = ' + event.date);
    /**
     * TODO
     * Si event : On ouvre une popup avec les events présents en ce jour
     * (Rappel : la date possède un esthétique particulier)
     */
  }

  createEvent() {
    this.router.navigateByUrl('/woozer/event/form');
  }
}
