import {Component, OnInit, ViewChild} from '@angular/core';
import { CacheService } from 'src/services/cache.service';
import { Router } from '@angular/router';
import { DiscussionService } from 'src/services/discussion.service';
import { DiscussionListItem } from './discussion-list-item';
import {User} from "../../login/user";
import {IonContent} from "@ionic/angular";

@Component({
  selector: 'app-discussion-list',
  templateUrl: './discussion-list.component.html',
  styleUrls: ['./discussion-list.component.scss'],
})
export class DiscussionListComponent implements OnInit {

  @ViewChild(IonContent, null)
  private content: IonContent;

  private discussions: DiscussionListItem[];
  private user: User;

  constructor(
    private cacheService: CacheService,
    private router: Router,
    private discussionService: DiscussionService
  ) { }

  ngOnInit() {
    this.user = this.cacheService.getUser();
    this.discussionService.findAllByUserId(this.user.id).then((discussions) => {
      this.discussions = discussions;
    });
  }

  navigateToDiscussion(discussionId: number) {
    this.cacheService.changeTitleTopBar("Nom du groupe");
    this.router.navigate(['/woozer/discussion/', discussionId]);
    this.cacheService.setGroup(this.discussions[0].group);
  }

}
