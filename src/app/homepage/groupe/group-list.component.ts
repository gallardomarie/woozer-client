import {Component, OnInit, ViewChild} from '@angular/core';
import { GroupService } from 'src/services/group.service';
import { Group } from './group';
import { Router } from '@angular/router';
import { CacheService } from 'src/services/cache.service';
import {User} from "../../login/user";
import {IonContent} from "@ionic/angular";

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit {

  @ViewChild(IonContent, null)
  private content: IonContent;

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
    this.groupService.findGroupById(idGroup).then((group) => {
      this.cacheService.setGroup(group);
      this.cacheService.changeTitleTopBar("Nom du groupe");
      this.router.navigate(['/woozer/event', {id: idGroup}]);
    });
  }

}
