type ValidationRule<T> = {
 validate: (value: T) => boolean;
 message: string;
};

type ValidationRules<T> = {
 [K in keyof T]?: ValidationRule<T[K]>[];
};

export class ValidationError extends Error {
 constructor(public errors: Record<string, string[]>) {
  super('Validation failed');
  this.name = 'ValidationError';
 }
}

export function validate<T extends Record<string, any>>(
 data: T,
 rules: ValidationRules<T>
): void {
 const errors: Record<string, string[]> = {};

 Object.entries(rules).forEach(([field, fieldRules]) => {
  if (!fieldRules) return;

  const value = data[field];
  const fieldErrors: string[] = [];

  fieldRules.forEach((rule) => {
   if (!rule.validate(value)) {
    fieldErrors.push(rule.message);
   }
  });

  if (fieldErrors.length > 0) {
   errors[field] = fieldErrors;
  }
 });

 if (Object.keys(errors).length > 0) {
  throw new ValidationError(errors);
 }
}

// Common validation rules
export const rules = {
 required: (message = 'This field is required'): ValidationRule<any> => ({
  validate: (value) => value !== undefined && value !== null && value !== '',
  message,
 }),
 minLength: (min: number, message?: string): ValidationRule<string> => ({
  validate: (value) => value.length >= min,
  message: message || `Must be at least ${min} characters`,
 }),
 maxLength: (max: number, message?: string): ValidationRule<string> => ({
  validate: (value) => value.length <= max,
  message: message || `Must be at most ${max} characters`,
 }),
 email: (message = 'Must be a valid email address'): ValidationRule<string> => ({
  validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  message,
 }),
 number: (message = 'Must be a number'): ValidationRule<number> => ({
  validate: (value) => !isNaN(value),
  message,
 }),
 min: (min: number, message?: string): ValidationRule<number> => ({
  validate: (value) => value >= min,
  message: message || `Must be at least ${min}`,
 }),
 max: (max: number, message?: string): ValidationRule<number> => ({
  validate: (value) => value <= max,
  message: message || `Must be at most ${max}`,
 }),
}; 