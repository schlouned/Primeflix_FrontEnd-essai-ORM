import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {UserService} from "../../Service/user.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../Model/user";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Address} from "../../Model/address";
import {Role} from "../../Model/role";
import {AlertService} from "../../Service/alert.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css']
})
export class UserCrudComponent implements OnInit {
  //members
  form: FormGroup;
  users: any[] = [];
  isupdated = false;
  userList: any[] = [];
  userSelected: User = new User();
  closeModal!: string;
  newUser: User = new User();

  //constructor
  constructor(private userService: UserService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private alertService: AlertService,
              private translate: TranslateService) {
    this.form = this.formBuilder.group({
      id: [''],
      lastName: [''],
      firstName: [''],
      email: [''],
      role: [''],
      street: [''],
      houseNumber: [''],
      zipCode: [''],
      city: ['']
    });
  }

  //methods
  ngOnInit(): void {
    this.isupdated = false;
    this.getUsers();
  }

  updateUser(user: User, content: any) {
    this.userSelected = user;
    this.form = this.formBuilder.group({
      id: [user.id],
      lastName: [user.lastName],
      firstName: [user.firstName],
      email: [user.email],
      role: [user.role],
      street: [user.address.street],
      houseNumber: [user.address.houseNumber],
      zipCode: [user.address.zipCode],
      city: [user.address.city]
    });
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getUsers() {
    this.userService.getUsers().subscribe(res => {
        this.users = res.users;
      },
      err => {
        this.alertService.error(this.translate.instant('CrudError'));
        console.log(err);
      });
  }

  onSubmit() {
    //prepare the object
    let address = new Address();
    address.street = this.form.value.street;
    address.houseNumber = this.form.value.houseNumber;
    address.zipCode = this.form.value.zipCode;
    address.city = this.form.value.city;
    address.countryCode = this.userSelected.address.countryCode;

    let user = new User();
    user.id = this.userSelected.id;
    user.email = this.form.value.email;
    user.firstName = this.form.value.firstName;
    user.lastName = this.form.value.lastName;
    user.role = this.form.value.role;
    user.address = address;
    user.accountVerified = true;

    this.userService.saveUser(user).subscribe(
      res => {
        this.alertService.success(this.translate.instant('CrudSuccess'));
        //refresh component
        this.ngOnInit();
        this.isupdated = true;
      },
      err => {
        this.alertService.error(this.translate.instant('CrudError'));
        console.log(err);
      });
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user)
      .subscribe(
        res => {
          this.alertService.success(this.translate.instant('CrudSuccess'));
          this.ngOnInit();
        },
        err => {
          console.log(err);
          this.alertService.error(this.translate.instant('CrudError'));
        });
  }

}
