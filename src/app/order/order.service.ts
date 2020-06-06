import {Injectable} from '@angular/core';
import {ShoppingCartService} from 'app/restaurant-detail/shopping-cart/shopping-cart.service';
import {CartItem} from 'app/restaurant-detail/shopping-cart/cart-item.model';
import {Order} from './order.model';
import { LoginService } from 'app/security/login/login.service';

import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MEAT_API} from '../app.api';


@Injectable()
export class OrderService {


  constructor(
    private cartService: ShoppingCartService,
    private http: HttpClient,
    private loginService: LoginService
  ) {
  }

  cartItems(): CartItem[] {
    return this.cartService.items;
  }

  increaseQty(item: CartItem) {
    this.cartService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this.cartService.decreaseQty(item);
  }

  remove(item: CartItem) {
    this.cartService.removeItem(item);
  }

  itemsValue(): number {
    return this.cartService.total();
  }

  checkOrder(order: Order): Observable<string> {
    let headers = new HttpHeaders();
    if (this.loginService.isLoggedIn()) {
      headers.set('Authorization', `Bearer ${this.loginService.user.access_token}`);
    }
    return this.http.post<Order>(`${MEAT_API}/api/restaurants/order`, order, { headers: headers })
      .pipe(map(order => order.id));
  }

  clear() {
    this.cartService.clear();
  }
}
