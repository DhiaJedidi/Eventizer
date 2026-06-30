/* @ds-bundle: {"format":3,"namespace":"EventizerDesignSystem_3f2cb2","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"088229404471","components/core/Badge.jsx":"5c6208b7a83b","components/core/Button.jsx":"7a310bc6c7f6","components/core/Card.jsx":"c839462540b8","components/core/Input.jsx":"2cb54065a448","components/core/Tag.jsx":"91b804374c3a","ui_kits/eventizer/App.jsx":"08f670097cac","ui_kits/eventizer/Dashboard.jsx":"4bd1f6cfd321","ui_kits/eventizer/EventsList.jsx":"2cc40fc1dc23","ui_kits/eventizer/Sidebar.jsx":"a70c2d63a08b","ui_kits/eventizer/icons.js":"071e1c1c90cf"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.EventizerDesignSystem_3f2cb2 = window.EventizerDesignSystem_3f2cb2 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
/**
 * User avatar with automatic initials fallback and consistent color assignment.
 */
function Avatar({
  name,
  src,
  size = 'md',
  shape = 'circle'
}) {
  const sizeMap = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64
  };
  const px = sizeMap[size] || 40;
  const initials = name ? name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase() : '?';
  const colorPalette = ['#4563AC', '#E1AA2B', '#2D7D5A', '#C7493A', '#7B5EA7', '#2496A8'];
  const bg = name ? colorPalette[name.charCodeAt(0) % colorPalette.length] : colorPalette[0];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: px,
      height: px,
      borderRadius: shape === 'circle' ? '50%' : 'var(--radius-component-card)',
      background: src ? 'transparent' : bg,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name || '',
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--primitive-font-family-body)',
      fontWeight: 'var(--primitive-font-weight-semibold)',
      fontSize: Math.round(px * 0.36) + 'px',
      color: '#FFFFFF',
      userSelect: 'none',
      lineHeight: 1
    }
  }, initials));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
/**
 * Compact status label. Used for event status, category tags, and counts.
 */
