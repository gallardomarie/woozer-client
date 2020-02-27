import { Group } from '../groupe/group';
import { Message } from './message';

export class DiscussionListItem {

    constructor(
        public id: number,
        public group: Group,
        public message: Message,
        ) { }

}