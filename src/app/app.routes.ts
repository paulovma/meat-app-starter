import { Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { RestaurantsComponent } from "./restaurants/restaurants.component";
import { RestaurantDetailComponent } from "./restaurant-detail/restaurant-detail.component";
import { MenuComponent } from "./restaurant-detail/menu/menu.component";
import { ReviewsComponent } from "./restaurant-detail/reviews/reviews.component";
import { OrderSummaryComponent } from "./order/order-summary/order-summary.component";
import { LoginComponent } from './security/login/login.component';
import { LoggedInGuard } from './security/loggedin.guard';


export const ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path:
        'restaurants/:id',
        component: RestaurantDetailComponent,
        children: [
            {path: '', redirectTo: 'menu', pathMatch: 'full'},
            {path: 'menu', component: MenuComponent},
            {path: 'reviews', component: ReviewsComponent},
        ]
    },
    {path: 'restaurants', component: RestaurantsComponent},
    //canLoad stops the whole module from being loaded
    {path: 'order', loadChildren: './order/order.module#OrderModule', canLoad: [LoggedInGuard], canActivate: [LoggedInGuard]},
    {path: 'summary', component: OrderSummaryComponent,},
    //Lazy loading about module. '#AboutModule' is the module name
    {path: 'about', loadChildren: './about/about.module#AboutModule'},
];
