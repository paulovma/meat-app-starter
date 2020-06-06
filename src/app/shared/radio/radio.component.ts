import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms'
import { RadioOption } from './radio-option.model';

//ControlValueAccessor is used when you create your own html component.
//This interface holds the methods which is used on the component lifecicle
//In other others, to use it as a ngModel you need to implement this interface
@Component({
  selector: 'mt-radio',
  templateUrl: './radio.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true
    }
  ]
})
export class RadioComponent implements OnInit, ControlValueAccessor {

  onChange: any;

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}

  @Input() options: RadioOption[];

  //this value is used to make the comparison among the existent options and the clicked one.
  //The clicked one will receive a 'checked' class
  value: any;

  constructor() { }

  ngOnInit() {
  }

  setValue(value: any) {
    this.value = value;
    this.onChange(this.value);
  }

}
