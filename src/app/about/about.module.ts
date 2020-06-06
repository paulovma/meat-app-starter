import { NgModule } from "@angular/core";
import { RouterModule, Routes} from '@angular/router';
import { AboutComponent } from "./about.component";

//when I want to lazy load a module, I neet to set whats the 'default' component of the module.
//This case I set the default ('' path) route to go to AboutComponent
//If I had any other component, I would have to create the paths to these components
const ROUTES: Routes = [
    { path: '', component: AboutComponent }
];

@NgModule({
    //here I have to declare all the components thats gonna be within the module
    declarations: [AboutComponent],
    imports: [RouterModule.forChild(ROUTES)]
})
export class AboutModule {}
