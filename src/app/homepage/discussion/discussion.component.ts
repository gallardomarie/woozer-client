import { Component, OnInit } from '@angular/core';
import { CacheService } from 'src/services/cache.service';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss'],
})
export class DiscussionComponent implements OnInit {

  groupId;

  constructor(
    private cache: CacheService
  ) { }

  ngOnInit() {
    this.groupId = this.cache.getCache();
    if (this.groupId) {
        console.log('Je suis dans le groupe ' + this.groupId);
      } else {
        console.log('Je ne suis dans aucun groupe');
      }
  }

}
