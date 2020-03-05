import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from 'src/services/cache.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

    private groupId: number;

    constructor(
        private router: Router,
        private cache: CacheService
    ) { }

    ngOnInit() {
    }

    goHome() {
        this.cache.emitChange(null);
        this.cache.changeTitleTopBar("");
        this.router.navigateByUrl('/woozer/home');
    }

    goDiscussions() {
        this.groupId = this.cache.getCache();
        if (this.groupId) {
            this.cache.changeTitleTopBar("Nom du groupe");
            this.router.navigateByUrl("/woozer/discussion/" + this.groupId);
        } else {
            this.router.navigateByUrl("/woozer/discussions");
        }
    }

}
