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

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
