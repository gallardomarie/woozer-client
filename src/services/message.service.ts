import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Message } from 'src/app/homepage/discussion/message';

@Injectable()
export class MessageService {

    constructor(private httpClient: HttpClient
    ) { }

    save(message: Message, discussionId: number) {
        return this.httpClient.post<Message>(`${environment.apiBaseUrl}message/save/` + discussionId, message).toPromise();
    }

}