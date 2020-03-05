import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CacheService} from "../../../services/cache.service";

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent implements OnInit {

  groupId;
  eventsSansDate = [];

  constructor(
    private router: Router,
    private cacheService: CacheService
  ) { }

  ngOnInit() {
    this.cacheService.changeTitleTopBar("Nom du groupe");
  }

  getEvents(events) {
    this.eventsSansDate = events;
  }
}
