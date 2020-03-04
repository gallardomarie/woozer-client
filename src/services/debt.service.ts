import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {Debt} from '../app/homepage/debt/debt';
import {Group} from '../app/homepage/groupe/group';

@Injectable()
export class DebtService {

    constructor(private httpClient: HttpClient) {
    }

    findAllByGroupId(groupId: number) {
        return this.httpClient.get<Debt[]>(`${environment.apiBaseUrl}debt/list/group/` + groupId).toPromise();
    }

    findAllByUserId(userId: number) {
        return this.httpClient.get<Debt[]>(`${environment.apiBaseUrl}debt/list/user/` + userId).toPromise();
    }

    save(debt: Debt) {
        return this.httpClient.post<Debt>(`${environment.apiBaseUrl}debt/save`, debt).toPromise();
    }

}
