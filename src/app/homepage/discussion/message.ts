import { User } from 'src/app/login/user';
import { Discussion } from './discussion';

export class Message {

    constructor(
        public id: number,
        public user: User,
        public date: Date,
        public message: string
        ) { }

}