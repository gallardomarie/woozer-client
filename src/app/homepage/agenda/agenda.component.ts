import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {CacheService} from "../../../services/cache.service";
import {IonContent} from "@ionic/angular";

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent implements OnInit {

  @ViewChild(IonContent, null)
  private content: IonContent;

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
