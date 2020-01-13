import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '@app/shared/services/auth/auth.service';
import { SessionService } from '@app/shared/services/session/session.service';

import { Credentials } from '@app/shared/model/credentials.model';
import { Session } from '@app/shared/model/session.model';

import { TESTING_ACCOUNT } from '@assets/data/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  subscription:Subscription;
  login: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  isChecked: boolean = false;
  failAuth: string = "";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private sessionService: SessionService,
    private router:Router) { }

  ngOnInit() {
    this.login = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // Redirect to main page if user is already logged (storedToken)
    if(this.sessionService.isStored())
      this.router.navigate(['/']);
  }

  submitLogin() :void {
    this.submitted = true;

    if(this.login.valid) {
      this.loading = true;
      this.subscription = this.authService.login(new Credentials(this.login.value)).subscribe(
        data => this.validCredentials(data),
        error => this.invalidCredentials(error.error)
      );
    }
  }

  validCredentials(data) :void {
    this.loading = false;
    let newSession:Session = new Session(this.login.value.username, data.token)
    this.sessionService.setCurrentSession(newSession);
    this.router.navigate(['/']);
  }

  invalidCredentials(error) :void {
    this.loading = false;
    this.failAuth = error.error;
  }

  setTestingAccount() :void {
    this.failAuth = "";
    this.submitted = false;
    this.isChecked = !this.isChecked;
    if(this.isChecked){
      this.login.patchValue(TESTING_ACCOUNT);
    } else {
      this.login.patchValue({
        username: '',
        password: ''
      })
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
