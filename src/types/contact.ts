export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  inquiryType: 'general' | 'project' | 'consultation' | 'hiring';
}

export interface ContactFormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage?: string;
}
