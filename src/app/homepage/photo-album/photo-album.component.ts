import {Component, OnInit, ViewChild} from '@angular/core';
import { CacheService } from 'src/services/cache.service';
import {Album} from './album';
import {AlbumService} from '../../../services/album.service';
import {IonContent} from '@ionic/angular';

@Component({
  selector: 'app-photo-album',
  templateUrl: './photo-album.component.html',
  styleUrls: ['./photo-album.component.scss'],
})
export class PhotoAlbumComponent implements OnInit {

  @ViewChild(IonContent, null)
  private content: IonContent;

  groupId;
  albums: Album[];

  constructor(
    private cacheService: CacheService,
    private albumService: AlbumService
  ) { }

  ngOnInit() {
    if (this.cacheService.isInGroup()) {
        this.cacheService.changeTitleTopBar('Nom du groupe');
        this.groupId = this.cacheService.getGroup().id;
        this.albumService.findAllByGroupId(this.groupId).then((albums) => {
        this.albums = albums;
      });
    } else {
      this.albumService.findAllByUserId(this.cacheService.getUser().id).then((albums) => {
        this.albums = albums;
      });
    }
  }

}
