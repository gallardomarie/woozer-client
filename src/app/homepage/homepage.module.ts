import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomepageComponent} from './homepage.component';
import { SharedModule } from '../shared/shared.module';
import { AgendaComponent } from './agenda/agenda.component';
import { DebtComponent } from './debt/debt.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { PhotoAlbumComponent } from './photo-album/photo-album.component';
import { HomeComponent } from './home/home.component';
import {GroupListComponent} from './groupe/group-list.component';
import {GroupFormComponent} from './groupe/form/group-form.component';
import {IonicModule} from '@ionic/angular';

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
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
        IonicModule
    ],
    declarations: [
        HomepageComponent,
        AgendaComponent,
        DebtComponent,
        DiscussionComponent,
        PhotoAlbumComponent,
        HomeComponent,
        GroupListComponent,
        GroupFormComponent
    ],
})
export class HomepageModule {}
