import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomepageComponent} from './homepage.component';
import { SharedModule } from '../shared/shared.module';
import {AgendaModule} from './agenda/agenda.module';
import {DebtModule} from './debt/debt.module';
import {DiscussionModule} from './discussion/discussion.module';
import {PhotoAlbumModule} from './photo-album/photo-album.module';

const routes: Routes = [
    {
        path: 'homepage',
        component: HomepageComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
        AgendaModule,
        DebtModule,
        DiscussionModule,
        PhotoAlbumModule
    ],
    declarations: [
        HomepageComponent
    ]
})
export class HomepageModule {}
