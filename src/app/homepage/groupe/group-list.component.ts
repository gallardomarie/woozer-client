import { Component, OnInit} from '@angular/core';
import { GroupService } from 'src/services/group.service';
import { Group } from './group';
import { Router } from '@angular/router';
import { CacheService } from 'src/services/cache.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit {

  groups: Group[];

  constructor(
    private groupService: GroupService,
    private router: Router,
    private cache: CacheService
  ) { }

  ngOnInit() {
    //TODO replace with dynamic user id
    this.groupService.findGroupsByUser('1').then((groups) => {
      this.groups = groups;
    });
  }

  navigateToGroup(idGroup){
    this.router.navigate(['/woozer/event', {id: idGroup}]);
    this.cache.emitChange(idGroup);
  }

}
