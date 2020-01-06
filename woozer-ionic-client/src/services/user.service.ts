import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient
              ) { }

  findUserByMail(mail: string) {
    return this.httpClient.post(`${environment.apiBaseUrl}user/email`, mail).toPromise();
  }

}
