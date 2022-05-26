import { Directive, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Directive()
export abstract class CommonForm<T> implements ControlValueAccessor {
  @Input() id = '';

  @Input() label = '';

  @Input() placeholder = '';

  @Input() disabled = false;

  @Input() describe = '';

  @Input() describedby = '';

  @Input() value: T | null = null;

  constructor(@Self() @Optional() public ngControl?: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  get control(): FormControl {
    return this.ngControl?.control as FormControl;
  }

  onChange(value: T): T {
    return value;
  }

  onTouched(): void {
    return;
  }

  writeValue(value: T): void {
    this.value = value;
  }

  registerOnChange(fn: () => T): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
