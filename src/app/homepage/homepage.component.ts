import { Component, OnInit } from '@angular/core';
import {CacheService} from "../../services/cache.service";
import {Router} from "@angular/router";
import {User} from "../login/user";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {


  id: number;
  user: User;

  constructor(
      private cacheService: CacheService,
      private router: Router
  ) {}

  ngOnInit() {
    //TODO remettre quand prod
    //this.user = this.router.getCurrentNavigation().extras.state.user;
    //this.cacheService.setUser(this.user);
  }

}
