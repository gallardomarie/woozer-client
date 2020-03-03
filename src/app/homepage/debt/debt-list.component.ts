import { Component, OnInit } from '@angular/core';
import { CacheService } from 'src/services/cache.service';
import {DebtService} from '../../../services/debt.service';
import {Debt} from './debt';
import {CalendarEventPopupComponent} from '../../shared/popup/calendar-event/calendar-event-popup.component';
import {MatDialog} from '@angular/material/dialog';
import {DebtCreationPopupComponent} from '../../shared/popup/debt-creation/debt-creation-popup.component';

@Component({
  selector: 'app-debt-list',
  templateUrl: './debt-list.component.html',
  styleUrls: ['./debt-list.component.scss'],
})
export class DebtListComponent implements OnInit {

  groupId: number;
  userId: number;
  debts: Debt[];

  constructor(
    private cache: CacheService,
    private debtService: DebtService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.groupId = this.cache.getCache();
    this.userId = this.cache.getUser().id;
    if (this.groupId) {
        this.debtService.findAllByGroupId(this.groupId).then((debts) => {
            this.debts = debts;
        });
    } else {
        this.debtService.findAllByUserId(this.userId).then((debts) => {
            this.debts = debts;
        });
    }
  }

  isUserConnected(user: number): boolean {
      return this.userId === user;
  }

    openCreationDialog() {
        this.matDialog.open(DebtCreationPopupComponent, {
            width: '350px'
        });
    }

}
