import {User} from '../../login/user';
import { Group } from '../groupe/group';
import {Message} from './message';

export class Discussion {

    constructor(
        public id: number,
        public group: Group,
        public messages: Message[]
        ) { }

}