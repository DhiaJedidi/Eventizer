import React, { useState } from 'react';

/**
 * Dismissible chip for categories, filters, and selected options.
 */
export function Tag({ children, onDismiss, color = 'default' }) {
  const [hovered, setHovered] = useState(false);

  const colorMap = {
    default: {
      bg: 'var(--color-bg-muted)',
      color: 'var(--color-text-secondary)',
      border: 'transparent',
    },
    primary: {
      bg: 'rgba(69,99,172,0.1)',
      color: 'var(--color-brand-primary)',
      border: 'rgba(69,99,172,0.2)',
    },
    gold: {
      bg: 'rgba(225,170,43,0.12)',
      color: '#92621A',
      border: 'rgba(225,170,43,0.25)',
    },
  };

  const c = colorMap[color] || colorMap.default;

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '4px 10px',
        borderRadius: 'var(--radius-component-badge)',
        background: c.bg,
        color: c.color,
        border: `1px solid ${c.border}`,
        fontFamily: 'var(--primitive-font-family-body)',
        fontSize: 'var(--primitive-font-size-xs)',
        fontWeight: 'var(--primitive-font-weight-medium)',
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
        transition: 'opacity 0.1s ease',
      }}
    >
      {children}
      {onDismiss && (
        <button
          onClick={(e) => { e.stopPropagation(); onDismiss(); }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0 0 0 2px',
            display: 'flex',
            alignItems: 'center',
            color: 'inherit',
            opacity: hovered ? 1 : 0.55,
            fontSize: '15px',
            lineHeight: 1,
            fontWeight: 400,
            transition: 'opacity 0.1s ease',
          }}
        >
          ×
        </button>
      )}
    </span>
  );
}
