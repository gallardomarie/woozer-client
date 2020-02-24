import {Component, Inject, OnInit} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss'],
})
export class PopupComponent {

    constructor(
        public dialogRef: MatDialogRef<PopupComponent>,
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
