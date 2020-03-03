import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CalendarView, CalendarDateFormatter, CalendarEvent } from 'angular-calendar';
import { CustomDateFormatter } from './calendar-formatter.provider';
import { Router, ActivatedRoute } from '@angular/router';
import { CacheService } from 'src/services/cache.service';
import { EventService } from 'src/services/event.service';
import { MatDialog } from '@angular/material/dialog';
import {CalendarEventPopupComponent} from '../popup/calendar-event/calendar-event-popup.component';


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
  groupId: string;

  events: CalendarEvent[] = [];
  eventsSansDate: Event[] = [];
  @Output() sendEventsSansDate = new EventEmitter<Event[]>();

  constructor(
    private router: Router ,
    private activeRoute: ActivatedRoute,
    private cache: CacheService,
    private eventService: EventService,
    public matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.groupId = this.cache.getCache();
    if (this.groupId) {
      this.eventService.findAllByGroupId(+this.groupId).then(result => {
        this.initEventsCalendar(result);
        this.sendEventsSansDate.emit(this.eventsSansDate);
      });
    } else {
      // TODO: Remplacer par l'id de l'user connecté
      this.eventService.findByUserId(1).then(result => {
        this.initEventsCalendar(result);
      });
    }
  }

  dayClicked(event): void {
    if (event.events && event.events.length > 1) {
      this.openDialog(event.events);
    } else if (event.events && event.events.length === 1) {
      this.router.navigate(['/woozer/event/details', {eventId: event.events[0].id}]);
    }
  }

  openDialog(events) {
    this.matDialog.open(CalendarEventPopupComponent, {
      width: '250px',
      data: {data: events}
    });
  }

  createEvent() {
    this.router.navigateByUrl('/woozer/event/form');
  }

  /**
   * Initialisation de l'affichage des events sur le calendrier
   * @param events les events a afficher
   */
  initEventsCalendar(events) {
    events.forEach(event => {
      if (event.date) {
         this.events = [
        ...this.events,
        {
          title: event.description,
          start: event.date,
          id: event.id
        }
      ];
      } else {
        this.eventsSansDate.push(event);
      }
      });
  }
}
