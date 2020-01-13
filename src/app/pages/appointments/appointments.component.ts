import { throwError, Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { publishReplay, refCount } from 'rxjs/operators';
import dayGridPlugin from '@fullcalendar/daygrid';

import { ScheduleService } from '@app/shared/services/appointment/schedule.service';

import { TYPES } from '@assets/data/core';
import { Appointment } from '@app/shared/model/appointment.interface';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  @Input() view:string;

  loading:boolean = true;
  views:string;
  appointments:Observable<Appointment[]>;
  types = []
  calendarEvents = [];
  placeholder: string = "No appointments found.";
  calendarPlugins = [dayGridPlugin];
  selectedEvent:number;
  options={
    footer: true
  }

  constructor(private scheduleService: ScheduleService) {
    this.types = TYPES;
  }

  ngOnInit() {
    this.getAppointmentList();
  }

  displayType(type:number){
    return this.types[type-1].type;
  }

  toggleComment(id:number){
    this.selectedEvent = this.selectedEvent === id ? null : id;
  }

  setEvents(data){
    data.forEach(ev =>{
      let event = {
        title: ev.pet,
        start: ev.date,
        comment: ev.comment,
        end: ev.date,
        backgroundColor: this.types[ev.type -1].color
      };
      this.calendarEvents.push(event);
    });
  }

  showEventInfo(event){
    event.el.setAttribute('title', `Pet: ${event.event.title}\nComment: ${event.event.extendedProps.comment || 'No comment'}`);
  }

  getAppointmentList(){

    this.appointments = this.scheduleService.getAppointments().pipe(publishReplay(1)).pipe(refCount()).pipe(map(data =>{ 
      this.setEvents(data);
      return data;
    })).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
