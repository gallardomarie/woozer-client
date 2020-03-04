import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/services/event.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidateHours } from './hour-validator';
import { EventObject } from '../event';
import { CacheService } from 'src/services/cache.service';
import { GroupService } from 'src/services/group.service';
import { ValidateGroup } from './group-validator';

@Component({
    selector: 'app-event-form',
    templateUrl: './event-form.component.html',
    styleUrls: ['./event-form.component.scss'],
    providers: [EventService]
})

export class EventFormComponent implements OnInit {

    eventId;
    groupId;
    event;
    formGroup;
    inGroup;
    groups;

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
        });
    }

    ngOnInit() {
        if (+this.groupId) {
            this.inGroup = true;
        } else {
            this.inGroup = false;
            const user = this.cache.getUser();
            this.groupService.findGroupsByUser(user.id).then(results => {
                this.groups = results;
            });
        }
        this.initFormGroup();
        if (this.eventId) {
            this.activeRoute.params.subscribe(
                params => {
                    this.eventService.findById(+params.eventId).then(event => {
                    this.event = event;
                    this.preremplissageForm();
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

    preremplissageForm() {
        let convertedDate = '';
        if (this.event.date) {
            convertedDate = this.convertDate(new Date(this.event.date));
        }
        this.formGroup.patchValue({
            nom : this.event.name,
            description: this.event.description,
            date: convertedDate,
            lieu: this.event.place,
            heure: this.event.hour
        });
    }

    saveEvent() {
        const event = this.convertToEventObject();
        if (this.inGroup) {
            this.eventService.save(event, +this.groupId);
            this.router.navigate(['woozer/event', {id: this.groupId}]);
        } else {
            this.eventService.save(event, +this.formGroup.controls.group.value);
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
        if (this.eventId) {
            event.id = this.eventId;
        }
        event.name = this.formGroup.controls.nom.value;
        event.description = this.formGroup.controls.description.value;
        this.formGroup.controls.date.value === '' ? event.date = null : event.date = this.formGroup.controls.date.value;
        this.formGroup.controls.heure.value === '' ? event.hour = null : event.hour = this.formGroup.controls.heure.value;
        event.place = this.formGroup.controls.lieu.value;
        return event;
    }

    createSondage(type) {
        this.router.navigate(['woozer/sondage', {sondageType: type}]);
    }

}
