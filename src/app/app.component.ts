import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSpinner } from '@angular/material';

import { SessionService } from '@app/shared/services/session/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MyVet App';

  constructor(public router:Router, public sessionService:SessionService){}

  ngOnInit() { }

  logout() {
    this.sessionService.logout();
  }
}
