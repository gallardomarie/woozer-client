import {NgModule} from '@angular/core';
import {ButtonComponent} from './button/button.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import {CalendarComponent} from './calendar/calendar.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        ButtonComponent,
        TopbarComponent,
        FooterComponent,
        CalendarComponent
    ],
    exports: [
        ButtonComponent,
        TopbarComponent,
        FooterComponent,
        CalendarComponent
    ]
})
export class SharedModule {}
