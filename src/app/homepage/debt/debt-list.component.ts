import {Component, OnInit, ViewChild} from '@angular/core';
import { CacheService } from 'src/services/cache.service';
import {DebtService} from '../../../services/debt.service';
import {Debt} from './debt';
import {DebtCreationPopupComponent} from '../../shared/popup/debt-creation/debt-creation-popup.component';
import {IonContent, ModalController} from '@ionic/angular';


@Component({
  selector: 'app-debt-list',
  templateUrl: './debt-list.component.html',
  styleUrls: ['./debt-list.component.scss'],
})
export class DebtListComponent implements OnInit {

    @ViewChild(IonContent, null)
    private content: IonContent;

  groupId: number;
  userId: number;
  debts: Debt[];

  constructor(
    private cache: CacheService,
    private debtService: DebtService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.groupId = this.cache.getCache();
    this.userId = this.cache.getUser().id;
    this.loadDebts();
  }

  loadDebts() {
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

    async openCreationDialog() {
        const modal = await this.modalController.create({
            component: DebtCreationPopupComponent,
            cssClass: 'debt-creation-modal'
        });
        modal.onDidDismiss()
            .then((data) => {
                if (!!data) {
                    this.loadDebts();
                }
            });
        return await modal.present();
    }

    acknowledge(debtId: number) {
      this.debtService.acknowledge(debtId).then(() => {
              this.loadDebts();
          });
    }

}
