import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AngularFireModule} from '@angular/fire';
import {firebaseConfig} from '../config';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {AuthService} from '../services/auth.service';
import {LoginModule} from './login/login.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomepageModule} from './homepage/homepage.module';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);
import {AutoCompleteModule} from 'ionic4-auto-complete';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [
        AppComponent
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        AngularFireModule.initializeApp(firebaseConfig.fire),
        LoginModule,
        HomepageModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        SharedModule,
        AutoCompleteModule,
        CommonModule,
        FlatpickrModule.forRoot(),
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
          }),
        AngularFireAuthModule,
        MatDialogModule
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
