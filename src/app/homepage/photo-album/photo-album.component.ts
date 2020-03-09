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
    private cacheService: CacheService
  ) { }

  ngOnInit() {
    if (this.cacheService.isInGroup()) {
      this.groupId = this.cacheService.getGroup().id;
      console.log('Je suis dans le groupe ' + this.groupId);
    } else {
      console.log('Je ne suis dans aucun groupe');
    }
  }

}
