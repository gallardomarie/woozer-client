import {Component, OnInit, ViewChild} from '@angular/core';
import { EventService } from 'src/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from '../groupe/group';
import { GroupService } from 'src/services/group.service';
import {IonContent} from '@ionic/angular';

@Component({
    selector: 'app-event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss'],
    providers: [EventService],
})
export class EventListComponent implements OnInit {

    @ViewChild(IonContent, null)
    private content: IonContent;

    listEvent;
    group: Group;
    groupId;

    constructor(
        private eventService: EventService,
        private groupService: GroupService,
        private activeRoute: ActivatedRoute,
        private router: Router,
    ) {
        this.activeRoute.params.subscribe(params => {
            this.groupId = params.id;
        });
    }

    ngOnInit() {
        this.groupService.findGroupById(this.groupId).then((group) => {
            this.group = group;
            this.eventService.findAllByGroupId(this.group.id).then(events => {
                this.listEvent = events;
            });
        });
    }

}
