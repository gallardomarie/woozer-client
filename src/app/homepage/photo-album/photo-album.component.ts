import { Component, OnInit } from '@angular/core';
import { CacheService } from 'src/services/cache.service';

@Component({
  selector: 'app-photo-album',
  templateUrl: './photo-album.component.html',
  styleUrls: ['./photo-album.component.scss'],
})
export class PhotoAlbumComponent implements OnInit {

  groupId;

  constructor(
    private cache: CacheService
  ) { }

  ngOnInit() {
    this.groupId = this.cache.getCache();
    if (this.groupId) {
      console.log('Je suis dans le groupe ' + this.groupId);
    } else {
      console.log('Je ne suis dans aucun groupe');
    }
  }

}
