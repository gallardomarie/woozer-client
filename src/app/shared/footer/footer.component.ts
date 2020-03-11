import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from 'src/services/cache.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

    constructor(
        private router: Router,
        private cache: CacheService
    ) { }

    ngOnInit() {
    }

    goHome() {
        this.cache.setGroup(null);
        this.cache.changeTitleTopBar("");
        this.router.navigateByUrl('/woozer/home/' + this.cache.getUser().id);
    }

    goDiscussions() {
        if (this.cache.isInGroup()) {
            this.cache.changeTitleTopBar("Nom du groupe");
            this.router.navigateByUrl("/woozer/discussion/" + this.cache.getGroup().id);
        } else {
            this.router.navigateByUrl("/woozer/discussions");
        }
    }

}
