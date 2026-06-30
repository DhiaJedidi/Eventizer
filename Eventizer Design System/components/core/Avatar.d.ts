import React from 'react';

export interface AvatarProps {
  /** Full name — used to derive initials and background color */
  name?: string;
  /** Image URL — shown instead of initials when provided */
  src?: string;
  /** Size preset */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Shape: circle or rounded square */
  shape?: 'circle' | 'square';
}

export declare function Avatar(props: AvatarProps): React.ReactElement;
