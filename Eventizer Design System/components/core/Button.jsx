import React, { useState } from 'react';

/**
 * Primary interactive action element. Use for all user-initiated actions.
 * Supports four visual variants and three sizes.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const sizeMap = {
    sm: { fontSize: '12px', padding: '0 14px', height: '32px', gap: '6px' },
    md: { fontSize: '14px', padding: '0 20px', height: '40px', gap: '8px' },
    lg: { fontSize: '16px', padding: '0 28px', height: '48px', gap: '8px' },
  };

  const variantMap = {
    primary: {
      background: pressed && !disabled ? '#2e4690' : hovered && !disabled ? '#3a559e' : 'var(--color-brand-primary)',
      color: 'var(--color-text-on-brand)',
      border: '2px solid transparent',
    },
    secondary: {
      background: pressed && !disabled ? '#c49520' : hovered && !disabled ? '#d4972a' : 'var(--color-brand-secondary)',
      color: '#0D0D0D',
      border: '2px solid transparent',
    },
    outline: {
      background: pressed && !disabled ? 'rgba(69,99,172,0.14)' : hovered && !disabled ? 'rgba(69,99,172,0.08)' : 'transparent',
      color: 'var(--color-brand-primary)',
      border: '2px solid var(--color-brand-primary)',
    },
    ghost: {
      background: pressed && !disabled ? 'rgba(69,99,172,0.14)' : hovered && !disabled ? 'rgba(69,99,172,0.08)' : 'transparent',
      color: 'var(--color-brand-primary)',
      border: '2px solid transparent',
    },
  };

  const s = sizeMap[size] || sizeMap.md;
  const v = variantMap[variant] || variantMap.primary;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        fontFamily: 'var(--primitive-font-family-body)',
        fontWeight: 'var(--primitive-font-weight-semibold)',
        fontSize: s.fontSize,
        letterSpacing: 'var(--primitive-letter-spacing-wide)',
        borderRadius: 'var(--radius-component-button)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: 'all 0.15s ease',
        width: fullWidth ? '100%' : 'auto',
        height: s.height,
        padding: s.padding,
        whiteSpace: 'nowrap',
        lineHeight: 1,
        boxSizing: 'border-box',
        ...v,
      }}
    >
      {children}
    </button>
  );
}
