# Angular JSON Form Builder

## Project Overview
This project is a dynamic JSON form builder created with Angular. It allows users to create, preview, and submit forms based on JSON configurations.

## Features
- JSON-driven form creation
- Form field customization
- Live form preview
- Form submission and validation
- Responsive design

## Technology Stack
- Angular 16+
- Reactive Forms
- TypeScript
- Tailwind CSS for styling
- Angular Material components

## Project Structure
The project consists of several key components:
- **Form Builder**: Create and edit form structure via JSON
- **Form Fields**: Customizable form elements
- **Form Preview**: Real-time visualization of the form
- **Form Submission**: Handle and validate form data

## Angular Features Used
- Reactive Forms for efficient form handling
- Custom validators for form validation
- Change detection strategy (OnPush) for optimized performance
- Angular directives for dynamic content creation
- Component communication using services and observables
- Lazy loading modules for improved performance

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Angular CLI (v16 or higher)

### Installation Steps
1. Clone the repository:
   ```
   git clone https://github.com/Muhamedeyada/dynamic-form-builder.git
   ```

2. Navigate to the project directory:
   ```
   cd angular-json-form-builder
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   ng serve
   ```
   or
   ```
   npm start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:4200
   ```

## Usage Guide

### Creating a Form
1. Navigate to the Form Builder component
2. Use the JSON editor to define your form structure
3. Add form fields with the desired properties
4. Save your form configuration

### Form Field Types
The following field types are supported:
- Text input
- Number input
- Dropdown/Select
- Checkboxes
- Radio buttons
- Textarea
- Date picker
- File upload

### Form Preview
- Changes in the JSON configuration are reflected in real-time in the preview section
- Test your form before publishing

### Form Submission
- Submit form data for processing
- View validation errors if any

## Development Notes

### Folder Structure
```
src/
├── app/
│   ├── components/
│   │   ├── form-builder/
│   │   ├── form-fields/
│   │   ├── form-preview/
│   │   └── form-submission/
│   ├── models/
│   ├── services/
│ 
├── assets/
└── environments/
```

### Key Components
- `FormBuilderComponent`: Main component for building forms
- `FormFieldsComponent`: Handles different field types
- `FormPreviewComponent`: Displays the live form preview
- `FormSubmissionComponent`: Manages form submission and download it in json format 

## Performance Optimization
- OnPush change detection strategy
- Lazy loading of modules
- Pure pipes for data transformation
- Efficient state management
- Optimized rendering of dynamic form fields

## Evaluation Criteria
✔ **Problem-Solving Skills** – Efficiently parsing JSON and handling dynamic forms.
✔ **Angular Mastery** – Proper use of Reactive Forms, validation, and directives.
✔ **Code Quality** – Clean, maintainable, and well-structured code.
✔ **Performance & UX** – Optimized rendering, validation, and user experience.

## Troubleshooting
- If you encounter issues with the form builder, check the browser console for errors
- Ensure your JSON structure is valid
- Verify that all required fields are properly defined

## Future Enhancements
- Add more field types
- Implement drag-and-drop form building
- Add form templates
- Enhance validation options
- Implement form data export/import

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
