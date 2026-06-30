import React from 'react';

/**
 * @startingPoint section="Components" subtitle="Surface card with elevation and hover state" viewport="700x200"
 */
export interface CardProps {
  /** Card content */
  children: React.ReactNode;
  /** Internal padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Show subtle box-shadow */
  shadow?: boolean;
  /** Show 1px border */
  border?: boolean;
  /** Click handler — enables hover elevation when provided */
  onClick?: () => void;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

export declare function Card(props: CardProps): React.ReactElement;
