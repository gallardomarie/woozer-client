import { User } from 'firebase';
import { Survey } from './sondage/survey';

export class EventObject {

    constructor(
        public id: number,
        public name: string,
        public description: string,
        public date?: Date,
        public hour?: string,
        public place?: string,
        public participant?: User[],
        public survey?: Survey[]
        ) {}
    }
