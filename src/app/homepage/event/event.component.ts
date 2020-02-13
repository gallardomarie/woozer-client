import {Component, OnInit} from '@angular/core';
import { EventService } from 'src/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss'],
    providers: [EventService]
})
export class EventComponent implements OnInit {

    private listEvent;

    constructor(
        private eventService: EventService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(
            params => {
                this.eventService.findAllByGroupId(+params.groupId).then(events => {
                    this.listEvent = events;
                });
            }
        );
    }

    openDetailsEvent(eventId) {
        this.router.navigate(['/woozer/event/details'], {queryParams: {eventId: eventId}});
    }
}
