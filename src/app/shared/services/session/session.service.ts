import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Session } from '@app/shared/model/session.model';
import { User } from '@app/shared/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private sessionStorage;
  private currentSession: Session = null;

  constructor(private router: Router){
    this.sessionStorage = sessionStorage;
    this.currentSession = this.loadSessionStorage();
  }

  loadSessionStorage() :Session {
    let sessionData = this.sessionStorage.getItem('currentUser');
    return (sessionData) ? JSON.parse(sessionData) : null;
  }

  setCurrentSession(session: Session) :void {
    this.currentSession = session;
    this.sessionStorage.setItem('currentUser', JSON.stringify(session));
  }

  unsetCurrentSession() :void {
    this.currentSession = null;
    this.sessionStorage.removeItem('currentUser');
  }

  getCurrentSession() :Session {
    return this.currentSession;
  }

  getCurrentUser() :string {
    let session = this.currentSession;
    return (session && session.username) ? session.username : null;
  }

  getSessionToken() :string {
    let session = this.currentSession;
    return (session && session.token) ? session.token : null;
  }

  isStored() :boolean {
    return this.getSessionToken() !== null || false;
  }

  logout() :void {
    this.unsetCurrentSession();
    this.router.navigate(['login']);
  }

}
