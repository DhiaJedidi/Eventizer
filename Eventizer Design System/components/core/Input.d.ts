import React from 'react';

export interface InputProps {
  /** Field label (rendered uppercase) */
  label?: string;
  /** Controlled value */
  value?: string;
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Helper text shown below the input */
  helperText?: string;
  /** Error message — replaces helperText and styles the field red */
  error?: string;
  /** HTML input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
  /** Disable interaction */
  disabled?: boolean;
  /** Show required asterisk */
  required?: boolean;
  /** Input name attribute */
  name?: string;
  /** Input id attribute (falls back to name) */
  id?: string;
}

export declare function Input(props: InputProps): React.ReactElement;
