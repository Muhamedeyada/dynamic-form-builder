import { Injectable } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FormConfig, FormFieldConfig } from '../models/form-config';

@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  private formDataSubject = new BehaviorSubject<any>({});
  formData$ = this.formDataSubject.asObservable();

  constructor(private fb: FormBuilder) {}

  createForm(config: FormConfig): FormGroup {
    const formGroup = this.fb.group({});

    config.groups.forEach((group) => {
      const groupControls = this.createFormGroupFromFields(group.fields);
      for (const controlName in groupControls.controls) {
        formGroup.addControl(controlName, groupControls.get(controlName)!);
      }
    });

    return formGroup;
  }

  private createFormGroupFromFields(fields: FormFieldConfig[]): FormGroup {
    const group = this.fb.group({});
  
    fields.forEach((field) => {
      const validators = this.getValidators(field);
  
      if (field.type === 'array' && field.fields) {
        // Create an empty FormArray with an initial empty group
        const formArray = this.fb.array([] as FormGroup[]);
        group.addControl(field.name, formArray);
        
        // Add initial empty group if needed
        if (field.value && Array.isArray(field.value) && field.value.length > 0) {
          field.value.forEach(itemValue => {
            const itemGroup = this.createFormGroupFromFields(field.fields ?? []);
            itemGroup.patchValue(itemValue);
            formArray.push(itemGroup);
          });
        }
      } else {
        group.addControl(
          field.name,
          this.fb.control(field.value || '', validators)
        );
      }
    });
  
    return group;
  }
  
  addFieldToArray(
    formGroup: FormGroup,
    fieldName: string,
    fieldConfig: FormFieldConfig[]
  ): void {
    const array = formGroup.get(fieldName) as FormArray;
    const group = this.createFormGroupFromFields(fieldConfig);
    array.push(group);
  }

  removeFieldFromArray(
    formGroup: FormGroup,
    fieldName: string,
    index: number
  ): void {
    const array = formGroup.get(fieldName) as FormArray;
    array.removeAt(index);
  }

  private getValidators(field: FormFieldConfig) {
    const validators = [];

    if (field.required) {
      validators.push(Validators.required);
    }

    if (field.minLength !== undefined) {
      validators.push(Validators.minLength(field.minLength));
    }

    if (field.maxLength !== undefined) {
      validators.push(Validators.maxLength(field.maxLength));
    }

    if (field.min !== undefined) {
      validators.push(Validators.min(field.min));
    }

    if (field.max !== undefined) {
      validators.push(Validators.max(field.max));
    }

    if (field.pattern) {
      validators.push(Validators.pattern(field.pattern));
    }

    if (field.type === 'email') {
      validators.push(Validators.email);
    }

    return validators;
  }

  updateFormData(data: any): void {
    this.formDataSubject.next(data);
  }

  getErrorMessage(field: FormFieldConfig, errorType: string): string {
    if (
      field.errorMessages &&
      field.errorMessages[errorType as keyof typeof field.errorMessages]
    ) {
      return (
        field.errorMessages[errorType as keyof typeof field.errorMessages] || ''
      );
    }

    // Default error messages
    const defaultMessages: Record<string, string> = {
      required: 'This field is required',
      email: 'Please enter a valid email address',
      minLength: `Minimum length is ${field.minLength}`,
      maxLength: `Maximum length is ${field.maxLength}`,
      pattern: 'Invalid format',
      min: `Minimum value is ${field.min}`,
      max: `Maximum value is ${field.max}`,
    };

    return defaultMessages[errorType] || 'Invalid value';
  }

  resetForm(form: FormGroup): void {
    form.reset();
    this.formDataSubject.next({});
  }
}
