import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormConfig } from '../../models/form-config';
import { FormBuilderService } from '../../services/form-builder.service';
import { FormFieldComponent } from '../form-field/form-field.component';
import { FormPreviewComponent } from '../form-preview/form-preview.component';
import { FormSubmissionComponent } from '../form-submission/form-submission.component';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldComponent,
    FormPreviewComponent,
    FormSubmissionComponent,
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input() formConfig!: FormConfig;

  form!: FormGroup;

  constructor(private formBuilderService: FormBuilderService) {}

  ngOnInit(): void {
    // Create reactive form based on the provided configuration
    this.form = this.formBuilderService.createForm(this.formConfig);

    // Update form preview data whenever form values change
    this.form.valueChanges.subscribe((data) => {
      this.formBuilderService.updateFormData(data);
    });
  }

  onSubmit(formData: any): void {
    console.log('Form submitted:', formData);
    // Additional submit logic can go here (e.g., API calls)
  }

  onCancel(): void {
    // Reset the form
    this.formBuilderService.resetForm(this.form);
  }
}
