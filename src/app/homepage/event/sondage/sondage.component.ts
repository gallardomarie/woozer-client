import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-sondage',
    templateUrl: './sondage.component.html',
    styleUrls: ['./sondage.component.scss'],
})
export class SondageComponent implements OnInit {

    eventId;
    sondageType;
    formGroup;
    allOptions: FormGroup[] = [];
    typeInput;

    constructor(
        private activeRoute: ActivatedRoute,
        private formBuilder: FormBuilder
    ) {
        this.activeRoute.params.subscribe(params => {
            this.eventId = params.eventId;
            this.sondageType = params.sondageType;
        });
    }

    ngOnInit() {
        if (this.sondageType === 'Date') {
            this.typeInput = 'date';
        } else {
            this.typeInput = 'text';
        }
        console.log(this.eventId);
        console.log(this.sondageType);
        this.initFormGroup();
        // 2 options minimum pour un sondage
        this.addOption();
        this.addOption();
    }

    initFormGroup() {
        this.formGroup = this.formBuilder.group({
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

}
