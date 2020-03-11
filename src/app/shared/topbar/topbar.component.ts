import { Component, OnInit } from '@angular/core';
import {CacheService} from '../../../services/cache.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {

  private subscription: Subscription;
  titleCurrentPage: string;

  constructor(
      private cacheService: CacheService,
      private router: Router
  ) {
    this.titleCurrentPage = this.cacheService.getTitleTopBar();
  }

  ngOnInit() {
    this.subscription = this.cacheService.titleTopBarObservable
        .subscribe(title => {
          this.titleCurrentPage = title;
        });
  }

  goToMyProfile() {
    this.cacheService.setGroup(null);
    this.cacheService.changeTitleTopBar('Mon profil');
    this.router.navigate(['/woozer/account/edit']);
  }

  logout() {
    this.cacheService.changeTitleTopBar('');
    // TODO à remettre quand connexion remise
    // this.cacheService.setUser(null);
    this.cacheService.setGroup(null);
    this.router.navigate(['']);
  }

}
