import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent implements OnInit {

  groupId;
  eventsSansDate = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  getEvents(events) {
    this.eventsSansDate = events;
  }
}
