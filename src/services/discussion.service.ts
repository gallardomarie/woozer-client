import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DiscussionListItem } from 'src/app/homepage/discussion/discussion-list-item';
import {Discussion} from '../app/homepage/discussion/discussion';

@Injectable()
export class DiscussionService {

  constructor(private httpClient: HttpClient) { }

  findAllByUserId(userId: number) {
      return this.httpClient.get<DiscussionListItem[]>(`${environment.apiBaseUrl}discussion/list/` + userId).toPromise();
  }

  findById(discussionId: number) {
      return this.httpClient.get<Discussion>(`${environment.apiBaseUrl}discussion/` + discussionId).toPromise();
  }

}