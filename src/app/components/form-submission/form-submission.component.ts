import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-submission',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-submission.component.html',
  styleUrls: ['./form-submission.component.scss'],
})
export class FormSubmissionComponent {
  @Input() form!: FormGroup;
  @Input() submitButtonText: string = 'Submit';
  @Input() cancelButtonText: string = 'Cancel';
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();

  showConfirmation = false;
  submittedData: any = null;

  // Add filename property for download
  jsonFilename: string = 'form-data.json';

  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      this.submittedData = formData;
      this.showConfirmation = true;
      this.formSubmit.emit(formData);
    } else {
      // Mark all fields as touched to trigger validation
      this.markFormGroupTouched(this.form);
    }
  }

  onCancel(): void {
    this.formCancel.emit();
  }

  dismissConfirmation(): void {
    this.showConfirmation = false;
    this.submittedData = null;
  }

  // Add download method
  downloadJson(): void {
    if (!this.submittedData) return;

    // Create a JSON string from the submitted data
    const jsonString = JSON.stringify(this.submittedData, null, 2);

    // Create a blob from the JSON string
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);

    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = this.jsonFilename;

    // Append to the body, click, and remove
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Release the URL to free up memory
    window.URL.revokeObjectURL(url);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
