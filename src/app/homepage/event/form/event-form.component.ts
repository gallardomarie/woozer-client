import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/services/event.service';
import { FormBuilder, Validators } from '@angular/forms';

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
                    console.log(event);
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
            heure: ['']
          });
    }

    preremplissageForm() {
        console.log(new Date(this.event.date).toDateString());
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
        console.log('Je save ce qui se trouve dans le formGroup');
        // TODO la date doit être timestamp /!\ reformattage
    }

    convertDate(dateToConvert: Date) {
        let result = dateToConvert.getUTCFullYear() + '-';
        if((dateToConvert.getMonth()+1).toString().length == 1) {
            result+='0'
        }
        result+=(dateToConvert.getMonth()+1) + '-';
        if(dateToConvert.getDate().toString().length == 1) {
            result+='0';
        }       
        result += dateToConvert.getDate();
        return result;
    }

}
