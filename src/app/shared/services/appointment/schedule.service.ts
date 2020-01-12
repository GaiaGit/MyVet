import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';

import { Appointment } from '@app/shared/model/appointment.interface';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  apiUrl:string = "https://5e14ef4ebce1d10014baef24.mockapi.io/appointments?sortBy=date&order=desc"

  constructor(private http:HttpClient) { }

  getAppointments() : Observable<Appointment[]>{
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  createAppointment(appointment:Appointment) : Observable<any>{
    return this.http.post(this.apiUrl,appointment);
  }
}
