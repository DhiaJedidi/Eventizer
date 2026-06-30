/* Eventizer UI Kit — Sidebar */

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard',  icon: 'layout-dashboard' },
  { id: 'events',    label: 'My Events',  icon: 'calendar' },
  { id: 'attendees', label: 'Attendees',  icon: 'users' },
  { id: 'analytics', label: 'Analytics',  icon: 'bar-chart-2' },
  { id: 'settings',  label: 'Settings',   icon: 'settings' },
];

function Sidebar({ active, onNavigate }) {
  const [hoveredId, setHoveredId] = React.useState(null);

  return (
    <aside style={{
      width: 240,
      height: '100%',
      background: '#fff',
      borderRight: '1px solid var(--color-border-default)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid var(--color-border-default)' }}>
        <div style={{
          fontFamily: 'var(--primitive-font-family-heading)',
          fontWeight: 700,
          fontSize: 22,
          color: 'var(--color-brand-primary)',
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}>Eventizer</div>
        <div style={{ width: 32, height: 2.5, background: 'var(--color-brand-secondary)', borderRadius: 2, marginTop: 6 }} />
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
        {NAV_ITEMS.map(item => {
          const isActive = active === item.id;
          const isHovered = hoveredId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 12px',
                borderRadius: 8,
                border: 'none',
                background: isActive
                  ? 'rgba(69,99,172,0.1)'
                  : isHovered ? 'var(--color-bg-subtle)' : 'transparent',
                color: isActive ? 'var(--color-brand-primary)' : 'var(--color-text-secondary)',
                fontFamily: 'var(--primitive-font-family-body)',
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                transition: 'background 0.15s ease, color 0.15s ease',
              }}
            >
              <EvIcon name={item.icon} size={18} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {isActive && (
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--color-brand-secondary)' }} />
              )}
            </button>
          );
        })}
      </nav>

      {/* User profile */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid var(--color-border-default)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'var(--color-brand-primary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontFamily: 'var(--primitive-font-family-body)',
          fontWeight: 600, fontSize: 13, flexShrink: 0,
        }}>SM</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)',
            fontFamily: 'var(--primitive-font-family-body)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>Sophie Martin</div>
          <div style={{
            fontSize: 11, color: 'var(--color-text-secondary)',
            fontFamily: 'var(--primitive-font-family-body)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>sophie@eventizer.io</div>
        </div>
        <button style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--color-text-disabled)', padding: 4, display: 'flex',
        }}>
          <EvIcon name="log-out" size={16} />
        </button>
      </div>
    </aside>
  );
}

window.Sidebar = Sidebar;
