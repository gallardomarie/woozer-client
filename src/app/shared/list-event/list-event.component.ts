import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-list-event',
    templateUrl: './list-event.component.html',
    styleUrls: ['./list-event.component.scss'],
})
export class ListEventComponent implements OnInit {

    @Input() events: any;

    constructor() { }

    ngOnInit() {
        console.log(this.events);
   }

}
