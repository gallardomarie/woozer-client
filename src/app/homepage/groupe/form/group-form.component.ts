import { Component, OnInit } from '@angular/core';
import {User} from '../../../login/user';
import {Group} from '../group';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { GroupService } from 'src/services/group.service';
import {CacheService} from '../../../../services/cache.service';
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss'],
})
export class GroupFormComponent implements OnInit {

  group: Group;
  groupForm: FormGroup;
  creation: boolean;
  connectedUser: User;
  searchText: string = "";
  usersDropAutocomplete: User[];

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private groupService: GroupService,
        private cacheService: CacheService,
        private userService: UserService
    ) {
        this.groupForm = fb.group({
            name: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            searchText: ['']
      });
    }

  ngOnInit() {
    this.connectedUser = this.cacheService.getUser();
    if (this.router.url.includes('creation')) {
      this.creation = true;
      let usersList : User[] = [];
      usersList.push(this.connectedUser);
      this.group = new Group(null, '', usersList, []);
    } else {
      this.creation = false;
        this.group = this.cacheService.getGroup();
    }
  }

  search() {
    if (!this.searchText) {
      return false;
    }

    this.userService.searchByUsername(this.searchText).then((users) => {
      this.usersDropAutocomplete = users;
    });
  }

  addUser(user: User) {
    this.group.users.push(user);
  }

  removeUser(user: User) {
      if (this.connectedUser.id !== user.id) {
        const users = this.group.users;
        users.splice(users.findIndex((userArray) => userArray.id === user.id), 1);
      }
  }

  isInGroup(user: User) {
    return this.group.users.findIndex((userArray) => userArray.id === user.id) !== -1;
  }

  save() {
    this.groupService.save(this.group).then((groupSaved) => {
      this.cacheService.setGroup(groupSaved);
      this.cacheService.changeTitleTopBar("Nom du groupe");
      this.router.navigate(['/woozer/event', {id: groupSaved.id}]);
    });
    // TODO faire un retour utilisateur pour dire que groupe bien crée/modifié
  }

}
