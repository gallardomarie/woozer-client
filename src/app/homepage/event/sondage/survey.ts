import { SurveyOption } from './survey_options';

export class Survey {

    constructor(
        public id: number,
        public typeSurvey: string,
        public options: SurveyOption[]
        ) {}
}
