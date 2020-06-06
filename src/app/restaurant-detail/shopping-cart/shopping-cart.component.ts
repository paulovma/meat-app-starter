import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { CartItem } from './cart-item.model';

import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  animations: [
    trigger('row', [
      state('ready', style({opacity: 1})),
      transition(
        'void => ready',
        animate(
          '300ms 0s ease-in',
          keyframes([
            //transform: whats is going to be animated (eixo X ou Y ou ambos)
            //offset is the step
            //opacity is 0 because its not visible in the screen yet
            //at the end it will be 1 because we want it to be visible in the
            style({opacity: 0, transform: 'translateX(-30px)', offset: 0}),
            style({opacity: 0.8, transform: 'translateX(10px)', offset: 0.8}),
            style({opacity: 1, transform: 'translateX(0px)', offset: 1})

          ])
        )
      ),
      transition(
        'ready => void',
        animate(
          '300ms 0s ease-out',
          keyframes([
            //transform: whats is going to be animated (eixo X ou Y ou ambos)
            //offset is the step
            style({opacity: 1, transform: 'translateX(0px)', offset: 0}), //0px because its gonna start from where its own position
            style({opacity: 0.8, transform: 'translateX(-10px)', offset: 0.2}), //the its gonna move a little bit to the left; decreasing a little bit the opacity so there will be the impression that it is fading away
            style({opacity: 0, transform: 'translateX(30px)', offset: 1}) //and will 'walk' up to 30px; with opacity 0 because as we're removing it, we don't wannt see it in the screen anymore

          ])
        )
      )
    ])
  ]
})
export class ShoppingCartComponent implements OnInit {

  rowState = 'ready';

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
  }

  items(): CartItem[] {
    return this.shoppingCartService.items;
  }

  clear() {
    this.shoppingCartService.clear();
  }

  removeItem(item: any) {
    this.shoppingCartService.removeItem(item);
  }

  addItem(item: any) {
    this.shoppingCartService.addItem(item);
  }

  total(): number {
    return this.shoppingCartService.total();
  }

}
