import {User} from '../../login/user';
import { Group } from '../groupe/group';

export class Discussion {

    constructor(
        public id: number,
        public group: Group
        ) { }

}