import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DiscussionService} from '../../../../services/discussion.service';
import {CacheService} from '../../../../services/cache.service';
import {Discussion} from '../discussion';
import { Message } from '../message';
import { UserService } from 'src/services/user.service';
import { MessageService } from 'src/services/message.service';

@Component({
    selector: 'app-discussion-details',
    templateUrl: './discussion-details.component.html',
    styleUrls: ['./discussion-details.component.scss'],
})
export class DiscussionDetailsComponent implements OnInit {

    discussion: Discussion;
    userId: number;
    message: Message;

    constructor(
        private cache: CacheService,
        private discussionService: DiscussionService,
        private messageService: MessageService,
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit() {
        //TODO replace with dynamic user id connected
        this.userId = 1;
        this.discussionService.findById(+this.router.url[this.router.url.length - 1]).then((discussion) => {
            this.discussion = discussion;
            this.userService.findById(this.userId).then((user) => {
                this.message = new Message(null, user, new Date(), "");
            });
        });
    }

    isUserAuthor(authorId: number): boolean {
        return this.userId === authorId;
    }

    sendMessage() {
        this.messageService.save(this.message, this.discussion.id).then((messageSaved) => {
            this.discussion.messages.push(messageSaved);
        })
    }

}
