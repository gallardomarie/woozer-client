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

    surveyLieu;
    surveyDate;
    otherSurvey = [];

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
                    this.initSurvey(this.event.survey);
                });
            });
    }

    initSurvey(surveys) {
        if ( surveys ) {
            surveys.forEach(survey => {
                if (survey.typeSurvey === 'Lieu') {
                    this.surveyLieu = survey;
                } else if (survey.typeSurvey === 'Date') {
                    this.surveyDate = survey;
                } else {
                    this.otherSurvey.push(survey);
                }
            });
        }
    }

}
