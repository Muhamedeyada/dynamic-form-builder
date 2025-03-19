import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderService } from '../../services/form-builder.service';

@Component({
  selector: 'app-form-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.scss'],
})
export class FormPreviewComponent implements OnInit {
  formData: any = {};
  Array: any=Array;

  constructor(private formBuilderService: FormBuilderService) {}

  ngOnInit(): void {
    // Subscribe to form data changes
    this.formBuilderService.formData$.subscribe((data) => {
      this.formData = data;
    });
  }

  // Helper method to check if an object has any properties
  hasProperties(obj: any): boolean {
    return obj && Object.keys(obj).length > 0;
  }

  // Format value for display
  formatValue(value: any): string {
    if (value === null || value === undefined) {
      return '';
    }

    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }

    if (Array.isArray(value)) {
      return value.length > 0 ? `${value.length} items` : '0 items';
    }

    if (typeof value === 'object') {
      return 'Object';
    }

    return String(value);
  }

  // Get object entries for display
  getEntries(obj: any): [string, any][] {
    return Object.entries(obj);
  }

  // Track by function for ngFor
  trackByKey(index: number, item: [string, any]): string {
    return item[0];
  }
}
