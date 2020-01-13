import { Component, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSpinner } from '@angular/material';

import { SessionService } from '@app/shared/services/session/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {
  title = 'MyVet App';
  loading:boolean;

  constructor(public router:Router, public sessionService:SessionService){}

  ngOnInit() {   
    this.loading = true;
  }

  ngAfterContentInit(){
    this.loading = false;
  }

  logout() {
    this.sessionService.logout();
  }
}
