import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomepageComponent} from './homepage.component';
import { SharedModule } from '../shared/shared.module';
import { AgendaComponent } from './agenda/agenda.component';
import { DebtComponent } from './debt/debt.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { PhotoAlbumComponent } from './photo-album/photo-album.component';
import { HomeComponent } from './home/home.component';

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
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule
    ],
    declarations: [
        HomepageComponent,
        AgendaComponent,
        DebtComponent,
        DiscussionComponent,
        PhotoAlbumComponent,
        HomeComponent
    ],
})
export class HomepageModule {}
