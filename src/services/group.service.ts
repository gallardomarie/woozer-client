import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Group} from '../app/homepage/groupe/group';

@Injectable()
export class GroupService {

    constructor(private httpClient: HttpClient
    ) { }

    findGroupsByUser(userId: string) {
        return this.httpClient.get<Group[]>(`${environment.apiBaseUrl}group/list/` + userId).toPromise();
    }

    findGroupById(id: string) {
        return this.httpClient.get<Group>(`${environment.apiBaseUrl}group/` + id).toPromise();
    }

    save(group: Group) {
        return this.httpClient.post<Group>(`${environment.apiBaseUrl}group/save`, group).toPromise();
    }

}
