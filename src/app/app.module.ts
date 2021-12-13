import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {RegisterComponent} from './Components/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegistrationService} from "./Service/registration.service";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from './Components/login/login.component';
import {NavigationComponent} from "./Components/navigation/navigation.component";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {VerifemailComponent} from "./Components/verifemail/verifemail.component";
import {AccountService} from "./Service/account.service";
import {AngularWebStorageModule} from "angular-web-storage";
import {NgxBootstrapIconsModule, allIcons, translate} from 'ngx-bootstrap-icons';
import {OAuthService} from "./Service/oAuth.service";
// social login
import {SocialLoginModule, SocialAuthServiceConfig} from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';

// internationalization
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AccountComponent} from './Components/account/account.component';
import {AuthInterceptor} from "./Service/authInterceptor";
import {AuthGuardService} from "./Service/authGuard.service";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//country code drop down
import {MatSelectCountryModule} from "@angular-material-extensions/select-country";
import {MatSelectModule} from "@angular/material/select";
import {i18nExtract} from "@angular/compiler-cli/src/transformers/i18n";
import {AccountVerifiedComponent} from './Components/accountVerified/account-verified.component';
import {AlertComponent} from './Components/alert/alert.component';
import {AlertService} from "./Service/alert.service";
import {MovieComponent} from './Components/movie/movie.component';
import {CarouselModule} from "ngx-owl-carousel-o";
import {MovieItemComponent} from './Components/movie-item/movie-item.component';
import {MovieItemService} from "./Service/movieItem.service";
import {DiscountComponent} from './Components/discount/discount.component';
import {DiscountService} from "./Service/discount.service";
import { CartComponent } from './Components/cart/cart.component';
import {CartService} from "./Service/cart.service";
import { OrderComponent } from './Components/order/order.component';
import {OrderService} from "./Service/order.service";
import { OrderValidatedComponent } from './Components/order-validated/order-validated.component';
import { PaymentComponent } from './Components/payment/payment.component';
import {PaymentService} from "./Service/paymentService";
import { OrderPayedComponent } from './Components/order-payed/order-payed.component';
import { InventoryComponent } from './Components/inventory/inventory.component';
import {InventoryService} from "./Service/inventory.service";
import { AddMovieComponent } from './Components/add-movie/add-movie.component';
import {UploadFileService} from "./Service/upload-file.service";
import { OrderManagementComponent } from './Components/order-management/order-management.component';
import { UserCrudComponent } from './Components/user-crud/user-crud.component';
import {UserService} from "./Service/user.service";
import {DiscountCrudComponent} from "./Components/discount-crud/discount-crud.component";
import { InventoryCrudComponent } from './Components/inventory-crud/inventory-crud.component';



let language;
if (sessionStorage.getItem("language") == null) {
  language = 'en';
} else {
  language = <string>sessionStorage.getItem("language");
}


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/movie',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'movie',
    component: MovieComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'verifemail',
    component: VerifemailComponent
  },
  {
    path: 'accountVerified',
    component: AccountVerifiedComponent
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuardService],
    data: {
      roles: ['admin', 'client', 'storekeeper', 'marketingManager']
    }
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'order-validated',
    component: OrderValidatedComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'order-payed',
    component: OrderPayedComponent
  },
  {
    path: 'movieItem',
    component: MovieItemComponent
  },
  {
    path: 'inventory',
    component: InventoryComponent,
    canActivate: [AuthGuardService],
    data: {
      roles: ['admin', 'storekeeper']
    }
  },
  {
    path: 'discount',
    component: DiscountComponent,
    canActivate: [AuthGuardService],
    data: {
      roles: ['admin', 'marketingManager']
    },
  },
  {
    path: 'add-movie',
    component: AddMovieComponent,
    canActivate: [AuthGuardService],
    data: {
      roles: ['admin']
    },
  },
  {
    path: 'orderManagement',
    component: OrderManagementComponent,
    canActivate: [AuthGuardService],
    data: {
      roles: ['client','storekeeper','marketingManager','admin']
    },
  },
  {
    path: 'orderManagement',
    component: OrderManagementComponent,
    canActivate: [AuthGuardService],
    data: {
      roles: ['client','storekeeper','marketingManager','admin']
    },
  },
  {
    path: 'user-crud',
    component: UserCrudComponent,
    canActivate: [AuthGuardService],
    data: {
      roles: ['admin']
    },
  },
  {
    path: 'discount-crud',
    component: DiscountCrudComponent,
    canActivate: [AuthGuardService],
    data: {
      roles: ['admin']
    },
  },
  {
    path: 'inventory-crud',
    component: InventoryCrudComponent,
    canActivate: [AuthGuardService],
    data: {
      roles: ['admin']
    },
  },
]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavigationComponent,
    VerifemailComponent,
    AccountComponent,
    AccountVerifiedComponent,
    AlertComponent,
    MovieComponent,
    MovieItemComponent,
    DiscountComponent,
    CartComponent,
    OrderComponent,
    OrderValidatedComponent,
    PaymentComponent,
    OrderPayedComponent,
    InventoryComponent,
    AddMovieComponent,
    OrderManagementComponent,
    UserCrudComponent,
    DiscountCrudComponent,
    InventoryCrudComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    AngularWebStorageModule,
    SocialLoginModule,
    NgxBootstrapIconsModule.pick(allIcons),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    MatSelectCountryModule.forRoot('en'),
    MatSelectModule,
    CarouselModule
  ],
  providers: [
    RegistrationService,
    AccountService,
    OAuthService,
    AuthGuardService,
    AlertService,
    MovieComponent,
    MovieItemService,
    DiscountService,
    CartService,
    OrderService,
    OrderComponent,
    PaymentService,
    InventoryService,
    UploadFileService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '700839171219-gcjr3tbkv9krq2q4smfcfas1svasj2br'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('295208228612969'),
          },
        ],
      } as SocialAuthServiceConfig
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

// i18n AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
