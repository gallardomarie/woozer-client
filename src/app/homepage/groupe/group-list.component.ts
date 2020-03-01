import { Component, OnInit} from '@angular/core';
import { GroupService } from 'src/services/group.service';
import { Group } from './group';
import { Router } from '@angular/router';
import { CacheService } from 'src/services/cache.service';
import {User} from "../../login/user";

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit {

  groups: Group[];
  user: User;

  constructor(
    private groupService: GroupService,
    private router: Router,
    private cacheService: CacheService
  ) { }

  ngOnInit() {
    this.user = this.cacheService.getUser();
    this.groupService.findGroupsByUser(this.user.id).then((groups) => {
      this.groups = groups;
    });
  }

  navigateToGroup(idGroup){
    this.router.navigate(['/woozer/event', {id: idGroup}]);
    this.cacheService.emitChange(idGroup);
  }

}
