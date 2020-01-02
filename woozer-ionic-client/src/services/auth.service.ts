import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from "@angular/fire/auth";

@Injectable()
export class AuthService {

    private user: firebase.User;

    constructor(public afAuth: AngularFireAuth) {
        afAuth.authState.subscribe(user => {
            this.user = user;
        });
    }

    signInWithEmail(credentials) {
        return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
            credentials.password);
    }

}