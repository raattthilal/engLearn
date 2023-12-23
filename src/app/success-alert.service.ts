import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SuccessAlertService {
  private successAlertSubject = new BehaviorSubject<string | null>(null);

  getSuccessAlert(): Observable<string | null> {
    return this.successAlertSubject.asObservable();
  }

  showSuccess(message: string, autoDismissTime: number = 3000) {
    this.successAlertSubject.next(message);

    // Auto dismiss after a certain time
    timer(autoDismissTime).pipe(
      switchMap(() => {
        this.successAlertSubject.next(null);
        return [];
      })
    ).subscribe();
  }
}
