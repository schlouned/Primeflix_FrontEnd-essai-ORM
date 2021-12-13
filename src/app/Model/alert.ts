export class Alert{
  //members   ! no need to initialized,   ? optional property
  id!: string;
  type!: AlertType;
  message!: string;
  autoClose!: boolean;
  keepAfterRouteChange?: boolean;
  fade!: boolean;

  //constructor
  constructor(init?:Partial<Alert>) {
    Object.assign(this, init);
  }

}

export enum AlertType{
  SUCCESS,
  ERROR
}
