import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {Debt} from '../app/homepage/debt/debt';

@Injectable()
export class DebtService {

    constructor(private httpClient: HttpClient) {
    }

    findAllByGroupId(groupId: number) {
        return this.httpClient.get<Debt[]>(`${environment.apiBaseUrl}debt/list/` + groupId).toPromise();
    }

}