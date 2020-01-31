import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PhotoAlbumComponent} from './photo-album.component';

const routes: Routes = [
    {
        path: 'album',
        component: PhotoAlbumComponent
    }
];

@NgModule({
  declarations: [
      PhotoAlbumComponent
  ],
  imports: [
      RouterModule.forChild(routes),
      CommonModule
  ]
})
export class PhotoAlbumModule { }
