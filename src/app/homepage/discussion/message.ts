import { Discussion } from './discussion';
import { User } from 'src/app/login/user';

export class Message {

    constructor(
        public id: number,
        public discussion: Discussion,
        public user: User,
        public date: Date,
        public message: string
        ) { }

}