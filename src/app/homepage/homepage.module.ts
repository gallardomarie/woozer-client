import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomepageComponent} from './homepage.component';
import { SharedModule } from '../shared/shared.module';
import { AgendaComponent } from './agenda/agenda.component';
import { DebtListComponent } from './debt/debt-list.component';
import { DiscussionListComponent } from './discussion/discussion-list.component';
import { PhotoAlbumComponent } from './photo-album/photo-album.component';
import { HomeComponent } from './home/home.component';
import {GroupListComponent} from './groupe/group-list.component';
import {GroupFormComponent} from './groupe/form/group-form.component';
import {IonicModule} from '@ionic/angular';
import {GroupService} from '../../services/group.service';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../../services/user.service';
import { EventListComponent } from './event/event-list.component';
import { EventDetailsComponent } from './event/details/event.details.component';
import { EventFormComponent } from './event/form/event-form.component';
import { CacheService } from 'src/services/cache.service';
import { DiscussionService } from 'src/services/discussion.service';
import {DiscussionDetailsComponent} from './discussion/details/discussion-details.component';
import { MessageService } from 'src/services/message.service';
import {DebtService} from '../../services/debt.service';
import { SondageComponent } from './event/sondage/sondage.component';
import {AccountEditComponent} from "./account-edit/account-edit.component";

const routes: Routes = [
    {
        path: 'woozer',
        component: HomepageComponent,
        children: [
            {
                path: 'account/edit',
                component: AccountEditComponent
            },
            {
                path: 'agenda',
                component: AgendaComponent
            },
            {
                path: 'dettes',
                component: DebtListComponent
            },
            {
                path: 'discussions',
                component: DiscussionListComponent
            },
            {
                path: 'discussion/:id',
                component: DiscussionDetailsComponent
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
                component: GroupListComponent,
            },
            {
                path: 'groupe/creation',
                component: GroupFormComponent
            },
            {
                path: 'groupe/modification/:id',
                component: GroupFormComponent
            },
            {
                path: 'event',
                component: EventListComponent
            },
            {
                path: 'event/details',
                component: EventDetailsComponent
            },
            {
                path: 'event/form',
                component: EventFormComponent
            },
            {
                path: 'sondage',
                component: SondageComponent
            }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        HomepageComponent,
        AgendaComponent,
        DebtListComponent,
        DiscussionListComponent,
        DiscussionDetailsComponent,
        PhotoAlbumComponent,
        HomeComponent,
        GroupListComponent,
        GroupFormComponent,
        EventListComponent,
        EventDetailsComponent,
        EventFormComponent,
        SondageComponent,
        AccountEditComponent
    ],
    providers: [
        GroupService,
        UserService,
        CacheService,
        DiscussionService,
        MessageService,
        DebtService
    ]
})
export class HomepageModule {}
