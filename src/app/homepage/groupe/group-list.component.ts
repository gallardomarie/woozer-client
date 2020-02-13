import { Component, OnInit } from '@angular/core';
import {GroupService} from "../../../services/group.service";
import {Group} from "./group";
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit {

  groups: Group[];

  constructor(
      private groupService: GroupService,
      private router: Router
  ) { }

  ngOnInit() {
    this.groupService.findGroupsByUser("1").then(
        (groups) => {
          this.groups = groups;
        }
    )
  }

  openGroup(id) {
    this.router.navigate(['/woozer/event'], {queryParams: {groupId: id}});
  }

}
