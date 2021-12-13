import {Component, OnInit} from '@angular/core';
import {RegistrationService} from "../../Service/registration.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertService} from "../../Service/alert.service";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //members
  form: FormGroup;
  //flag to know if the form was submitted
  submitted = false;

  // convenience getter for easy access to form component in html side
  get f() {
    return this.form.controls;
  }

  //constructor
  constructor(private registrationService: RegistrationService,
              private formBuilder: FormBuilder,
              private router: Router,
              private alertService: AlertService,
              private translate: TranslateService) {
    this.form = this.formBuilder.group({
      lastName: ['',[Validators.required, Validators.pattern('[a-zA-Z0-9-]*')]],
      firstName: ['',[Validators.required, Validators.pattern('[a-zA-Z0-9-]*')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  //methods
  ngOnInit(): void {
  }

  //check if validators are ok before sending to the back end
  onSubmit() {
    this.submitted = true;

    //stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    //registration (send to backend)
    this.registrationService.register(this.form.value).subscribe(res => {
        if (res.status == "200") {
          this.router.navigate(['../verifemail']);
          this.alertService.success(this.translate.instant('RegistrationSuccessfully'));
        }
        if (res.status == "400") {
          //detect if it's an error message
          if(res.alertObject.alertType == 'ERROR') {
            //chose the error text
            if(res.alertObject.alertCode == 'USER_NOT_COMPLETED'){
              this.alertService.error(this.translate.instant('RegistrationFieldEmpty'));
            }
            if(res.alertObject.alertCode == 'USER_ALREADY_EXIST') {
              this.alertService.error(this.translate.instant('UserAlreadyExist'));
            }
          }
        }
      },
      err => {
        this.alertService.error(this.translate.instant('ErrorOccurDuringRegistration'));
      });

  }


}
