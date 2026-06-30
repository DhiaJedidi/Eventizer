import React, { useState } from 'react';

/**
 * Text input field with label, helper text, and error state support.
 */
export function Input({
  label,
  value,
  onChange,
  placeholder,
  helperText,
  error,
  type = 'text',
  disabled = false,
  required = false,
  name,
  id,
}) {
  const [focused, setFocused] = useState(false);
  const inputId = id || name || 'input-field';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
      {label && (
        <label htmlFor={inputId} style={{
          fontFamily: 'var(--primitive-font-family-body)',
          fontWeight: 'var(--primitive-font-weight-semibold)',
          fontSize: 'var(--primitive-font-size-sm)',
          letterSpacing: 'var(--primitive-letter-spacing-wide)',
          textTransform: 'uppercase',
          color: error ? '#991B1B' : 'var(--color-text-primary)',
          userSelect: 'none',
        }}>
          {label}
          {required && (
            <span style={{ color: '#DC2626', marginLeft: '4px' }}>*</span>
          )}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          fontFamily: 'var(--primitive-font-family-body)',
          fontSize: 'var(--primitive-font-size-md)',
          color: 'var(--color-text-primary)',
          background: disabled ? 'var(--color-bg-subtle)' : 'var(--color-bg-surface)',
          border: `1.5px solid ${error
            ? '#DC2626'
            : focused
              ? 'var(--color-brand-primary)'
              : 'var(--color-border-default)'}`,
          borderRadius: 'var(--radius-component-input)',
          padding: '10px 12px',
          outline: 'none',
          width: '100%',
          boxSizing: 'border-box',
          cursor: disabled ? 'not-allowed' : 'text',
          opacity: disabled ? 0.6 : 1,
          transition: 'border-color 0.15s ease',
          lineHeight: 'var(--primitive-line-height-normal)',
        }}
      />
      {(helperText || error) && (
        <span style={{
          fontFamily: 'var(--primitive-font-family-body)',
          fontSize: 'var(--primitive-font-size-xs)',
          color: error ? '#DC2626' : 'var(--color-text-secondary)',
          lineHeight: 'var(--primitive-line-height-relaxed)',
        }}>
          {error || helperText}
        </span>
      )}
    </div>
  );
}
