import { Component, OnInit } from '@angular/core';
import { CacheService } from 'src/services/cache.service';
import {DebtService} from '../../../services/debt.service';
import {Debt} from './debt';

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
    private debtService: DebtService
  ) { }

  ngOnInit() {
    this.groupId = this.cache.getCache();
    this.userId = this.cache.getUser().id;
    if (this.groupId) {
        this.debtService.findAllByGroupId(this.groupId).then((debts) => {
            this.debts = debts;
        });
    } else {
      // récupérer dettes perso
    }
  }

  isUserConnected(user: number): boolean {
      return this.userId === user;
  }

}
