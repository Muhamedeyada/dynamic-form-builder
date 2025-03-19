import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { FormConfig } from './models/form-config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Dynamic Form Builder';

  // Sample form configuration
  formConfig: FormConfig = {
    id: 'user-registration',
    title: 'User Registration Form',
    description: 'Please fill out all required fields to create your account.',
    submitButtonText: 'Create Account',
    cancelButtonText: 'Reset',
    groups: [
      {
        title: 'Personal Information',
        description: 'Basic details about yourself',
        fields: [
          {
            type: 'text',
            name: 'firstName',
            label: 'First Name',
            placeholder: 'Enter your first name',
            required: true,
            minLength: 2,
            errorMessages: {
              required: 'First name is required',
              minLength: 'First name must be at least 2 characters',
            },
          },
          {
            type: 'text',
            name: 'lastName',
            label: 'Last Name',
            placeholder: 'Enter your last name',
            required: true,
            minLength: 2,
            errorMessages: {
              required: 'Last name is required',
              minLength: 'Last name must be at least 2 characters',
            },
          },
          {
            type: 'email',
            name: 'email',
            label: 'Email Address',
            placeholder: 'example@example.com',
            required: true,
            errorMessages: {
              required: 'Email is required',
              email: 'Please enter a valid email address',
            },
          },
          {
            type: 'password',
            name: 'password',
            label: 'Password',
            required: true,
            minLength: 8,
            pattern: '^(?=.*[A-Za-z])(?=.*\\d).{8,}$',
            errorMessages: {
              required: 'Password is required',
              minLength: 'Password must be at least 8 characters',
              pattern:
                'Password must include at least one letter and one number',
            },
          },
        ],
      },
      {
        title: 'Additional Information',
        fields: [
          {
            type: 'select',
            name: 'country',
            label: 'Country',
            placeholder: 'Select your country',
            required: true,
            options: [
              { label: 'United States', value: 'us' },
              { label: 'Canada', value: 'ca' },
              { label: 'United Kingdom', value: 'uk' },
              { label: 'Australia', value: 'au' },
              { label: 'Germany', value: 'de' },
              { label: 'France', value: 'fr' },
              { label: 'Japan', value: 'jp' },
            ],
            errorMessages: {
              required: 'Please select a country',
            },
          },
          {
            type: 'textarea',
            name: 'bio',
            label: 'Biography',
            placeholder: 'Tell us about yourself',
            maxLength: 500,
            errorMessages: {
              maxLength: 'Bio cannot exceed 500 characters',
            },
          },
          {
            type: 'checkbox',
            name: 'subscribe',
            label: 'Subscribe to newsletter',
            value: false,
          },
        ],
      },
      {
        title: 'Interests',
        fields: [
          {
            type: 'array',
            name: 'hobbies',
            label: 'Hobbies',
            fields: [
              {
                type: 'text',
                name: 'name',
                label: 'Hobby Name',
                placeholder: 'Enter hobby name',
                required: true,
                errorMessages: {
                  required: 'Hobby name is required',
                },
              },
              {
                type: 'select',
                name: 'yearsExperience',
                label: 'Years of Experience',
                options: [
                  { label: 'Beginner (< 1 year)', value: 'beginner' },
                  { label: 'Intermediate (1-3 years)', value: 'intermediate' },
                  { label: 'Advanced (3+ years)', value: 'advanced' },
                ],
              },
              {
                type: 'checkbox',
                name: 'isActive',
                label: 'Currently Active',
                value: true,
              },
            ],
          },
        ],
      },
      {
        title: 'Terms and Conditions',
        fields: [
          {
            type: 'checkbox',
            name: 'agreement',
            label: 'I agree to the terms and conditions',
            required: true,
            errorMessages: {
              required: 'You must agree to the terms and conditions',
            },
          },
        ],
      },
    ],
  };
}
