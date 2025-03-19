import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormGroup,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { FormBuilderService } from '../../services/form-builder.service';
import { FormFieldConfig } from '../../models/form-config';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent implements OnInit {
  @Input() field!: FormFieldConfig;
  @Input() form!: FormGroup;
  @Input() parentFieldName?: string;

  constructor(private formBuilderService: FormBuilderService) {}

  ngOnInit(): void {}

  get controlAsFormGroup(): FormGroup | null {
    const control = this.formControl;
    return control instanceof FormGroup ? control : null;
  }

  get formControl(): AbstractControl | null {
    return this.form.get(this.field.name);
  }

  get formArray(): FormArray {
    return this.form.get(this.field.name) as FormArray;
  }

  hasError(): boolean {
    const control = this.formControl;
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  getErrorMessage(): string {
    const control = this.formControl;
    if (control && control.errors) {
      const firstError = Object.keys(control.errors)[0];
      return this.formBuilderService.getErrorMessage(this.field, firstError);
    }
    return '';
  }

  addArrayItem(): void {
    if (this.field.fields) {
      this.formBuilderService.addFieldToArray(
        this.form as FormGroup,
        this.field.name,
        this.field.fields
      );
    }
  }

  removeArrayItem(index: number): void {
    this.formBuilderService.removeFieldFromArray(
      this.form as FormGroup,
      this.field.name,
      index
    );
  }

  trackByFn(index: number): number {
    return index;
  }
}
