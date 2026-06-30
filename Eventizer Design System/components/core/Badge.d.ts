import React from 'react';

export interface BadgeProps {
  /** Badge label */
  children: React.ReactNode;
  /** Color/semantic variant */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  /** Size */
  size?: 'sm' | 'md';
}

export declare function Badge(props: BadgeProps): React.ReactElement;
