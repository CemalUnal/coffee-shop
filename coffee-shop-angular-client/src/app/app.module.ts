import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule,
  MatToolbarModule, MatTooltipModule, MatSnackBar
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {AppRouter} from './app.routing';
import {HeaderComponent} from './home/header/header';
import {HomeScreen} from './home/home';
import {LoginScreen} from './login/login';
import {HttpModule} from '@angular/http';
import {AppService} from './app.service';

import { FormsModule } from '@angular/forms';
import {RegisterScreen} from './register/register';
import {CookieService} from 'ngx-cookie-service';
import {OrderScreen} from './home/orders/orders';
import {ProductScreen} from './home/products/products';
import {UserScreen} from './home/users/users';
import {CdkTableModule} from '@angular/cdk/table';
import {Popup} from './utils/popup/popup';
import {Toast} from './utils/toast/toast';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreen,
    RegisterScreen,
    HomeScreen,
    HeaderComponent,
    OrderScreen,
    ProductScreen,
    UserScreen,
    Popup,
    Toast
  ],
  entryComponents: [Popup, Toast],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRouter,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    FormsModule,
    CdkTableModule
  ],
  providers: [AppService, CookieService, Toast],
  bootstrap: [AppComponent]
})
export class AppModule { }
