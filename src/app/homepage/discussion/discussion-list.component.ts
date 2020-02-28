import { Component, OnInit } from '@angular/core';
import { CacheService } from 'src/services/cache.service';
import { Router } from '@angular/router';
import { DiscussionService } from 'src/services/discussion.service';
import { DiscussionListItem } from './discussion-list-item';

@Component({
  selector: 'app-discussion-list',
  templateUrl: './discussion-list.component.html',
  styleUrls: ['./discussion-list.component.scss'],
})
export class DiscussionListComponent implements OnInit {

  private discussions: DiscussionListItem[];

  constructor(
    private cache: CacheService,
    private router: Router,
    private discussionService: DiscussionService
  ) { }

  ngOnInit() {
    // TODO replace with dynamic user id
    this.discussionService.findAllByUserId(1).then((discussions) => {
      this.discussions = discussions;
    });
  }

  navigateToDiscussion(discussionId: number) {
    this.router.navigate(['/woozer/discussion/', discussionId]);
    this.cache.emitChange(this.discussions[0].group.id);
  }

}
