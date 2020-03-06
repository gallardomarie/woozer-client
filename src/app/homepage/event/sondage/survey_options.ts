import { User } from 'firebase';

export class SurveyOption {

    constructor(
        public id: number,
        public name: string,
        public nbVotes: number,
        public votes: User[]
        ) {}
}
