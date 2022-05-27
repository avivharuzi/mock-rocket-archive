import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';

export const markAllAsDirty = (abstractControls: AbstractControl[]): void => {
  abstractControls.forEach((abstractControl) => {
    if (abstractControl instanceof FormControl) {
      (abstractControl as FormControl).markAsDirty({ onlySelf: true });
    } else if (abstractControl instanceof FormGroup) {
      markAllAsDirty(Object.values((abstractControl as FormGroup).controls));
    } else if (abstractControl instanceof FormArray) {
      markAllAsDirty((abstractControl as FormArray).controls);
    }
  });
};
