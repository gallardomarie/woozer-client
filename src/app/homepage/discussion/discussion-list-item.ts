import { Group } from '../groupe/group';
import { Message } from './message';

export class DiscussionListItem {

    constructor(
        public group: Group,
        public message: Message,
        ) { }

}