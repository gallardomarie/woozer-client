import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Group} from '../../../homepage/groupe/group';
import {User} from '../../../login/user';
import {GroupService} from '../../../../services/group.service';
import {CacheService} from '../../../../services/cache.service';
import {Debt} from '../../../homepage/debt/debt';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-debt-creation-popup',
    templateUrl: './debt-creation-popup.component.html',
    styleUrls: ['./debt-creation-popup.component.scss'],
})
export class DebtCreationPopupComponent implements OnInit {

    debtForm: FormGroup;
    groups: Group[];
    selectedGroup: Group;
    users: User[];
    connectedUser: User;
    debt: Debt;

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
            comment: ['']
        });
    }

    ngOnInit(): void {
        this.connectedUser = this.cacheService.getUser();
        this.groupService.findGroupsByUser(this.connectedUser.id).then((groups) => {
            this.groups = groups;
        });
        this.debt = new Debt(null, this.connectedUser, null, null, null, false);
    }

    // TODO mapper liste des groupes avec son champ et ngChange dessus qui appelle updateUsers
    // TODO mapper liste des users avec son champ

    updateUsers() {
        this.users = this.selectedGroup.users;
    }

    closeModal() {
        this.dialogRef.close();

    }

    save() {

    closeModal() {
        this.modalController.dismiss();
    }

}
