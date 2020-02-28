import { User } from 'src/app/login/user';

export class Message {

    constructor(
        public id: number,
        public user: User,
        public date: Date,
        public message: string
        ) { }

}