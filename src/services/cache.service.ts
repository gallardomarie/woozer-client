import { Injectable } from '@angular/core';
import {User} from "../app/login/user";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable()
export class CacheService {

    private emitChangeSource;
    private user: User;

    private titleTopBar: string = "";
    titleTopBarObservable;

    constructor() {
        this.titleTopBarObservable= new BehaviorSubject<string>(this.titleTopBar);
    }

    getCache() {
        return this.emitChangeSource;
    }
    emitChange(change: any) {
        this.emitChangeSource = change;
    }

    getTitleTopBar() {
        return this.titleTopBar;
    }

    changeTitleTopBar(title: string) {
        this.titleTopBarObservable.next(title);
    }

    getUser() {
        return this.user;
    }

    setUser(user: User) {
        this.user = user;
    }
}