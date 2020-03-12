import {Photo} from './photo';
import {Group} from '../groupe/group';
import {Event} from '@angular/router';
import {EventObject} from '../event/event';

export class Album {

    constructor(
        public id: number,
        public photos: Photo[],
        public group: Group,
        public event: EventObject
    ) { }

}
