import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router'
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth.guard';
import { SearchResultComponent } from './home/search-result/search-result.component';

export const appRoutes: Routes = [
    { 
        path: 'home', 
        component: HomeComponent, 
        canActivate: [AuthGuard] 
    },
    {
        path: 'searchresult',
        component: SearchResultComponent
    },
    {
        path: 'signup', 
        component: SignUpComponent
    },
    {
        path: 'login', 
        component: SignInComponent
    },
    { path: '', redirectTo: '/login', pathMatch: 'full'}
]