import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function excludePattern(pattern: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isMatched = control.value.match(pattern);
    return !isMatched ? null : { excludePattern: { value: control.value } };
  };
}
