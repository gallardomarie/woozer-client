import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {DiscussionService} from '../../../../services/discussion.service';
import {CacheService} from '../../../../services/cache.service';
import {Discussion} from '../discussion';
import { Message } from '../message';
import { UserService } from 'src/services/user.service';
import { MessageService } from 'src/services/message.service';
import {User} from "../../../login/user";
import {IonContent} from "@ionic/angular";

@Component({
    selector: 'app-discussion-details',
    templateUrl: './discussion-details.component.html',
    styleUrls: ['./discussion-details.component.scss'],
})
export class DiscussionDetailsComponent implements OnInit {

    @ViewChild(IonContent, null)
    private content: IonContent;

    discussion: Discussion;
    userId: number;
    user: User;
    message: Message;

    constructor(
        private cacheService: CacheService,
        private discussionService: DiscussionService,
        private messageService: MessageService,
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit() {
        this.userId = 1;
        this.discussionService.findById(+this.router.url[this.router.url.length - 1]).then((discussion) => {
            this.discussion = discussion;
            this.user = this.cacheService.getUser();
            this.message = new Message(null, this.user, null, "");
            this.content.scrollToBottom(1000);
        });
    }

    isUserAuthor(authorId: number): boolean {
        return this.userId === authorId;
    }

    sendMessage() {
        this.message.date = new Date();
        this.messageService.save(this.message, this.discussion.id).then((messageSaved) => {
            this.discussion.messages.push(messageSaved);
            this.message = new Message(null, this.user, null, "");
            // recharger la page pour scroll vers le bas et afficher le dernier message -> si trop long en prod, enlever
            this.ngOnInit();
        });
    }

}
