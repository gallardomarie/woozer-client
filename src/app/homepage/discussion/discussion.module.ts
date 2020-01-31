import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DiscussionComponent} from './discussion.component';

const routes: Routes = [
    {
        path: 'discussions',
        component: DiscussionComponent
    }
];

@NgModule({
  declarations: [
      DiscussionComponent
  ],
  imports: [
      RouterModule.forChild(routes),
      CommonModule,
  ]
})
export class DiscussionModule { }
