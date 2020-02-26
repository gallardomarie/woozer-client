import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DiscussionListItem } from 'src/app/homepage/discussion/discussion-list-item';

@Injectable()
export class DiscussionService {

  constructor(private httpClient: HttpClient) { }

  findAllByUserId(userId: number) {
      return this.httpClient.get<DiscussionListItem[]>(`${environment.apiBaseUrl}discussion/list/` + userId).toPromise();
  }

}