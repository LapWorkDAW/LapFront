import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function ValidateDate(controlDate: string) {
    return (formGroup: FormGroup) => {
        const currentDate = new Date().toISOString().split('T')[0]
        const control = formGroup.controls[controlDate];

        if (control.errors && control.errors.validateDate) {
            return;
        }

        if (new Date(control.value) <= new Date(currentDate)) {
            control.setErrors({ validateDate: true });
        } else {
            control.setErrors(null);
        }
    }
}