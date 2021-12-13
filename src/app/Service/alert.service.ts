import {Observable, Subject} from "rxjs";
import {Alert, AlertType} from "../Model/alert";
import {filter} from "rxjs/operators";

export class AlertService {
  //members
  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';

  // enable subscribing to alerts observable
  onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  // convenience methods
  success(message: string, options?: any) {
    this.alert(new Alert({...options, type: AlertType.SUCCESS, message}));
  }

  error(message: string, options?: any) {
    this.alert(new Alert({...options, type: AlertType.ERROR, message}));
  }

  // core alert method
  alert(alert: Alert) {
    alert.id = alert.id || this.defaultId;
    alert.autoClose = (alert.autoClose === undefined ? true : alert.autoClose);
    this.subject.next(alert);
  }

  // clear alerts
  clear(id = this.defaultId) {
    this.subject.next(new Alert({id}));
  }
}
