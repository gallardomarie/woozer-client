import {Component, OnInit} from '@angular/core';
import { EventService } from 'src/services/event.service';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss'],
    providers: [EventService]
})
export class EventComponent implements OnInit {

    private listEvent;

    constructor( private eventService: EventService) {}

    ngOnInit() {
        /** TODO : importer l'id du group pour récupérer ses events */
        this.eventService.findAllByGroupId(4).then(events => {
            this.listEvent = events;
            console.log(this.listEvent);
        });
    }
}
