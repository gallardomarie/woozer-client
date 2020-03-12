import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Injectable} from '@angular/core';
import {Album} from '../app/homepage/photo-album/album';

@Injectable()
export class AlbumService {

    constructor(private httpClient: HttpClient) { }

    findAllByGroupId(groupId: number) {
        return this.httpClient.get<Album[]>(`${environment.apiBaseUrl}album/list/group/` + groupId).toPromise();
    }

    findAllByUserId(userId: number) {
        return this.httpClient.get<Album[]>(`${environment.apiBaseUrl}album/list/user/` + userId).toPromise();
    }

}
