import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AngularFireModule} from '@angular/fire';
import {firebaseConfig} from '../config';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../services/auth.service';
import {LoginModule} from './login/login.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomepageModule} from './homepage/homepage.module';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from './shared/shared.module';
import {AutoCompleteModule} from 'ionic4-auto-complete';


@NgModule({
    declarations: [
        AppComponent
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        AngularFireModule.initializeApp(firebaseConfig.fire),
        LoginModule,
        HomepageModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        SharedModule,
        AutoCompleteModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AngularFireAuth,
        AuthService,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
