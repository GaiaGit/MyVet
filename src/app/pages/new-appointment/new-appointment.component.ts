import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TYPES } from '@assets/data/core';

import { ScheduleService } from '@app/shared/services/appointment/schedule.service';
import { Appointment } from '@app/shared/model/appointment.interface';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss']
})
export class NewAppointmentComponent implements OnInit, OnDestroy {

  subscription:Subscription;
  appointments:Appointment[];
  newAppointment:FormGroup;
  types = TYPES;
  submitted: boolean = false;
  minDate:Date = new Date();
  invalidTime:string="";
  formError:string;

  appointmentTime = [
    {
      clock: "8:00 AM",
      hours: 8,
    },
    {
      clock: "9:00 AM",
      hours: 9,
    },
    {
      clock: "10:00 AM",
      hours: 10,
    },
    {
      clock: "11:00 AM",
      hours: 11,
    },
    {
      clock: "12:00 PM",
      hours: 12,
    },
    {
      clock: "1:00 PM",
      hours: 13,
    },
    {
      clock: "2:00 PM",
      hours: 14,
    },
    {
      clock: "3:00 PM",
      hours: 15,
    },
    {
      clock: "4:00 PM",
      hours: 16,
    },
    {
      clock: "5:00 PM",
      hours: 17,
    },
    {
      clock: "6:00 PM",
      hours: 18,
    },
    {
      clock: "7:00 PM",
      hours: 19,
    },
    {
      clock: "8:00 PM",
      hours: 20,
    },
  ]

  constructor(
    private scheduleService: ScheduleService,
    private fb: FormBuilder,
    private router:Router) { }

  ngOnInit() {
    this.newAppointment = this.fb.group({
      type: ['', Validators.required],
      pet: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      comment: ['']
    });
  }

  setAppointment(){
    let fullDate:Date = this.newAppointment.value.date.setHours(this.newAppointment.value.time);
    return {
      type: this.newAppointment.value.type,
      pet: this.newAppointment.value.pet,
      date: fullDate,
      comment: this.newAppointment.value.comment
    }
  }

  checkEventDates(appointments){
    let appointmentData = this.setAppointment();
    let formDate:Date = new Date(appointmentData.date);
    
    let duplicatedAppointment = appointments.filter((event:Appointment)=>{
      let eventDate:Date = new Date(event.date);
      return +eventDate == +formDate;
    });

    if(duplicatedAppointment.length > 0)
      this.formError = "You already have a similar appointment. Please select a different day or time.";

    else
      this.createAppointment(appointmentData);

  }

  validateDate() {
    if(!this.appointments){
      this.subscription = this.scheduleService.getAppointments().subscribe(
        data => {
          this.appointments = data;
          this.checkEventDates(this.appointments);
        },
        error => {
          this.formError = "There was a problem. Please, try again.";
        }
      )
    } else {
      this.checkEventDates(this.appointments);
    }
  }

  validateTime(){
    let today = new Date();
    let now = today.getHours();
    let selectedTime = this.newAppointment.value.time;
    let isToday = today.getDate() == this.newAppointment.value.date.getDate() && 
      today.getMonth() == this.newAppointment.value.date.getMonth() &&
      today.getFullYear() == this.newAppointment.value.date.getFullYear();
    return selectedTime > now && isToday || !isToday;
  }

  createAppointment(appointmentData){  
    this.subscription = this.scheduleService.createAppointment(appointmentData).subscribe(
      res => {
        this.router.navigate(['/']);
      },
      error => {
        this.formError = error;
      }
    )
  }

  saveAppointment(){
    this.submitted = true;
    this.formError = null;
    
    if(this.newAppointment.valid) {
      
      if(!this.validateTime()){
        this.invalidTime = "Selected time is not valid.";
        return;
      }

      this.validateDate()
    } 
  }

  ngOnDestroy() {
    if(this.subscription) this.subscription.unsubscribe();
  }

}
