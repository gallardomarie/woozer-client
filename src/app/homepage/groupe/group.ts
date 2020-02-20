import {User} from '../../login/user';

export class Group {

    constructor(
        public id: number,
        public name: string,
        public users: User[],
        public admins: User[]
        ) { }

}