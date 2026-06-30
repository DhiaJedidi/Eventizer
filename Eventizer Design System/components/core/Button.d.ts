import React from 'react';

/**
 * @startingPoint section="Components" subtitle="Action button — 4 variants, 3 sizes" viewport="700x180"
 */
export interface ButtonProps {
  /** Button label or content */
  children: React.ReactNode;
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Disable interaction */
  disabled?: boolean;
  /** Stretch to fill parent width */
  fullWidth?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** HTML button type */
  type?: 'button' | 'submit' | 'reset';
}

export declare function Button(props: ButtonProps): React.ReactElement;
