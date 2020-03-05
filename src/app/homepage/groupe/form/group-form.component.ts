import { Component, OnInit } from '@angular/core';
import {UserAutocompleteService} from '../../../../services/user-autocomplete.service';
import {User} from '../../../login/user';
import {Group} from '../group';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { GroupService } from 'src/services/group.service';
import {CacheService} from '../../../../services/cache.service';

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

    constructor(
        public userAutocompleteService: UserAutocompleteService,
        private fb: FormBuilder,
        private router: Router,
        private groupService: GroupService,
        private cacheService: CacheService
    ) {
        this.groupForm = fb.group({
            name: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
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
      this.groupService.findGroupById(+this.getGroupIdFromUrl()).then((group) => {
        this.group = group;
      });
    }
  }

  getGroupIdFromUrl() {
    let urlArray = this.router.url.split('/');
    return urlArray[urlArray.length -1];
  }

  addUser(user: User) {
    console.log(`taille users avant : ${this.group.users}`);
    this.group.users.push(user);
    console.log(`taille users après : ${this.group.users}`);
  }

  removeUser(user: User) {
    console.log(`taille users avant : ${this.group.users}`);
    const users = this.group.users;
    users.splice(users.findIndex((userArray) => userArray.id === user.id), 1);
    console.log(`taille users après : ${this.group.users}`);
  }

  isInGroup(user: User) {
    return this.group.users.findIndex((userArray) => userArray.id === user.id) !== -1;
  }

  save() {
    this.groupService.save(this.group).then((groupSaved) => {
      this.cacheService.emitChange(groupSaved.id);
      this.router.navigate(['/woozer/event', {id: groupSaved.id}]);
    });
    // TODO faire un retour utilisateur pour dire que groupe bien crée/modifié
  }

}
