import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {

  email: string;
  username: string;
  id: number;

  constructor(private router: Router) { }

  ngOnInit() {
    this.username = 'Marie';
    this.email = 'email@email.fr';
    // this.username = this.router.getCurrentNavigation().extras.state.user.username;
    // this.email = this.router.getCurrentNavigation().extras.state.user.email;
  }

}
