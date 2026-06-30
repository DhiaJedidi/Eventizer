import React from 'react';

/**
 * User avatar with automatic initials fallback and consistent color assignment.
 */
export function Avatar({ name, src, size = 'md', shape = 'circle' }) {
  const sizeMap = { xs: 24, sm: 32, md: 40, lg: 48, xl: 64 };
  const px = sizeMap[size] || 40;

  const initials = name
    ? name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase()
    : '?';

  const colorPalette = ['#4563AC', '#E1AA2B', '#2D7D5A', '#C7493A', '#7B5EA7', '#2496A8'];
  const bg = name
    ? colorPalette[name.charCodeAt(0) % colorPalette.length]
    : colorPalette[0];

  return (
    <div style={{
      width: px,
      height: px,
      borderRadius: shape === 'circle' ? '50%' : 'var(--radius-component-card)',
      background: src ? 'transparent' : bg,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      {src ? (
        <img
          src={src}
          alt={name || ''}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <span style={{
          fontFamily: 'var(--primitive-font-family-body)',
          fontWeight: 'var(--primitive-font-weight-semibold)',
          fontSize: Math.round(px * 0.36) + 'px',
          color: '#FFFFFF',
          userSelect: 'none',
          lineHeight: 1,
        }}>
          {initials}
        </span>
      )}
    </div>
  );
}
