import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { EventObject } from '../event';
import { Survey } from './survey';
import { SurveyOption } from './survey_options';
import { IonContent } from '@ionic/angular';

@Component({
    selector: 'app-sondage',
    templateUrl: './sondage.component.html',
    styleUrls: ['./sondage.component.scss'],
})
export class SondageComponent implements OnInit {

    @ViewChild(IonContent, null)
    private content: IonContent;

    eventId;
    sondageType;
    formGroup;
    allOptions: FormGroup[] = [];
    typeInput;
    generique;
    event: EventObject;
    groupId;

    constructor(
        private activeRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
        this.activeRoute.params.subscribe(params => {
            this.groupId = params.groupId;
            this.eventId = params.eventId;
            this.sondageType = params.sondageType;
            this.event = JSON.parse(params.event);
        });
    }

    ngOnInit() {
        if (this.sondageType === 'Date') {
            this.typeInput = 'date';
            this.generique = false;
        } else if (this.sondageType === 'generique') {
            this.typeInput = 'text';
            this.generique = true;
        } else {
            this.typeInput = 'text';
            this.generique = false;
        }
        this.initFormGroup();
        if (!this.generique) {
            this.formGroup.patchValue({
                title: this.sondageType
            });
        }
        // 2 options minimum pour un sondage
        this.addOption();
        this.addOption();
    }

    initFormGroup() {
        this.formGroup = this.formBuilder.group({
            title: ['', Validators.required],
            sondage: this.formBuilder.array([])
          });
    }

    createOption() {
        const formBuilder = this.formBuilder.group({
            optionSondage : ['', Validators.required]
          });
        this.allOptions.push(formBuilder);
        return formBuilder;
    }

    addOption() {
        (this.formGroup.get('sondage') as FormArray).push(this.createOption());
    }

    deleteOption() {
        const index = this.allOptions.length - 1;
        this.allOptions.splice(index, 1);
        (this.formGroup.get('sondage') as FormArray).removeAt(index);

    }

    saveSondage() {
        const sondage = new Survey(null, null, null, null);
        sondage.typeSurvey = this.sondageType;
        sondage.title = this.formGroup.value.title;
        sondage.options = [];
        this.allOptions.forEach(option => {
            const o = new SurveyOption(null, null, 0, []);
            o.name = option.controls.optionSondage.value;
            sondage.options.push(o);
        });

        if (!this.event.survey) {
            this.event.survey = [];
        }
        this.event.survey.push(sondage);

        const stringEvent = JSON.stringify(this.event);
        this.router.navigate(['woozer/event/form', {event: stringEvent, groupId: this.groupId, eventId: this.eventId}]);
    }

}
