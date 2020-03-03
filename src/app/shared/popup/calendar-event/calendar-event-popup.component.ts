import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'app-calendar-event-popup',
    templateUrl: './calendar-event-popup.component.html',
    styleUrls: ['./calendar-event-popup.component.scss'],
})
export class CalendarEventPopupComponent {

    constructor(
        public dialogRef: MatDialogRef<CalendarEventPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router
        ) { }

    closeModal() {
        this.dialogRef.close();

    }

    openEvent(idEvent) {
        this.closeModal();
        this.router.navigate(['/woozer/event/details', {eventId: idEvent}]);
    }
}
