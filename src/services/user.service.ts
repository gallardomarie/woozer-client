import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {User} from '../app/login/user';
import {Group} from "../app/homepage/groupe/group";

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient
              ) { }

  findUserByMail(mail: string) {
    return this.httpClient.post<User>(`${environment.apiBaseUrl}user/email`, mail).toPromise();
  }

  searchByUsername(term: string) {
    return this.httpClient.get<User[]>(`${environment.apiBaseUrl}user/username/like/` + term).toPromise();
  }

  findAll() {
      return this.httpClient.get<User[]>(`${environment.apiBaseUrl}user/all`).toPromise();
  }

  findById(id: number) {
    return this.httpClient.get<User>(`${environment.apiBaseUrl}user/` + id).toPromise();
  }

  save(user: User) {
    return this.httpClient.post<User>(`${environment.apiBaseUrl}user/save`, user).toPromise();
  }

}
