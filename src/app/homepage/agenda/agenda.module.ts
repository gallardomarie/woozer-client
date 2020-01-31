import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AgendaComponent} from './agenda.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';

const routes: Routes = [
    {
        path: 'agenda',
        component: AgendaComponent
    }
];

@NgModule({
  declarations: [
      AgendaComponent
  ],
  imports: [
      RouterModule.forChild(routes),
      CommonModule,
      SharedModule
  ]
})
export class AgendaModule { }
