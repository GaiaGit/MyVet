import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/';
import { MatFormFieldModule } from '@angular/material/';
import { MatInputModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material';

import { AuthService } from '@app/shared/services/auth/auth.service';
import { ScheduleService } from '@app/shared/services/appointment/schedule.service';
import { AuthInterceptor } from '@app/shared/interceptors/auth.interceptor';

import { AppComponent } from '@app/app.component';
import { LoginComponent } from '@app/pages/login/login.component';
import { MainComponent } from '@app/pages/main/main.component';
import { NewAppointmentComponent } from '@app/pages/new-appointment/new-appointment.component';
import { AppointmentsComponent } from '@app/pages/appointments/appointments.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    NewAppointmentComponent,
    AppointmentsComponent
  ],
  
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule
  ],
  providers: [
    AuthService,
    ScheduleService,
    [
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ]
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
