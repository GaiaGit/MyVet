import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Credentials } from '@app/shared/model/credentials.model';
import { Session } from '@app/shared/model/session.model';
import { TESTING_ACCOUNT } from '@assets/data/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  newSession:Observable<Session>;

  constructor(private http:HttpClient) { }

  // Mock user data
  login(access:Credentials) :Observable<any> {
    if(TESTING_ACCOUNT.username === access.username && TESTING_ACCOUNT.password === access.password)
      return this.http.get('assets/data/user.json');
    else return throwError({error:{error:'Invalid Credentials'}});
  }
}
