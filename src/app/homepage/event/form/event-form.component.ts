import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/services/event.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidateHours } from './hour-validator';
import { EventObject } from '../event';
import { CacheService } from 'src/services/cache.service';
import { GroupService } from 'src/services/group.service';
import { ValidateGroup } from './group-validator';
import { IonContent } from '@ionic/angular';

@Component({
    selector: 'app-event-form',
    templateUrl: './event-form.component.html',
    styleUrls: ['./event-form.component.scss'],
    providers: [EventService]
})

export class EventFormComponent implements OnInit {

    @ViewChild(IonContent, null)
    private content: IonContent;

    eventId;
    groupId;
    event;
    formGroup;
    inGroup;
    groups;
    savedEvent;
    surveys = [];

    sondageDateBool = false;
    sondageDate;
    sondageLieuBool = false;
    sondageLieu;
    otherSondage = [];

    constructor(
        private eventService: EventService,
        private activeRoute: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private cache: CacheService,
        private groupService: GroupService
    ) {
        this.activeRoute.params.subscribe(params => {
            this.eventId = params.eventId;
            this.groupId = params.groupId;
            if (params.event !== undefined) {
                this.savedEvent = JSON.parse(params.event);
            }
        });
    }

    ngOnInit() {
        if (+this.groupId || this.eventId) {
            this.inGroup = true;
        } else {
            this.inGroup = false;
            const user = this.cache.getUser();
            this.groupService.findGroupsByUser(user.id).then(results => {
                this.groups = results;
            });
        }
        this.initFormGroup();
        if (this.savedEvent) {
            this.preremplissageForm(this.savedEvent);
            this.surveys = this.savedEvent.survey;
            this.initSurveys();
        } else if (this.eventId) {
            this.activeRoute.params.subscribe(
                params => {
                    this.eventService.findById(+params.eventId).then(event => {
                    this.event = event;
                    this.surveys = this.event.survey;
                    this.preremplissageForm(this.event);
                });
            });
        }
    }

    initFormGroup() {
        this.formGroup = this.formBuilder.group({
            nom: ['', Validators.required],
            description: ['', Validators.required],
            date: [''],
            lieu: [''],
            heure: ['', ValidateHours],
            group: ['', ValidateGroup.valid(this.inGroup)]
          });
        this.formGroup.patchValue({
              group: null
        });
    }

    preremplissageForm(event) {
        let convertedDate = '';
        if (event.date) {
            convertedDate = this.convertDate(new Date(event.date));
        }
        this.formGroup.patchValue({
            nom : event.name,
            description: event.description,
            date: convertedDate,
            lieu: event.place,
            heure: event.hour
        });
        this.initSurveys();
    }

    saveEvent() {
        const event = this.convertToEventObject();
        if (this.inGroup) {
            this.eventService.create(event, +this.groupId);
            this.router.navigate(['woozer/event', {id: this.groupId}]);
        } else {
            this.eventService.create(event, +this.formGroup.controls.group.value);
            this.router.navigate(['woozer/home']);
        }
    }

    convertDate(dateToConvert: Date) {
        let result = dateToConvert.getUTCFullYear() + '-';
        if ((dateToConvert.getMonth() + 1).toString().length === 1) {
            result += '0';
        }
        result += (dateToConvert.getMonth() + 1) + '-';
        if (dateToConvert.getDate().toString().length === 1) {
            result += '0';
        }
        result += dateToConvert.getDate();
        return result;
    }

    convertToEventObject() {
        const event = new EventObject(null, '', '');
        if (this.eventId && this.eventId !== 'undefined') {
            event.id = this.eventId;
        }
        event.name = this.formGroup.controls.nom.value;
        event.description = this.formGroup.controls.description.value;
        this.formGroup.controls.date.value === '' ? event.date = null : event.date = this.formGroup.controls.date.value;
        this.formGroup.controls.heure.value === '' ? event.hour = null : event.hour = this.formGroup.controls.heure.value;
        event.place = this.formGroup.controls.lieu.value;
        event.survey = this.surveys;
        return event;
    }

    createSondage(type) {
        const savedEvent = this.convertToEventObject();
        this.router.navigate(['woozer/sondage', {sondageType: type , event: JSON.stringify(savedEvent), groupId: this.groupId, eventId: this.eventId}]);
    }

    initSurveys() {
        this.otherSondage = [];
        if (this.surveys) {
            this.surveys.forEach(survey => {
                if (survey.typeSurvey === 'Date') {
                    this.sondageDateBool = true;
                    this.sondageDate = survey;
                    this.formGroup.patchValue({
                        date: null
                    });
                } else if (survey.typeSurvey === 'Lieu') {
                    this.sondageLieuBool = true;
                    this.sondageLieu = survey;
                    this.formGroup.patchValue({
                        lieu: null
                    });
                } else {
                    this.otherSondage.push(survey);
                }
            });
        }
    }

    deleteSondage(toDelete, name) {
        let index;
        this.surveys.forEach(survey => {
            if ( survey.typeSurvey === toDelete) {
                index = this.surveys.indexOf(survey);

                if ( survey.typeSurvey === 'Lieu') {
                    this.sondageLieuBool = false;
                    this.sondageLieu = null;
                    index = this.surveys.indexOf(survey);
                }

                if (survey.typeSurvey === 'Date') {
                    this.sondageDate = null;
                    this.sondageDateBool = false;
                    index = this.surveys.indexOf(survey);
                }

                if (survey.typeSurvey === 'generique' && name === survey.title) {
                    index = this.surveys.indexOf(survey);
                }
            }
        });
        this.surveys.splice(index, 1);
        this.initSurveys();
    }


}
