import {User} from '../../login/user';

export class Debt {

    constructor(
        public id: number,
        public payedBy: User,
        public payedFor: User,
        public amount: number,
        public comment: string,
        public done: boolean
    ) { }

}
