import {Component, OnInit} from '@angular/core';
import { EventService } from 'src/services/event.service';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from 'src/services/cache.service';
import { GroupService } from 'src/services/group.service';
import { SurveyOption } from '../sondage/survey_options';

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
        private activeRoute: ActivatedRoute,
        private cache: CacheService
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

    voter(event, option, sondage) {
        let vote: SurveyOption;
        if (event.detail.checked) {
            this.event.survey.forEach(survey => {
                if (survey.id === sondage) {
                    survey.options.forEach(o => {
                        if (o.id === option) {
                            o.votes.push(this.cache.getUser());
                            vote = o;
                        }
                    });
                }
            });
            vote.nbVotes += 1 ;
            this.eventService.voter(vote);

        } else {
            console.log('jenleve mon vote');
        }
    }

    isChecked(option: SurveyOption) {
        const user = this.cache.getUser();
        let retour = false;
        option.votes.forEach(vote => {
            if (vote.email === user.email) {
                retour = true;
            }
        });
        return retour;
    }
}
