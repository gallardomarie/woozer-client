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
    this.groupService.findGroupsByUser(this.cacheService.getUser().id).then((groups) => {
      this.groups = groups;
    });
  }

  navigateToGroup(idGroup){
    this.groupService.findGroupById(idGroup).then((group) => {
      this.cacheService.setGroup(group);
      this.cacheService.changeTitleTopBar("Nom du groupe");
      this.router.navigate(['/woozer/event', {id: idGroup}]);
    });

  }

}
