import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export class FormValidators {
  static required(control: AbstractControl): ValidationErrors | null {
    return Validators.required(control) !== null
      ? { required: 'This field is required' }
      : null;
  }

  static min(min: number): ValidatorFn {
    return (control: AbstractControl) => {
      return Validators.min(min)(control) !== null
        ? {
            min: `This field must have equal or greater than ${min}`,
          }
        : null;
    };
  }

  static max(max: number): ValidatorFn {
    return (control: AbstractControl) => {
      return Validators.max(max)(control) !== null
        ? {
            max: `This field must have equal or less than ${max}`,
          }
        : null;
    };
  }

  static minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl) => {
      return Validators.minLength(minLength)(control) !== null
        ? {
            minLength: `This field must have equal or greater than ${minLength} characters`,
          }
        : null;
    };
  }

  static maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl) => {
      return Validators.maxLength(maxLength)(control) !== null
        ? {
            maxLength: `This field must have equal or less than ${maxLength} characters`,
          }
        : null;
    };
  }

  static pattern(pattern: string | RegExp, message: string): ValidatorFn {
    return (control: AbstractControl) => {
      return Validators.pattern(pattern)(control) !== null
        ? {
            pattern: message,
          }
        : null;
    };
  }

  static json(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    let isValid = true;

    if (value !== '') {
      try {
        const parsedValue = JSON.parse(value);
        if (!parsedValue) {
          isValid = false;
        }
      } catch (error) {
        isValid = false;
      }
    }

    return isValid
      ? null
      : {
          json: 'JSON value is invalid',
        };
  }
}
