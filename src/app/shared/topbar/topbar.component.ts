import { Component, OnInit } from '@angular/core';
import {CacheService} from "../../../services/cache.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {

  private subscription: Subscription;
  titleCurrentPage: string;

  constructor(
      private cacheService: CacheService
  ) {
    this.titleCurrentPage = this.cacheService.getTitleTopBar();
  }

  ngOnInit() {
    this.subscription = this.cacheService.titleTopBarObservable
        .subscribe(title => {
          this.titleCurrentPage= title;
        });
  }

}
