import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CalendarView, CalendarDateFormatter, CalendarEvent } from 'angular-calendar';
import { CustomDateFormatter } from './calendar-formatter.provider';
import { Router, ActivatedRoute } from '@angular/router';
import { CacheService } from 'src/services/cache.service';
import { EventService } from 'src/services/event.service';


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
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.groupId = this.cache.getCache();
    if (this.groupId) {
      console.log('Je suis dans le groupe ' + this.groupId);
      this.eventService.findAllByGroupId(+this.groupId).then(result => {
        this.initEventsCalendar(result);
        this.sendEventsSansDate.emit(this.eventsSansDate);
      });
    } else {
      console.log('Je ne suis dans aucun groupe');
      // TODO: Remplacer par l'id de l'user connecté
      this.eventService.findByUserId(1).then(result => {
        this.initEventsCalendar(result);
      });
    }
  }

  dayClicked(event): void {
    if (event.events && event.events.length > 1) {
      console.log("Il y a au moins 2 évents");
    } else if (event.events && event.events.length === 1) {
      this.router.navigate(['/woozer/event/details', {eventId: event.events[0].id}]);
    }
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
