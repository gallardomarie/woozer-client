import { Injectable } from '@angular/core';
import {User} from "../app/login/user";
import {BehaviorSubject, Subject} from "rxjs";
import {Group} from "../app/homepage/groupe/group";

@Injectable()
export class CacheService {

    //TODO enlever quand prod
    private user: User = {id: 1, email: 'amandine.watrelos@gmail.com', username: 'awatrelos'};

    private group: Group;

    private titleTopBar: string = "";
    titleTopBarObservable;

    constructor() {
        this.titleTopBarObservable= new BehaviorSubject<string>(this.titleTopBar);
    }

    isInGroup() {
        return this.group != null;
    }

    getGroup() {
        return this.group;
    }

    setGroup(group: Group) {
        this.group = group;
    }

    getTitleTopBar() {
        return this.titleTopBar;
    }

    changeTitleTopBar(title: string) {
        if (title !== "") {
            if (this.getGroup() !== null) {
                this.titleTopBarObservable.next(this.getGroup().name);
            } else {
                this.titleTopBarObservable.next(title)
            }
        } else {
            this.titleTopBarObservable.next("");
        }
    }

    getUser() {
        return this.user;
    }

    setUser(user: User) {
        this.user = user;
    }
}