import { Injectable } from '@angular/core';
import {User} from "../app/login/user";

@Injectable()
export class CacheService {

    private emitChangeSource;
    //TODO enlever quand prod
    private user: User = {id: 1, email: 'amandine.watrelos@gmail.com', username: 'awatrelos'};

    getCache() {
        return this.emitChangeSource;
    }
    emitChange(change: any) {
        this.emitChangeSource = change;
    }

    getUser() {
        return this.user;
    }

    setUser(user: User) {
        this.user = user;
    }
}