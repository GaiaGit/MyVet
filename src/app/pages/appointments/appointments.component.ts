import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid';

import { ScheduleService } from '@app/shared/services/appointment/schedule.service';
import { AppointmentsService } from '@app/shared/services/appointment/appointments.service';

import { TYPES } from '@assets/data/core';
import { Appointment } from '@app/shared/model/appointment.interface';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  @Input() view:string;

  views:string;
  appointments: Appointment[] = [];
  types = []
  calendarEvents = [];
  placeholder: string = "No appointments found.";
  calendarPlugins = [dayGridPlugin];

  constructor(private scheduleService: ScheduleService,private appointsmentService: AppointmentsService) {
    this.types = TYPES;
  }

  ngOnInit() {
    this.getAppointmentList();
  }

  shareEvents(appointments){
    this.appointsmentService.share(this.appointments)
  }

  setEvents(data){
    data.forEach(ev =>{
      let evento = {
        title: ev.pet,
        start: ev.date,
        end: ev.date,
        backgroundColor: this.types[ev.type -1].color
      };
      this.calendarEvents.push(evento);
    });
  }

  getAppointmentList(){
    this.scheduleService.getAppointments().subscribe(
      data => {
        this.appointments = data;
        this.setEvents(data)
      },
      error => {
        this.placeholder = error.error;
      }
    )
  }


}