function Badge({
  children,
  variant = 'default',
  size = 'md'
}) {
  const variantMap = {
    default: {
      bg: 'var(--color-bg-muted)',
      color: 'var(--color-text-secondary)'
    },
    primary: {
      bg: 'var(--color-brand-primary)',
      color: '#FFFFFF'
    },
    secondary: {
      bg: 'var(--color-brand-secondary)',
      color: '#0D0D0D'
    },
    success: {
      bg: 'var(--color-status-success-bg)',
      color: 'var(--color-status-success-text)'
    },
    warning: {
      bg: 'var(--color-status-warning-bg)',
      color: 'var(--color-status-warning-text)'
    },
    danger: {
      bg: 'var(--color-status-danger-bg)',
      color: 'var(--color-status-danger-text)'
    },
    info: {
      bg: 'var(--color-status-info-bg)',
      color: 'var(--color-status-info-text)'
    }
  };
  const sizeMap = {
    sm: {
      fontSize: '10px',
      padding: '2px 8px'
    },
    md: {
      fontSize: '11px',
      padding: '3px 10px'
    }
  };
  const v = variantMap[variant] || variantMap.default;
  const s = sizeMap[size] || sizeMap.md;
  return /*#__PURE__*/React.createElement("span", {
    style: {
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
      lineHeight: 1.4
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const {
  useState
} = React;
/**
 * Primary interactive action element. Use for all user-initiated actions.
 * Supports four visual variants and three sizes.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button'
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const sizeMap = {
    sm: {
      fontSize: '12px',
      padding: '0 14px',
      height: '32px',
      gap: '6px'
    },
    md: {
      fontSize: '14px',
      padding: '0 20px',
      height: '40px',
      gap: '8px'
    },
    lg: {
      fontSize: '16px',
      padding: '0 28px',
      height: '48px',
      gap: '8px'
    }
  };
  const variantMap = {
    primary: {
      background: pressed && !disabled ? '#2e4690' : hovered && !disabled ? '#3a559e' : 'var(--color-brand-primary)',
      color: 'var(--color-text-on-brand)',
      border: '2px solid transparent'
    },
    secondary: {
      background: pressed && !disabled ? '#c49520' : hovered && !disabled ? '#d4972a' : 'var(--color-brand-secondary)',
      color: '#0D0D0D',
      border: '2px solid transparent'
    },
    outline: {
      background: pressed && !disabled ? 'rgba(69,99,172,0.14)' : hovered && !disabled ? 'rgba(69,99,172,0.08)' : 'transparent',
      color: 'var(--color-brand-primary)',
      border: '2px solid var(--color-brand-primary)'
    },
    ghost: {
      background: pressed && !disabled ? 'rgba(69,99,172,0.14)' : hovered && !disabled ? 'rgba(69,99,172,0.08)' : 'transparent',
      color: 'var(--color-brand-primary)',
      border: '2px solid transparent'
    }
  };
  const s = sizeMap[size] || sizeMap.md;
  const v = variantMap[variant] || variantMap.primary;
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => {
      setHovered(false);
      setPressed(false);
    },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    style: {
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
      ...v
    }
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
const {
  useState
} = React;
/**
 * Flexible container with consistent border-radius, border, and elevation.
 * Pass an onClick to make it interactive (adds hover elevation).
 */
function Card({
  children,
  padding = 'md',
  shadow = true,
  border = true,
  onClick,
  style: extraStyle
}) {
  const [hovered, setHovered] = useState(false);
  const isClickable = typeof onClick === 'function';
  const paddingMap = {
    none: '0',
    sm: 'var(--spacing-component-padding-sm)',
    md: 'var(--spacing-component-padding-md)',
    lg: 'var(--spacing-component-padding-lg)'
  };
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => isClickable && setHovered(true),
    onMouseLeave: () => isClickable && setHovered(false),
    style: {
      background: 'var(--color-bg-surface)',
      borderRadius: 'var(--radius-component-card)',
      border: border ? '1px solid var(--color-border-default)' : 'none',
      padding: paddingMap[padding] ?? paddingMap.md,
      boxShadow: shadow ? hovered && isClickable ? '0 8px 24px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.06)' : 'none',
      cursor: isClickable ? 'pointer' : 'default',
      transition: 'box-shadow 0.2s ease, transform 0.2s ease',
      transform: hovered && isClickable ? 'translateY(-2px)' : 'translateY(0)',
      ...extraStyle
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
const {
  useState
} = React;
/**
 * Text input field with label, helper text, and error state support.
 */
function Input({
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
  id
}) {
  const [focused, setFocused] = useState(false);
  const inputId = id || name || 'input-field';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      width: '100%'
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: 'var(--primitive-font-family-body)',
      fontWeight: 'var(--primitive-font-weight-semibold)',
      fontSize: 'var(--primitive-font-size-sm)',
      letterSpacing: 'var(--primitive-letter-spacing-wide)',
      textTransform: 'uppercase',
      color: error ? '#991B1B' : 'var(--color-text-primary)',
      userSelect: 'none'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#DC2626',
      marginLeft: '4px'
    }
  }, "*")), /*#__PURE__*/React.createElement("input", {
    id: inputId,
    name: name,
    type: type,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    disabled: disabled,
    required: required,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      fontFamily: 'var(--primitive-font-family-body)',
      fontSize: 'var(--primitive-font-size-md)',
      color: 'var(--color-text-primary)',
      background: disabled ? 'var(--color-bg-subtle)' : 'var(--color-bg-surface)',
      border: `1.5px solid ${error ? '#DC2626' : focused ? 'var(--color-brand-primary)' : 'var(--color-border-default)'}`,
      borderRadius: 'var(--radius-component-input)',
      padding: '10px 12px',
      outline: 'none',
      width: '100%',
      boxSizing: 'border-box',
      cursor: disabled ? 'not-allowed' : 'text',
      opacity: disabled ? 0.6 : 1,
      transition: 'border-color 0.15s ease',
      lineHeight: 'var(--primitive-line-height-normal)'
    }
  }), (helperText || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--primitive-font-family-body)',
      fontSize: 'var(--primitive-font-size-xs)',
      color: error ? '#DC2626' : 'var(--color-text-secondary)',
      lineHeight: 'var(--primitive-line-height-relaxed)'
    }
  }, error || helperText));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
