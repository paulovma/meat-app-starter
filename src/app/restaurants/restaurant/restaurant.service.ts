import { Restaurant } from './restaurant.model';

import { MEAT_API } from 'app/app.api';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { MenuItem } from 'app/restaurant-detail/menu-item/menu-item.model';

@Injectable()
export class RestaurantService {

    constructor(private http: HttpClient) {}

    restaurants(search = ''): Observable<Restaurant[]> {
      let params: HttpParams = undefined;
      if (search) {
          params = new HttpParams().set('name', search)
      }
        return this.http.get<Restaurant[]>(`${MEAT_API}/api/restaurants`, {params: params})
    }

    restaurantById(id: string): Observable<Restaurant>{
        return this.http.get<Restaurant>(`${MEAT_API}/api/restaurants/${id}`);
    }

    restaurantReview(id: string): Observable<any> {
        return this.http.get(`${MEAT_API}/api/restaurants/${id}/reviews`);
    }

    // creates the observable to anyone who can subscribe to it
    menuOfRestaurant(id: string): Observable<MenuItem[]> {
        return this.http.get<MenuItem[]>(`${MEAT_API}/api/restaurants/${id}/menu`);
    }

}
