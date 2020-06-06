import { Component, OnInit } from '@angular/core';


import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantService } from './restaurant/restaurant.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { FilterModel } from './filter.model';

import { Observable, from } from 'rxjs';
import {tap, debounceTime, switchMap, distinctUntilChanged, catchError} from 'rxjs/operators';


@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html'
})
export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[];

  filterForm: FormGroup;
  filterControl: FormControl;


  constructor(
    private restaurantService: RestaurantService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.filterControl = this.formBuilder.control('');
    this.filterForm = this.formBuilder.group({
      filterControl: this.filterControl
    });

    //this method valueChanges over filterCOntrol will be thriggered every time that a value changes on the form (filterForm)
    this.filterControl.valueChanges.pipe(
    //sets the difference between two events
    //in case another event is thriggered in less than 500ms, this event will be cancelled
      debounceTime(500),
      //only different events will be thriggered.
      //FOr example, in our case:
      //when I type 'Bread', one event will be thriggered
      //If I erease Bread and type everything again, this event won't be thriggered, because it is the same as the previous.
      distinctUntilChanged(),
      tap(searchTerm => console.log(searchTerm)),
      switchMap(
        searchTerm => this.restaurantService
          .restaurants(searchTerm)
          .pipe(catchError(error => from([])))
      )
    )
    .subscribe(restaurants => this.restaurants = restaurants);

    this.restaurantService.restaurants().subscribe(restaurants => this.restaurants = restaurants);


  }


}
