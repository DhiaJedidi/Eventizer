import React from 'react';

export interface TagProps {
  /** Tag label */
  children: React.ReactNode;
  /** Called when the dismiss (×) button is clicked */
  onDismiss?: () => void;
  /** Color variant */
  color?: 'default' | 'primary' | 'gold';
}

export declare function Tag(props: TagProps): React.ReactElement;
