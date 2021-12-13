import {Address} from "./address";
import {Role} from "./role";
import {Serializable} from "ts-serializer";

export class User {
  id: string;
  email: string;
  lastName: string;
  firstName: string;
  password: string;
  address: Address;
  role: string;
  accountVerified: boolean;

  constructor() {
    this.id = '';
    this.email = '';
    this.password = '';
    this.lastName = '';
    this.firstName = '';
    this.address = new Address();
    this.role = '';
    this.accountVerified = false;
  }

}
