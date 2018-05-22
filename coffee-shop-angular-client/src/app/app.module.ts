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
import {Ng2Webstorage} from 'ngx-webstorage';

import { FormsModule } from '@angular/forms';
import {RegisterScreen} from './register/register';
import {OrderScreen} from './home/orders/orders';
import {ProductScreen} from './home/products/products';
import {UserScreen} from './home/users/users';
import {OrderDetails} from './home/users/order-details/order-details';
import {CdkTableModule} from '@angular/cdk/table';
import {Popup} from './utils/popup/popup';
import {Toast} from './utils/toast/toast';
import { OrderDialogComponent } from './home/orders/order-dialog/order-dialog.component';

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
    OrderDetails,
    Popup,
    Toast,
    OrderDialogComponent
  ],
  entryComponents: [Popup, Toast, OrderDialogComponent],
  imports: [
    BrowserModule,
    Ng2Webstorage,
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
  providers: [AppService, Toast],
  bootstrap: [AppComponent]
})
export class AppModule { }
