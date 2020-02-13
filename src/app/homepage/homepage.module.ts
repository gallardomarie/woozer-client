import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomepageComponent} from './homepage.component';
import { SharedModule } from '../shared/shared.module';
import { AgendaComponent } from './agenda/agenda.component';
import { DebtComponent } from './debt/debt.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { PhotoAlbumComponent } from './photo-album/photo-album.component';
import { HomeComponent } from './home/home.component';
import {GroupListComponent} from "./groupe/group-list.component";
import {GroupFormComponent} from "./groupe/form/group-form.component";
import {IonicModule} from "@ionic/angular";
import {GroupService} from "../../services/group.service";
import {CommonModule} from "@angular/common";
import { EventComponent } from './event/event.component';
import { EventDetailsComponent } from './event/details/event.details.component';
import { FormulaireEventComponent } from './event/formulaire-event/formulaire-event.component';

const routes: Routes = [
    {
        path: 'woozer',
        component: HomepageComponent,
        children: [
            {
                path: 'agenda',
                component: AgendaComponent
            },
            {
                path: 'dettes',
                component: DebtComponent
            },
            {
                path: 'discussions',
                component: DiscussionComponent
            },
            {
                path: 'album',
                component: PhotoAlbumComponent
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'groupe',
                component: GroupListComponent
            },
            {
                path: 'groupe/form',
                component: GroupFormComponent
            },
            {
                path: 'event',
                component: EventComponent
            },
            {
                path: 'event/details',
                component: EventDetailsComponent
            },
            {
                path: 'event/form',
                component: FormulaireEventComponent
            }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
        IonicModule,
        CommonModule
    ],
    declarations: [
        HomepageComponent,
        AgendaComponent,
        DebtComponent,
        DiscussionComponent,
        PhotoAlbumComponent,
        HomeComponent,
        GroupListComponent,
        GroupFormComponent,
        EventComponent,
        EventDetailsComponent,
        FormulaireEventComponent
    ],
    providers: [
        GroupService
    ]
})
export class HomepageModule {}
