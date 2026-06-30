import React, { useState } from 'react';

/**
 * Flexible container with consistent border-radius, border, and elevation.
 * Pass an onClick to make it interactive (adds hover elevation).
 */
export function Card({
  children,
  padding = 'md',
  shadow = true,
  border = true,
  onClick,
  style: extraStyle,
}) {
  const [hovered, setHovered] = useState(false);
  const isClickable = typeof onClick === 'function';

  const paddingMap = {
    none: '0',
    sm: 'var(--spacing-component-padding-sm)',
    md: 'var(--spacing-component-padding-md)',
    lg: 'var(--spacing-component-padding-lg)',
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => isClickable && setHovered(true)}
      onMouseLeave={() => isClickable && setHovered(false)}
      style={{
        background: 'var(--color-bg-surface)',
        borderRadius: 'var(--radius-component-card)',
        border: border ? '1px solid var(--color-border-default)' : 'none',
        padding: paddingMap[padding] ?? paddingMap.md,
        boxShadow: shadow
          ? hovered && isClickable
            ? '0 8px 24px rgba(0,0,0,0.12)'
            : '0 2px 8px rgba(0,0,0,0.06)'
          : 'none',
        cursor: isClickable ? 'pointer' : 'default',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        transform: hovered && isClickable ? 'translateY(-2px)' : 'translateY(0)',
        ...extraStyle,
      }}
    >
      {children}
    </div>
  );
}
