import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DiscussionService} from '../../../../services/discussion.service';
import {CacheService} from '../../../../services/cache.service';
import {Discussion} from '../discussion';

@Component({
    selector: 'app-discussion-details',
    templateUrl: './discussion-details.component.html',
    styleUrls: ['./discussion-details.component.scss'],
})
export class DiscussionDetailsComponent implements OnInit {

    discussion: Discussion;

    constructor(
        private cache: CacheService,
        private discussionService: DiscussionService,
        private router: Router
    ) { }

    ngOnInit() {
        this.discussionService.findById(+this.router.url[this.router.url.length - 1]).then((discussion) => {
            this.discussion = discussion;
        });
    }

}
