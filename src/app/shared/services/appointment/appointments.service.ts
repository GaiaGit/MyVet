import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  private sharing = new BehaviorSubject<any>([]);

  shared$ = this.sharing.asObservable();

  share(events) {
    this.sharing.next(events);
  }

  constructor() { }
}
