import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DebtComponent} from './debt.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: 'dettes',
        component: DebtComponent
    }
];

@NgModule({
  declarations: [
      DebtComponent
  ],
  imports: [
      RouterModule.forChild(routes),
      CommonModule
  ]
})
export class DebtModule { }
