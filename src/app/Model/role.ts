/*export enum Role {
    User = 'user',
    Storekeeper = 'storekeeper ',
    MarketingManager = 'marketingManager',
    Admin = 'admin'
}*/

export class Role{
  //members
  id: string;
  code: string;

  //constructor
  constructor() {
    this.id='';
    this.code='';
  }
}
