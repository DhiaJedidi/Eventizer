import React from 'react';

/**
 * Compact status label. Used for event status, category tags, and counts.
 */
export function Badge({ children, variant = 'default', size = 'md' }) {
  const variantMap = {
    default:   { bg: 'var(--color-bg-muted)',          color: 'var(--color-text-secondary)' },
    primary:   { bg: 'var(--color-brand-primary)',     color: '#FFFFFF' },
    secondary: { bg: 'var(--color-brand-secondary)',   color: '#0D0D0D' },
    success:   { bg: 'var(--color-status-success-bg)', color: 'var(--color-status-success-text)' },
    warning:   { bg: 'var(--color-status-warning-bg)', color: 'var(--color-status-warning-text)' },
    danger:    { bg: 'var(--color-status-danger-bg)',  color: 'var(--color-status-danger-text)' },
    info:      { bg: 'var(--color-status-info-bg)',    color: 'var(--color-status-info-text)' },
  };

  const sizeMap = {
    sm: { fontSize: '10px', padding: '2px 8px' },
    md: { fontSize: '11px', padding: '3px 10px' },
  };

  const v = variantMap[variant] || variantMap.default;
  const s = sizeMap[size] || sizeMap.md;

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      borderRadius: 'var(--radius-component-badge)',
      fontFamily: 'var(--primitive-font-family-body)',
      fontWeight: 'var(--primitive-font-weight-semibold)',
      letterSpacing: 'var(--primitive-letter-spacing-wide)',
      textTransform: 'uppercase',
      background: v.bg,
      color: v.color,
      fontSize: s.fontSize,
      padding: s.padding,
      whiteSpace: 'nowrap',
      lineHeight: 1.4,
    }}>
      {children}
    </span>
  );
}
