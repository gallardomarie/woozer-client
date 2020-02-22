import { Component, OnInit } from '@angular/core';
import { CacheService } from 'src/services/cache.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent implements OnInit {

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
