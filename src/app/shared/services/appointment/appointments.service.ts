import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Appointment } from '@app/shared/model/appointment.interface';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  private sharing = new BehaviorSubject<Appointment[]>([]);

  shared$ = this.sharing.asObservable();

  share(events) {
    this.sharing.next(events);
  }

  constructor() { }
}