const {
  useState
} = React;
/**
 * Dismissible chip for categories, filters, and selected options.
 */
function Tag({
  children,
  onDismiss,
  color = 'default'
}) {
  const [hovered, setHovered] = useState(false);
  const colorMap = {
    default: {
      bg: 'var(--color-bg-muted)',
      color: 'var(--color-text-secondary)',
      border: 'transparent'
    },
    primary: {
      bg: 'rgba(69,99,172,0.1)',
      color: 'var(--color-brand-primary)',
      border: 'rgba(69,99,172,0.2)'
    },
    gold: {
      bg: 'rgba(225,170,43,0.12)',
      color: '#92621A',
      border: 'rgba(225,170,43,0.25)'
    }
  };
  const c = colorMap[color] || colorMap.default;
  return /*#__PURE__*/React.createElement("span", {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
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
      transition: 'opacity 0.1s ease'
    }
  }, children, onDismiss && /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onDismiss();
    },
    style: {
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
      transition: 'opacity 0.1s ease'
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// ui_kits/eventizer/App.jsx
try { (() => {
/* Eventizer UI Kit — Root App */

function PlaceholderPage({
  title,
  icon
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-bg-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      color: 'var(--color-text-disabled)',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(EvIcon, {
    name: icon,
    size: 36
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--primitive-font-family-heading)',
      fontWeight: 700,
      fontSize: 18,
      color: 'var(--color-text-secondary)',
      marginBottom: 6
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--primitive-font-family-body)',
      fontSize: 13,
      color: 'var(--color-text-disabled)'
    }
  }, "This section is coming soon.")));
}
function App() {
  const [page, setPage] = React.useState('dashboard');
  function renderPage() {
    switch (page) {
      case 'dashboard':
        return /*#__PURE__*/React.createElement(Dashboard, null);
      case 'events':
        return /*#__PURE__*/React.createElement(EventsList, null);
      case 'attendees':
        return /*#__PURE__*/React.createElement(PlaceholderPage, {
          title: "Attendees",
          icon: "users"
        });
      case 'analytics':
        return /*#__PURE__*/React.createElement(PlaceholderPage, {
          title: "Analytics",
          icon: "bar-chart-2"
        });
      case 'settings':
        return /*#__PURE__*/React.createElement(PlaceholderPage, {
          title: "Settings",
          icon: "settings"
        });
      default:
        return /*#__PURE__*/React.createElement(Dashboard, null);
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      background: 'var(--color-bg-subtle)'
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    active: page,
    onNavigate: setPage
  }), renderPage());
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/eventizer/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/eventizer/Dashboard.jsx
try { (() => {
/* Eventizer UI Kit — Dashboard View */

/* ── Inline Badge (self-contained, matches design system) ── */
const BADGE_V = {
  default: {
    bg: '#E8E8E8',
    color: '#616161'
  },
  primary: {
    bg: '#4563AC',
    color: '#fff'
  },
  secondary: {
    bg: '#E1AA2B',
    color: '#0D0D0D'
  },
  success: {
    bg: '#D1FAE5',
    color: '#065F46'
  },
  warning: {
    bg: '#FEF3C7',
    color: '#92400E'
  },
  danger: {
    bg: '#FEE2E2',
    color: '#991B1B'
  },
  info: {
    bg: '#DBEAFE',
    color: '#1E40AF'
  }
};
function Badge({
  children,
  variant = 'default'
}) {
  const v = BADGE_V[variant] || BADGE_V.default;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      borderRadius: 9999,
      fontFamily: 'var(--primitive-font-family-body)',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      background: v.bg,
      color: v.color,
      fontSize: '11px',
      padding: '3px 10px',
      whiteSpace: 'nowrap',
      lineHeight: 1.4
    }
  }, children);
}
const MOCK_STATS = [{
  label: 'Upcoming Events',
  value: '12',
  delta: '+2 this month',
  icon: 'calendar',
  iconBg: 'rgba(69,99,172,0.1)',
  iconColor: 'var(--color-brand-primary)'
}, {
  label: 'Total Attendees',
  value: '1,248',
  delta: '+124 this week',
  icon: 'users',
  iconBg: 'rgba(69,99,172,0.1)',
  iconColor: 'var(--color-brand-primary)'
}, {
  label: 'Tickets Sold',
  value: '847',
  delta: '68% of target',
  icon: 'ticket',
  iconBg: 'rgba(225,170,43,0.12)',
  iconColor: '#92621A'
}, {
  label: 'Revenue',
  value: '€23,450',
  delta: '+€3,200 / week',
  icon: 'euro',
  iconBg: '#D1FAE5',
  iconColor: '#065F46'
}];
const MOCK_EVENTS = [{
  name: 'Tech Summit 2026',
  date: 'Jul 15',
  location: 'Paris',
  reg: 450,
  cap: 500,
  status: 'success',
  label: 'Published'
}, {
  name: 'Digital Marketing Forum',
  date: 'Aug 3',
  location: 'Lyon',
  reg: 280,
  cap: 350,
  status: 'success',
  label: 'Published'
}, {
  name: 'Startup Pitch Night',
  date: 'Aug 22',
  location: 'Paris',
  reg: 0,
  cap: 120,
  status: 'warning',
  label: 'Draft'
}, {
  name: 'Innovation Week',
  date: 'Sep 10',
  location: 'Bordeaux',
  reg: 0,
  cap: 600,
  status: 'warning',
  label: 'Draft'
}, {
  name: 'AI & Future Conference',
  date: 'Oct 5',
  location: 'Paris',
  reg: 890,
  cap: 900,
  status: 'info',
  label: 'Live'
}];
function Dashboard() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      background: 'var(--color-bg-subtle)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      borderBottom: '1px solid var(--color-border-default)',
      padding: '16px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--primitive-font-family-heading)',
      fontWeight: 700,
      fontSize: 22,
      color: 'var(--color-text-primary)',
      letterSpacing: '-0.01em'
    }
  }, "Good morning, Sophie"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--color-text-secondary)',
      marginTop: 2,
      fontFamily: 'var(--primitive-font-family-body)'
    }
  }, "Here's what's happening with your events today.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'none',
      border: '1px solid var(--color-border-default)',
      borderRadius: 8,
      padding: '8px 10px',
      cursor: 'pointer',
      color: 'var(--color-text-secondary)',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(EvIcon, {
    name: "bell",
    size: 18
  })), /*#__PURE__*/React.createElement("button", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      background: 'var(--color-brand-primary)',
      color: '#fff',
      border: 'none',
      borderRadius: 8,
      padding: '9px 18px',
      fontFamily: 'var(--primitive-font-family-body)',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      letterSpacing: '0.04em'
    }
  }, /*#__PURE__*/React.createElement(EvIcon, {
    name: "plus",
    size: 16
  }), "New Event"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 16
    }
  }, MOCK_STATS.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.label,
    style: {
      background: '#fff',
      borderRadius: 16,
      border: '1px solid var(--color-border-default)',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 10,
      background: s.iconBg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(EvIcon, {
    name: s.icon,
    size: 20,
    color: s.iconColor
  })), /*#__PURE__*/React.createElement(EvIcon, {
    name: "arrow-up-right",
    size: 16,
    color: "var(--color-text-disabled)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--primitive-font-family-heading)',
      fontWeight: 700,
      fontSize: 26,
      color: 'var(--color-text-primary)',
      letterSpacing: '-0.01em'
    }
  }, s.value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--color-text-secondary)',
      fontFamily: 'var(--primitive-font-family-body)',
      marginTop: 2
    }
  }, s.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: '#065F46',
      fontFamily: 'var(--primitive-font-family-body)',
      marginTop: 8,
      background: '#D1FAE5',
      borderRadius: 999,
      padding: '3px 9px',
      display: 'inline-block'
    }
  }, s.delta)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      borderRadius: 16,
      border: '1px solid var(--color-border-default)',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 24px',
      borderBottom: '1px solid var(--color-border-default)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--primitive-font-family-heading)',
      fontWeight: 700,
      fontSize: 16,
      color: 'var(--color-text-primary)'
    }
  }, "Upcoming Events"), /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: 13,
      color: 'var(--color-brand-primary)',
      fontFamily: 'var(--primitive-font-family-body)',
      fontWeight: 600
    }
  }, "View all \u2192")), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: 'var(--color-bg-subtle)'
    }
  }, ['Event', 'Date', 'Location', 'Registrations', 'Status', ''].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      padding: '10px 24px',
      textAlign: 'left',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--color-text-disabled)',
      fontFamily: 'var(--primitive-font-family-body)'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, MOCK_EVENTS.map((ev, i) => /*#__PURE__*/React.createElement("tr", {
    key: ev.name,
    style: {
      borderTop: i > 0 ? '1px solid var(--color-border-default)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--primitive-font-family-body)',
      fontWeight: 600,
      fontSize: 14,
      color: 'var(--color-text-primary)'
    }
  }, ev.name)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--color-text-secondary)',
      fontFamily: 'var(--primitive-font-family-body)'
    }
  }, ev.date)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      fontSize: 13,
      color: 'var(--color-text-secondary)',
      fontFamily: 'var(--primitive-font-family-body)'
    }
  }, /*#__PURE__*/React.createElement(EvIcon, {
    name: "map-pin",
    size: 13
  }), ev.location)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--color-text-primary)',
      fontFamily: 'var(--primitive-font-family-body)'
    }
  }, ev.reg > 0 ? ev.reg.toLocaleString() : '—', /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 400,
      color: 'var(--color-text-disabled)',
      fontSize: 12
    }
  }, " / ", ev.cap)), ev.reg > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      height: 4,
      borderRadius: 2,
      background: 'var(--color-bg-muted)',
      width: 80,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      borderRadius: 2,
      background: 'var(--color-brand-primary)',
      width: `${Math.round(ev.reg / ev.cap * 100)}%`
    }
  })))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 24px'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: ev.status
  }, ev.label)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 24px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--color-text-disabled)',
      padding: 4,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(EvIcon, {
    name: "more-horizontal",
    size: 16
  }))))))))));
}
window.Dashboard = Dashboard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/eventizer/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/eventizer/EventsList.jsx
try { (() => {
/* Eventizer UI Kit — Events List View */

/* ── Inline Badge (self-contained, matches design system) ── */
const BADGE_V = {
  default: {
    bg: '#E8E8E8',
    color: '#616161'
  },
  primary: {
    bg: '#4563AC',
    color: '#fff'
  },
  secondary: {
    bg: '#E1AA2B',
    color: '#0D0D0D'
  },
  success: {
    bg: '#D1FAE5',
    color: '#065F46'
  },
  warning: {
    bg: '#FEF3C7',
    color: '#92400E'
  },
  danger: {
    bg: '#FEE2E2',
    color: '#991B1B'
  },
  info: {
    bg: '#DBEAFE',
    color: '#1E40AF'
  }
};
function Badge({
  children,
  variant = 'default'
}) {
  const v = BADGE_V[variant] || BADGE_V.default;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      borderRadius: 9999,
      fontFamily: 'var(--primitive-font-family-body)',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      background: v.bg,
      color: v.color,
      fontSize: '11px',
      padding: '3px 10px',
      whiteSpace: 'nowrap',
      lineHeight: 1.4
    }
  }, children);
}
const ALL_EVENTS = [{
  id: 1,
  name: 'Tech Summit 2026',
  date: 'Jul 15, 2026',
  location: 'Paris Convention Centre',
  reg: 450,
  cap: 500,
  status: 'success',
  label: 'Published',
  category: 'Technology',
  hue: '#4563AC'
}, {
  id: 2,
  name: 'Digital Marketing Forum',
  date: 'Aug 3, 2026',
  location: 'Bourse de Commerce, Lyon',
  reg: 280,
  cap: 350,
  status: 'success',
  label: 'Published',
  category: 'Marketing',
  hue: '#E1AA2B'
}, {
  id: 3,
  name: 'Startup Pitch Night',
  date: 'Aug 22, 2026',
  location: 'Station F, Paris',
  reg: 0,
  cap: 120,
  status: 'warning',
  label: 'Draft',
  category: 'Startup',
  hue: '#2D7D5A'
}, {
  id: 4,
  name: 'Innovation Week',
  date: 'Sep 10, 2026',
  location: 'Bordeaux',
  reg: 0,
  cap: 600,
  status: 'warning',
  label: 'Draft',
  category: 'Innovation',
  hue: '#C7493A'
}, {
  id: 5,
  name: 'AI & Future Conference',
  date: 'Oct 5, 2026',
  location: 'Palais des Congrès, Paris',
  reg: 890,
  cap: 900,
  status: 'info',
  label: 'Live',
  category: 'Technology',
  hue: '#7B5EA7'
}, {
  id: 6,
  name: 'Eventizer Forum 2026',
  date: 'Nov 12, 2026',
  location: 'Cité des Sciences, Paris',
  reg: 0,
  cap: 1200,
  status: 'warning',
  label: 'Draft',
  category: 'Community',
  hue: '#2496A8'
}];
function EventsList() {
  const [search, setSearch] = React.useState('');
  const [filter, setFilter] = React.useState('all');
  const [viewMode, setView] = React.useState('grid');
  const filtered = ALL_EVENTS.filter(ev => {
    if (search && !ev.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === 'published' && ev.label !== 'Published') return false;
    if (filter === 'draft' && ev.label !== 'Draft') return false;
    if (filter === 'live' && ev.label !== 'Live') return false;
    return true;
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      background: 'var(--color-bg-subtle)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      borderBottom: '1px solid var(--color-border-default)',
      padding: '16px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--primitive-font-family-heading)',
      fontWeight: 700,
      fontSize: 22,
      color: 'var(--color-text-primary)',
      letterSpacing: '-0.01em'
    }
  }, "My Events"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--color-text-secondary)',
      marginTop: 2,
      fontFamily: 'var(--primitive-font-family-body)'
    }
  }, ALL_EVENTS.length, " events total")), /*#__PURE__*/React.createElement("button", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      background: 'var(--color-brand-primary)',
      color: '#fff',
      border: 'none',
      borderRadius: 8,
      padding: '9px 18px',
      fontFamily: 'var(--primitive-font-family-body)',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      letterSpacing: '0.04em'
    }
  }, /*#__PURE__*/React.createElement(EvIcon, {
    name: "plus",
    size: 16
  }), "New Event")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      borderBottom: '1px solid var(--color-border-default)',
      padding: '10px 32px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      background: 'var(--color-bg-subtle)',
      border: '1px solid var(--color-border-default)',
      borderRadius: 8,
      padding: '7px 12px',
      flexShrink: 0,
      width: 260
    }
  }, /*#__PURE__*/React.createElement(EvIcon, {
    name: "search",
    size: 15,
    color: "var(--color-text-disabled)"
  }), /*#__PURE__*/React.createElement("input", {
    value: search,
    onChange: e => setSearch(e.target.value),
    placeholder: "Search events\u2026",
    style: {
      border: 'none',
      background: 'transparent',
      outline: 'none',
      fontSize: 13,
      color: 'var(--color-text-primary)',
      fontFamily: 'var(--primitive-font-family-body)',
      width: '100%'
    }
  })), ['all', 'published', 'draft', 'live'].map(f => /*#__PURE__*/React.createElement("button", {
    key: f,
    onClick: () => setFilter(f),
    style: {
      border: 'none',
      padding: '6px 14px',
      borderRadius: 20,
      cursor: 'pointer',
      fontFamily: 'var(--primitive-font-family-body)',
      fontSize: 13,
      fontWeight: filter === f ? 600 : 400,
      background: filter === f ? 'rgba(69,99,172,0.1)' : 'transparent',
      color: filter === f ? 'var(--color-brand-primary)' : 'var(--color-text-secondary)',
      transition: 'all 0.15s'
    }
  }, f.charAt(0).toUpperCase() + f.slice(1))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 4
    }
  }, [['grid', 'grid'], ['list', 'list']].map(([v, icon]) => /*#__PURE__*/React.createElement("button", {
    key: v,
    onClick: () => setView(v),
    style: {
      border: '1px solid var(--color-border-default)',
      padding: '7px',
      borderRadius: 7,
      background: viewMode === v ? 'var(--color-bg-muted)' : '#fff',
      cursor: 'pointer',
      color: viewMode === v ? 'var(--color-text-primary)' : 'var(--color-text-disabled)',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(EvIcon, {
    name: icon,
    size: 16
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 32px',
      flex: 1
    }
  }, viewMode === 'grid' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 16
    }
  }, filtered.map(ev => /*#__PURE__*/React.createElement("div", {
    key: ev.id,
    style: {
      background: '#fff',
      borderRadius: 16,
      border: '1px solid var(--color-border-default)',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 80,
      background: ev.hue,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0.88
    }
  }, /*#__PURE__*/React.createElement(EvIcon, {
    name: "calendar",
    size: 28,
    color: "rgba(255,255,255,0.7)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: ev.status
  }, ev.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--color-text-disabled)',
      fontFamily: 'var(--primitive-font-family-body)'
    }
  }, ev.category)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--primitive-font-family-heading)',
      fontWeight: 700,
      fontSize: 15,
      color: 'var(--color-text-primary)',
      marginBottom: 8,
      lineHeight: 1.3
    }
  }, ev.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      fontSize: 12,
      color: 'var(--color-text-secondary)',
      fontFamily: 'var(--primitive-font-family-body)'
    }
  }, /*#__PURE__*/React.createElement(EvIcon, {
    name: "clock",
    size: 12
  }), ev.date), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      fontSize: 12,
      color: 'var(--color-text-secondary)',
      fontFamily: 'var(--primitive-font-family-body)'
    }
  }, /*#__PURE__*/React.createElement(EvIcon, {
    name: "map-pin",
    size: 12
  }), ev.location)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      fontSize: 12,
      color: 'var(--color-text-secondary)',
      fontFamily: 'var(--primitive-font-family-body)'
    }
  }, /*#__PURE__*/React.createElement(EvIcon, {
    name: "users",
    size: 12
  }), ev.reg > 0 ? `${ev.reg} / ${ev.cap}` : `0 / ${ev.cap}`), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--color-text-disabled)',
      padding: 4,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(EvIcon, {
    name: "eye",
    size: 14
  })), /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--color-text-disabled)',
      padding: 4,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(EvIcon, {
    name: "edit",
    size: 14
  })))))))) : /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      borderRadius: 16,
      border: '1px solid var(--color-border-default)',
      overflow: 'hidden'
    }
  }, filtered.map((ev, i) => /*#__PURE__*/React.createElement("div", {
    key: ev.id,
    style: {
      display: 'flex',
      alignItems: 'center',
      padding: '14px 24px',
      gap: 16,
      borderTop: i > 0 ? '1px solid var(--color-border-default)' : 'none',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 10,
      background: ev.hue,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      opacity: 0.88
    }
  }, /*#__PURE__*/React.createElement(EvIcon, {
    name: "calendar",
    size: 18,
    color: "rgba(255,255,255,0.8)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--primitive-font-family-body)',
      fontWeight: 600,
      fontSize: 14,
      color: 'var(--color-text-primary)'
    }
  }, ev.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--color-text-secondary)',
      fontFamily: 'var(--primitive-font-family-body)',
      marginTop: 2
    }
  }, ev.date, " \xB7 ", ev.location)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--color-text-secondary)',
      fontFamily: 'var(--primitive-font-family-body)'
    }
  }, ev.reg > 0 ? `${ev.reg} attendees` : 'No registrations'), /*#__PURE__*/React.createElement(Badge, {
    variant: ev.status
  }, ev.label), /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--color-text-disabled)',
      padding: 4,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(EvIcon, {
    name: "more-horizontal",
    size: 16
  })))))));
}
window.EventsList = EventsList;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/eventizer/EventsList.jsx", error: String((e && e.message) || e) }); }

