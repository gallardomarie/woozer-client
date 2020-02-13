import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'formulaire-event',
    templateUrl: './formulaire-event.component.html',
    styleUrls: ['./formulaire-event.component.scss']
})

export class FormulaireEventComponent implements OnInit {

    constructor() {}

    ngOnInit() {
        console.log('Page de formulaire d event');
    }

}
