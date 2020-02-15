import { Component, OnInit } from '@angular/core';
import {UserAutocompleteService} from '../../../../services/user-autocomplete.service';
import {User} from '../../../login/user';
import {Group} from '../group';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

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
        private route: ActivatedRoute
    ) {
        this.groupForm = fb.group({
            name: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      });
    }

  ngOnInit() {
      //TODO récupérer id du groupe pour afficher le nom
  }

  addDeleteUser(user: User) {
    console.log(`add du user de username ${user.username}`);
  }

/*{
    path : 'pros/creation',
    component : ProFormComponent,
    canActivate: [RouteGuard],
    data : {'roles' : ['ROLE_PRO_W'], 'menuToActivate' : 'pros', 'breadcrumbs': ['_PROS_', '_PROS_LIST_#/pros', '_PRO_ADD_']}
},
{
    path : 'pros/modification/:id',
        component : ProFormComponent,
    canActivate: [RouteGuard],
    data : {'roles' : ['ROLE_PRO_W'], 'menuToActivate' : 'pros', 'breadcrumbs': ['_PROS_', '_PROS_LIST_#/pros', '_PRO_EDIT_']},
    resolve: {pro: ProResolver}

     let mode : string = this.route.snapshot.data['mode'];
    if (mode == 'creation') {
      this.creation = true;
    }
    else {
      this.creation = false;
},*/



}
