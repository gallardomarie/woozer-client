import { Component, OnInit } from '@angular/core';
import { Group } from '../groupe/group';
import { GroupService } from 'src/services/group.service';
import { Router } from '@angular/router';
import { CacheService } from 'src/services/cache.service';
import { User } from 'src/app/login/user';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  userId: number;
  groups: Group[];
  user: User;

  constructor(
    private groupService: GroupService,
    private router: Router,
    private cacheService: CacheService,
    private userService: UserService
  ) { }

  ngOnInit() {
    if (!this.cacheService.getUser()) {
      this.setUserId();
      this.userService.findById(this.userId).then((user) => {
        this.cacheService.setUser(user);
        this.groupService.findGroupsByUser(this.cacheService.getUser().id).then((groups) => {
          this.groups = groups;
        });
      })
    } else {
      this.groupService.findGroupsByUser(this.cacheService.getUser().id).then((groups) => {
        this.groups = groups;
      });
    }
    
  }

  setUserId() {
    let urlArray = this.router.url.split('/');
    this.userId = +urlArray[urlArray.length -1];
  }

  navigateToGroup(idGroup){
    this.cacheService.changeTitleTopBar("Nom du groupe");
    this.router.navigate(['/woozer/event', {id: idGroup}]);
    this.cacheService.emitChange(idGroup);
  }

}
