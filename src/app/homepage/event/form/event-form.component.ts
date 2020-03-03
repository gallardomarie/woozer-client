import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/services/event.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidateHours } from './hour-validator';
import { EventObject } from '../event';

@Component({
    selector: 'app-event-form',
    templateUrl: './event-form.component.html',
    styleUrls: ['./event-form.component.scss'],
    providers: [EventService]
})

export class EventFormComponent implements OnInit {

    eventId;
    event;
    formGroup;

    constructor(
        private eventService: EventService,
        private activeRoute: ActivatedRoute,
        private formBuilder: FormBuilder

    ) {
        this.activeRoute.params.subscribe(params => {
            this.eventId = params.eventId;
        });
    }

    ngOnInit() {
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
            heure: ['', ValidateHours]
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
        this.eventService.save(event);

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
        event.date = this.formGroup.controls.date.value;
        event.hour = this.formGroup.controls.heure.value;
        event.place = this.formGroup.controls.lieu.value;
        return event;
    }

}
