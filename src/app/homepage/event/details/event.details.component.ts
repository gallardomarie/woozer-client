import {Component, OnInit} from '@angular/core';
import { EventService } from 'src/services/event.service';

@Component({
    selector: 'app-event-details',
    templateUrl: './event.details.component.html',
    styleUrls: ['./event.details.component.scss'],
    providers: [EventService]
})

export class EventDetailsComponent implements OnInit {

    event: any;

    constructor( private eventService: EventService) {}

    ngOnInit() {
        /** TODO : importer l'id de l'event concerné pour récupérer ses détails */
        this.eventService.findById(1).then(event => {
            this.event = event;
            console.log(event);
        });
    }
}
