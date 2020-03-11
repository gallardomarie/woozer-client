import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginComponent } from './login.component';
import {UserService} from '../../services/user.service';
import {SharedModule} from '../shared/shared.module';
import {AccountCreationComponent} from "./account-creation/account-creation.component";
import {ToasterService} from "../../services/toaster.service";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'account/create',
    component: AccountCreationComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
      LoginComponent,
      AccountCreationComponent
  ],
  providers: [
      UserService,
      ToasterService
  ]
})
export class LoginModule {}
