import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AccountService} from "../../Service/account.service";
import {SocialAuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import {OAuthService} from '../../Service/oAuth.service';
import {TokenDto} from "../../Model/token-dto";
import {AlertService} from "../../Service/alert.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //members
  //*******
  form: FormGroup;
  //flag to know if the form was submitted
  submitted = false;
  //social
  socialUser: SocialUser;
  userLogged: SocialUser;
  isLogged: boolean;

  // convenience getter for easy access to form component in html side
  get f() {
    return this.form.controls;
  }

  // save the user type


  //constructor
  //**************
  constructor(private router: Router,
              private http: HttpClient,
              private accountService: AccountService,
              private formBuilder: FormBuilder,
              private socialAuthService: SocialAuthService,
              private oauthService: OAuthService,
              private alertService: AlertService,
              private translate: TranslateService
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.socialUser = new SocialUser();
    this.userLogged = new SocialUser();
    this.isLogged = false;
  }

  //methods
  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    //stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    //login by email (send to backend)
    this.accountService.login(this.form.value).subscribe(res => {
        if (res.status == "200") {
          if (res.userType == "CLIENT") {
            this.accountService.storeToken(res.authToken, "client", res.email, res.cartItemsNumber);
          } else if (res.userType == "STOREKEEPER") {
            this.accountService.storeToken(res.authToken, "storekeeper", res.email, res.cartItemsNumber);
          } else if (res.userType == "MARKETINGMANAGER") {
            this.accountService.storeToken(res.authToken, "marketingManager", res.email, res.cartItemsNumber);
          } else if (res.userType == "ADMIN") {
            this.accountService.storeToken(res.authToken, "admin", res.email, res.cartItemsNumber);
          }
          this.router.navigate(['/movie']);
          this.alertService.success(this.translate.instant('LoginSuccessfull'));
          //store email address
          this.accountService.storeEmail(this.form.value.email);
          //emit information
          this.accountService.emitUserTypeSubject();
        } else if (res.status == "400") {
          if (res.message == "USER_NOT_VERIFIED") {
            this.alertService.error(this.translate.instant('LoginError'));
          }

        }
      },
      err => {
        this.router.navigate(['/login']);
        if (err.error.alertCode == "USER_CREDENTIAL_INVALID")
          this.alertService.error(this.translate.instant('LoginError'));
        else
          this.alertService.error(this.translate.instant('ErrorOccurDuringLogin'));
      });
  }

  //login with facebook
  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialUser = data;
        const tokenFace = new TokenDto(this.socialUser.authToken);
        this.oauthService.facebook(tokenFace).subscribe(
          res => {
            //debug
            if (res.status == "200") {
              if (res.userType == "CLIENT") {
                this.accountService.storeToken(res.authToken, "client", res.email, res.cartItemsNumber);
                this.router.navigate(['/movie']);
                this.alertService.success(this.translate.instant('LoginSuccessfull'));
              }
              //store email address
              this.accountService.storeEmail(res.email);
              //emit user information
              this.accountService.emitUserTypeSubject();
            }
          },
          err => {
            this.alertService.error(this.translate.instant('LoginError'));
            console.log(err);
            this.logOut();
          }
        );
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }

  //only use if there is a problem with the facebook login
  logOut(): void {
    this.socialAuthService.signOut().then(
      data => {
        this.accountService.logout(); //clean the session storage
        this.isLogged = false;
      }
    );
    //emit user information
    this.accountService.emitUserTypeSubject();
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialUser = data;
        const tokenGoogle = new TokenDto(this.socialUser.idToken);
        this.oauthService.google(tokenGoogle).subscribe(
          res => {
            //debug
            if (res.status == "200") {
              if (res.userType == "CLIENT")
                this.accountService.storeToken(res.authToken, "client", res.email, res.cartItemsNumber);
              else if (res.userType == "MARKETINGMANAGER") //normally only allowed to login with google as a client but for the demo, allow as a marketing manager
                this.accountService.storeToken(res.authToken, "marketingManager", res.email, res.cartItemsNumber);
              this.router.navigate(['/movie']);
              this.alertService.success(this.translate.instant('LoginSuccessfull'));

              //store email address
              this.accountService.storeEmail(res.email);
              //emit user information
              this.accountService.emitUserTypeSubject();
            }
          },
          err => {
            this.alertService.error(this.translate.instant('LoginError'));
            console.log(err);
            this.logOut();
          }
        );
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }

}
