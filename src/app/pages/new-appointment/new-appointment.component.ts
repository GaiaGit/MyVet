import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { TYPES } from '@assets/data/core';

import { ScheduleService } from '@app/shared/services/appointment/schedule.service';
import { Appointment } from '@app/shared/model/appointment.interface';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss']
})
export class NewAppointmentComponent implements OnInit {

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
    console.log(appointmentData)
    console.log(+formDate)
    
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
      console.log('load')
      this.scheduleService.getAppointments().subscribe(
        data => {
          this.appointments = data;
          this.checkEventDates(this.appointments);
        },
        error => {
          this.formError = "There was a problem. Please, try again.";
        }
      )
    } else {
      console.log('use')
      this.checkEventDates(this.appointments);
    }
  }

  validateTime(){
    let today = new Date();
    let now = today.getHours();
    let selectedTime = this.newAppointment.value.time
    
    if(selectedTime > now)
      return true;

    return false;
  }

  createAppointment(appointmentData){  
    this.scheduleService.createAppointment(appointmentData).subscribe(
      res => {
        this.router.navigate(['/']);
      },
      error => {
        console.log(error)
      }
    )
  }

  saveAppointment(){
    this.submitted = true;

    if(this.newAppointment.valid) {
      
      if(!this.validateTime()){
        this.invalidTime = "Selected time is not valid.";
        console.log(this.invalidTime)
        return;
      }

      this.validateDate()
    }
  }

}
