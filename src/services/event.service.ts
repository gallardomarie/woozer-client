import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import { EventObject } from 'src/app/homepage/event/event';

@Injectable()
export class EventService {

  constructor(private httpClient: HttpClient) { }

  findAllByGroupId(groupId: number) {
      return this.httpClient.get(`${environment.apiBaseUrl}event/list/` + groupId).toPromise();
  }

  findById(eventId: number) {
    return this.httpClient.get(`${environment.apiBaseUrl}event/` + eventId).toPromise();
  }

  findByUserId(userId: number) {
    return this.httpClient.get(`${environment.apiBaseUrl}event/perso/` + userId).toPromise();
  }

  save(event: EventObject) {
    return this.httpClient.post<EventObject>(`${environment.apiBaseUrl}event/save`, event).toPromise();

  }

}

