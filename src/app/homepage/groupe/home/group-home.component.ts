import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/services/group.service';
import { Router } from '@angular/router';
import { Group } from '../group';

@Component({
  selector: 'app-group-home',
  templateUrl: './group-home.component.html',
  styleUrls: ['./group-home.component.scss'],
})
export class GroupHomeComponent implements OnInit {

  group: Group;

  constructor(
    private groupService: GroupService,
    private router: Router
  ) { }

  ngOnInit() {
    this.groupService.findGroupById(this.router.url[this.router.url.length-1]).then((group) => {
      this.group = group;
    });
  }

}
