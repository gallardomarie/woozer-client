import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Group} from '../../../homepage/groupe/group';
import {User} from '../../../login/user';
import {GroupService} from '../../../../services/group.service';
import {CacheService} from '../../../../services/cache.service';
import {Debt} from '../../../homepage/debt/debt';
import {DebtService} from '../../../../services/debt.service';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-debt-creation-popup',
    templateUrl: './debt-creation-popup.component.html',
    styleUrls: ['./debt-creation-popup.component.scss'],
})
export class DebtCreationPopupComponent implements OnInit {

    constructor(
        private groupService: GroupService,
        private cacheService: CacheService,
        private debtService: DebtService,
        private fb: FormBuilder,
        private modalController: ModalController
    ) {
        this.debtForm = fb.group({
            amount: ['', Validators.compose([Validators.required, Validators.min(0)])],
            group: ['', Validators.compose([Validators.required])],
            payedFor: ['', Validators.compose([Validators.required])],
            comment: ['', Validators.compose([Validators.required])],
            selectedGroup: ['']
        });
    }

    debtForm: FormGroup;
    groups: Group[];
    selectedGroup: Group;
    users: User[];
    connectedUser: User;
    debt: Debt;
    groupId: number;

    ngOnInit(): void {
        this.connectedUser = this.cacheService.getUser();
        if (this.cacheService.isInGroup()) {
            this.groupId = this.cacheService.getGroup().id;
            this.updateUsers(this.cacheService.getGroup());
        } else {
            this.groupService.findGroupsByUser(this.connectedUser.id).then((groups) => {
                this.groups = groups;
            });
        }
        this.debt = new Debt(null, this.connectedUser, null, null, null, false);
    }

    compareFn(o1, o2) {
        return o1 && o2 ? o1.id === o2.id : o1 === o2;
    }

    updateUsers(selectedGroup: Group) {
        this.users = [];
        selectedGroup.users.forEach((user) => {
            if (user.id !== this.connectedUser.id) {
                this.users.push(user);
            }
        });
        this.debt.payedFor = null;
    }

    save() {
        this.debtService.save(this.debt).then((debtSaved) => {
            this.closeModalWithDebt(debtSaved);
        });
    }

    closeModal() {
        this.modalController.dismiss();
    }

    closeModalWithDebt(debt: Debt) {
        this.modalController.dismiss(debt);
    }

}
