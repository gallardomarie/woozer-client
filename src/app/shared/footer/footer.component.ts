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
        this.cache.emitChange(null);
        this.router.navigateByUrl('/woozer/home');
    }

}
