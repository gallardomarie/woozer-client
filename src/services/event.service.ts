import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable()
export class EventService {

  constructor(private httpClient: HttpClient) { }

  findAllByGroupId(groupId: number) {
      return this.httpClient.get(`${environment.apiBaseUrl}event/list/` + groupId).toPromise();
  }

  findById(eventId: number) {
    return this.httpClient.get(`${environment.apiBaseUrl}event/` + eventId).toPromise();
  }

}

