import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router'
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth.guard';
import { SearchResultComponent } from './home/search-result/search-result.component';
import { ProfilepageComponent } from './home/profilepage/profilepage.component';
import { ResultGuard } from './result.guard';
import { AddtravellerdetailsComponent } from './home/profilepage/addtravellerdetails/addtravellerdetails.component';
import { TravellerdetailsComponent } from './home/profilepage/travellerdetails/travellerdetails.component';
import { EdittravellerdetailsComponent } from './home/profilepage/travellerdetails/edittravellerdetails/edittravellerdetails.component';

export const appRoutes: Routes = [
    { 
        path: 'home',
        component: HomeComponent,
        canActivate:[AuthGuard]
    },
    {   path: 'searchresult', 
        component: SearchResultComponent,
        canActivate:[ResultGuard]
            

    },
    {
        path: 'signup', 
        component: SignUpComponent,
    },
    {
        path: 'login', 
        component: SignInComponent
    },
    {
        path: 'profilepage', 
        component: ProfilepageComponent
    },
 
    {
        path: 'profilepage/addtravellerdetails', 
        component: AddtravellerdetailsComponent
    },
    {
        path: 'profilepage/travellerdetails', 
        component: TravellerdetailsComponent
    },
    {
        path: 'profilepage/travellerdetails/edittravellerdetails', 
        component: EdittravellerdetailsComponent
    },
    { path: '', redirectTo: '/login', pathMatch: 'full'}
]
