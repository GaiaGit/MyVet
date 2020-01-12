import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Appointment } from '@app/shared/model/appointment.interface';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  private dataSource = new BehaviorSubject<Appointment[]>([]);
  currentData$ = this.dataSource.asObservable();

  share(events) {
    this.dataSource.next(events);
  }

  constructor() { }
}
