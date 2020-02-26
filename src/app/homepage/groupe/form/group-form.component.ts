import { Component, OnInit } from '@angular/core';
import {UserAutocompleteService} from '../../../../services/user-autocomplete.service';
import {User} from '../../../login/user';
import {Group} from '../group';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { GroupService } from 'src/services/group.service';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss'],
})
export class GroupFormComponent implements OnInit {

  group: Group;
  groupForm: FormGroup;
  creation: boolean;

    constructor(
        public userAutocompleteService: UserAutocompleteService,
        private fb: FormBuilder,
        private router: Router,
        private groupService: GroupService
    ) {
        this.groupForm = fb.group({
            name: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      });
    }

  ngOnInit() {
    if(this.router.url.includes("creation")) {
      this.creation = true;
      this.group = new Group(null, "", [], []);
    } else {
      this.creation = false;
      this.groupService.findGroupById(this.router.url[this.router.url.length-1]).then((group) => {
        this.group = group;
      });
    }
  }

  addUser(user: User) {
    console.log(`taille users avant : ${this.group.users}`);
    this.group.users.push(user);
    console.log(`taille users après : ${this.group.users}`);
  }

  removeUser(user: User) {
    console.log(`taille users avant : ${this.group.users}`);
    let users = this.group.users;
    users.splice(users.findIndex((userArray) => userArray.id === user.id), 1);
    console.log(`taille users après : ${this.group.users}`);
  }

  isInGroup(user: User) {
    return this.group.users.findIndex((userArray) => userArray.id === user.id) !== -1;
  }

  save() {
    this.groupService.save(this.group).then((groupSaved) => {
      this.router.navigate(['/woozer/event', {id: groupSaved.id}]);
    })
    // TODO faire un retour utilisateur pour dire que groupe bien crée/modifié
  }

}
