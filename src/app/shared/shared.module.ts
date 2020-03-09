import {NgModule} from '@angular/core';
import {ButtonComponent} from './button/button.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './calendar/calendar.component';
import { CacheService } from 'src/services/cache.service';
import { IonicModule } from '@ionic/angular';
import { EventService } from 'src/services/event.service';
import {CalendarEventPopupComponent} from './popup/calendar-event/calendar-event-popup.component';
import {DebtCreationPopupComponent} from './popup/debt-creation/debt-creation-popup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AccountFormComponent} from './account/account-form.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        IonicModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        ButtonComponent,
        TopbarComponent,
        FooterComponent,
        CalendarComponent,
        CalendarEventPopupComponent,
        DebtCreationPopupComponent,
        AccountFormComponent
    ],
    exports: [
        ButtonComponent,
        TopbarComponent,
        FooterComponent,
        CalendarComponent,
        AccountFormComponent
    ],
    providers: [
        CacheService,
        EventService
    ],
    entryComponents: [
        CalendarEventPopupComponent,
        DebtCreationPopupComponent
    ]
})
export class SharedModule {}
