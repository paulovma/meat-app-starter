import { NgModule } from "@angular/core";
import { OrderComponent } from "./order.component";
import { OrderItemsComponent } from "./order-items/order-items.component";
import { DeliveryCostsComponent } from "./delivery-costs/delivery-costs.component";
import { SharedModule } from "app/shared/shared.module";
import { Routes, RouterModule } from "@angular/router";
import { LeaveOrderGuard } from './leave-order.guard';

const ROUTES: Routes = [
  {path: '', component: OrderComponent, canDeactivate: [LeaveOrderGuard]}
];

@NgModule({
  declarations: [OrderComponent, OrderItemsComponent, DeliveryCostsComponent],
  imports: [SharedModule, RouterModule.forChild(ROUTES)]
  //in case of declaring 'providers' in a module, if this module is not lazy loaded
  //the class declared in the providers will be loaded in the 'main module' (Therefore, will be available to any other module).
  //When the module is lazy loaded then the module will have its own dependency injection context
})
export class OrderModule {}
