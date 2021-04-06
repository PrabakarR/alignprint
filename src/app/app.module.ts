// Module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Component
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { OrdersComponent } from './orders/orders.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { NgxSpinnerComponent } from './ngx-spinner/ngx-spinner.component';
// Other
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './service/api.service';
import { AddNewOrderComponent } from './add-new-order/add-new-order.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    OrdersComponent,
    SideMenuComponent,
    NgxSpinnerComponent,
    AddNewOrderComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
