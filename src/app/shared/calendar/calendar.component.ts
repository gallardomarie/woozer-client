import { Component, OnInit } from '@angular/core';
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

  /**
   * TODO
   * Importer les events de la base de données
   * Peut utiliser CalendarEvent ??
   */
  events: CalendarEvent[] = [];

  colors: any = {
    blue: {
      primary: '#13A3C8',
    },
  };

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
      });
    } else {
      console.log('Je ne suis dans aucun groupe');
    }
  }

  dayClicked(event): void {
    console.log('Je clique sur une date du calendrier = ' + event.date);
    /**
     * TODO
     * Si event : On ouvre une popup avec les events présents en ce jour
     * Sinon on se rend directement sur l'évent en question
     */
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
      this.events = [
        ...this.events,
        {
          title: event.description,
          start: event.date,
        }
      ];
      });
  }
}
