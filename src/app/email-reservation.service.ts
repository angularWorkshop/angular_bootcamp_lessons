import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailReservationService {
  public isTaken(email: string): Observable<boolean> {
    return of(email.toLowerCase() === 'reserved@workshop.dev');
  }
}