// ui_kits/eventizer/Sidebar.jsx
try { (() => {
/* Eventizer UI Kit — Sidebar */

const NAV_ITEMS = [{
  id: 'dashboard',
  label: 'Dashboard',
  icon: 'layout-dashboard'
}, {
  id: 'events',
  label: 'My Events',
  icon: 'calendar'
}, {
  id: 'attendees',
  label: 'Attendees',
  icon: 'users'
}, {
  id: 'analytics',
  label: 'Analytics',
  icon: 'bar-chart-2'
}, {
  id: 'settings',
  label: 'Settings',
  icon: 'settings'
}];
function Sidebar({
  active,
  onNavigate
}) {
  const [hoveredId, setHoveredId] = React.useState(null);
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 240,
      height: '100%',
      background: '#fff',
      borderRight: '1px solid var(--color-border-default)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 20px 16px',
      borderBottom: '1px solid var(--color-border-default)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--primitive-font-family-heading)',
      fontWeight: 700,
      fontSize: 22,
      color: 'var(--color-brand-primary)',
      letterSpacing: '-0.02em',
      lineHeight: 1
    }
  }, "Eventizer"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 2.5,
      background: 'var(--color-brand-secondary)',
      borderRadius: 2,
      marginTop: 6
    }
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      flex: 1,
      padding: '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      overflowY: 'auto'
    }
  }, NAV_ITEMS.map(item => {
    const isActive = active === item.id;
    const isHovered = hoveredId === item.id;
    return /*#__PURE__*/React.createElement("button", {
      key: item.id,
      onClick: () => onNavigate(item.id),
      onMouseEnter: () => setHoveredId(item.id),
      onMouseLeave: () => setHoveredId(null),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 12px',
        borderRadius: 8,
        border: 'none',
        background: isActive ? 'rgba(69,99,172,0.1)' : isHovered ? 'var(--color-bg-subtle)' : 'transparent',
        color: isActive ? 'var(--color-brand-primary)' : 'var(--color-text-secondary)',
        fontFamily: 'var(--primitive-font-family-body)',
        fontSize: 14,
        fontWeight: isActive ? 600 : 400,
        cursor: 'pointer',
        textAlign: 'left',
        width: '100%',
        transition: 'background 0.15s ease, color 0.15s ease'
      }
    }, /*#__PURE__*/React.createElement(EvIcon, {
      name: item.icon,
      size: 18
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, item.label), isActive && /*#__PURE__*/React.createElement("div", {
      style: {
        width: 5,
        height: 5,
        borderRadius: '50%',
        background: 'var(--color-brand-secondary)'
      }
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 16px',
      borderTop: '1px solid var(--color-border-default)',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: 'var(--color-brand-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontFamily: 'var(--primitive-font-family-body)',
      fontWeight: 600,
      fontSize: 13,
      flexShrink: 0
    }
  }, "SM"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--color-text-primary)',
      fontFamily: 'var(--primitive-font-family-body)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, "Sophie Martin"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--color-text-secondary)',
      fontFamily: 'var(--primitive-font-family-body)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, "sophie@eventizer.io")), /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--color-text-disabled)',
      padding: 4,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(EvIcon, {
    name: "log-out",
    size: 16
  }))));
}
window.Sidebar = Sidebar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/eventizer/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/eventizer/icons.js
try { (() => {
/* =====================================================
   Eventizer UI Kit — Icon Helper
   Inline SVG icons (Lucide-compatible paths)
   ===================================================== */
(function () {
  const PATHS = {
    'layout-dashboard': '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
    'calendar': '<rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>',
    'users': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    'bar-chart-2': '<line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/>',
    'settings': '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    'plus': '<path d="M5 12h14"/><path d="M12 5v14"/>',
    'search': '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    'bell': '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    'ticket': '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>',
    'map-pin': '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    'euro': '<path d="M4 10h12"/><path d="M4 14h9"/><path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2"/>',
    'arrow-up-right': '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
    'more-horizontal': '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
    'log-out': '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>',
    'trending-up': '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
    'grid': '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
    'list': '<line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/>',
    'clock': '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    'eye': '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    'edit': '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
    'user': '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    'filter': '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
    'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
    'x': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'
  };
  window.EvIcon = function (props) {
    var name = props.name;
    var size = props.size || 18;
    var color = props.color;
    var extraStyle = props.style || {};
    return React.createElement('svg', {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color || 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      dangerouslySetInnerHTML: {
        __html: PATHS[name] || ''
      },
      style: Object.assign({
        flexShrink: 0,
        display: 'block'
      }, extraStyle)
    });
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/eventizer/icons.js", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Tag = __ds_scope.Tag;

})();
