import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { SessionService } from '@app/shared/services/session/session.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private sessionService: SessionService){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.sessionService.isStored())
        return true;
        
      this.router.navigate(['/login']);
      return false;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      if(this.sessionService.isStored())
        return true;

      this.router.navigate(['/login']);
      return false;
  }
}
