import {Component, OnInit, ViewChild} from '@angular/core';
import { EventService } from 'src/services/event.service';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from 'src/services/cache.service';
import { SurveyOption } from '../sondage/survey_options';
import { IonContent } from '@ionic/angular';

@Component({
    selector: 'app-event-details',
    templateUrl: './event.details.component.html',
    styleUrls: ['./event.details.component.scss'],
    providers: [EventService]
})

export class EventDetailsComponent implements OnInit {

    @ViewChild(IonContent, null)
    private content: IonContent;

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
                    this.initParticipation();
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
        console.log(this.event);
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
            this.event.survey.forEach(survey => {
                if (survey.id === sondage) {
                    survey.options.forEach(o => {
                        if (o.id === option) {
                            const index = o.votes.indexOf(this.cache.getUser());
                            o.votes.splice(index, 1);
                            vote = o;
                        }
                    });
                }
            });
            vote.nbVotes -= 1 ;
            this.eventService.voter(vote);
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

    jeParticipe() {
        const participants = this.event.participant;
        const user = this.cache.getUser();
        const index = this.userInParticipant(participants, user);
        if (index < 0) {
            // user pas présent dans les participants donc on l'ajoute
            participants.push(user);
            this.event.participant = participants;
            this.eventService.create(this.event, this.groupId);
            this.adaptColorIcon(true);
        }
    }

    jeNeParticipePas() {
        const participants = this.event.participant;
        const user = this.cache.getUser();
        const index = this.userInParticipant(participants, user);
        if (index >= 0 ) {
            // user présent donc on le supprime
            participants.splice(index, 1);
            this.event.participant = participants;
            this.eventService.create(this.event, this.groupId);
            this.adaptColorIcon(false);
        }
    }

    initParticipation() {
        const user = this.cache.getUser();
        const userInParticipant = this.userInParticipant(this.event.participant, user);
        const participe = userInParticipant === -1 ? false : true;
        this.adaptColorIcon(participe);
    }

    adaptColorIcon(participe: boolean) {
        const iconParticipe = document.getElementById('participe');
        const iconParticipePas = document.getElementById('participePas');
        if (participe) {
            iconParticipe.style.color = '#13A3C8';
            iconParticipePas.style.color = 'grey';
        } else {
            iconParticipe.style.color = 'grey';
            iconParticipePas.style.color = '#13A3C8';
        }
    }

    userInParticipant(participants, user) {
        let index = 0;
        let result = -1;
        participants.forEach(participant => {
            if ((participant.id === user.id) && (participant.email === user.email)) {
                result = index;
            }
            index++;
        });
        return result;
    }

}
