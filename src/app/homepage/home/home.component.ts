import { Component, OnInit } from '@angular/core';
import { Group } from '../groupe/group';
import { GroupService } from 'src/services/group.service';
import { Router } from '@angular/router';
import { CacheService } from 'src/services/cache.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  groups: Group[];

  constructor(
    private groupService: GroupService,
    private router: Router,
    private cacheService: CacheService
  ) { }

  ngOnInit() {
    //TODO replace with dynamic user id
    this.groupService.findGroupsByUser('1').then((groups) => {
      this.groups = groups;
    });
  }

  navigateToGroup(idGroup){
    this.router.navigate(['/woozer/event', {id: idGroup}]);
    this.cacheService.emitChange(idGroup);
  }

}
