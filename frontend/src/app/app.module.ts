import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
 import { SignUpComponent } from './user/sign-up/sign-up.component';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { appRoutes } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { FlightSearchComponent } from './home/flight-search/flight-search.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchResultComponent } from './home/search-result/search-result.component';
import { AccordionModule } from 'ngx-bootstrap/accordion'
import { Data } from './home/data.service';
import { HeaderComponent } from './home/header/header.component';
import { ProfilepageComponent } from './home/profilepage/profilepage.component';
import { ResultGuard } from './result.guard';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    FlightSearchComponent,
    SearchResultComponent,
    HeaderComponent,
    ProfilepageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxSelectModule,
    RouterModule.forRoot(appRoutes),
    ModalModule.forRoot(),
    AccordionModule.forRoot()
  ],
  providers: [AuthGuard,Data,ResultGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
