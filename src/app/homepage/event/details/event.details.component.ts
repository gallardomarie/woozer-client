import {Component, OnInit} from '@angular/core';
import { EventService } from 'src/services/event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-event-details',
    templateUrl: './event.details.component.html',
    styleUrls: ['./event.details.component.scss'],
    providers: [EventService]
})

export class EventDetailsComponent implements OnInit {

    event: any;
    groupId;

    constructor(
        private eventService: EventService,
        private activeRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.activeRoute.params.subscribe(
            params => {
                this.groupId = params.groupId;
                this.eventService.findById(+params.eventId).then(event => {
                    this.event = event;
                });
            });
    }

}
