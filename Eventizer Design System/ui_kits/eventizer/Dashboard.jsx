/* Eventizer UI Kit — Dashboard View */

/* ── Inline Badge (self-contained, matches design system) ── */
const BADGE_V = {
  default:   { bg: '#E8E8E8',  color: '#616161' },
  primary:   { bg: '#4563AC',  color: '#fff' },
  secondary: { bg: '#E1AA2B',  color: '#0D0D0D' },
  success:   { bg: '#D1FAE5',  color: '#065F46' },
  warning:   { bg: '#FEF3C7',  color: '#92400E' },
  danger:    { bg: '#FEE2E2',  color: '#991B1B' },
  info:      { bg: '#DBEAFE',  color: '#1E40AF' },
};
function Badge({ children, variant = 'default' }) {
  const v = BADGE_V[variant] || BADGE_V.default;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      borderRadius: 9999,
      fontFamily: 'var(--primitive-font-family-body)',
      fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
      background: v.bg, color: v.color,
      fontSize: '11px', padding: '3px 10px',
      whiteSpace: 'nowrap', lineHeight: 1.4,
    }}>{children}</span>
  );
}

const MOCK_STATS = [
  { label: 'Upcoming Events', value: '12',     delta: '+2 this month',  icon: 'calendar',     iconBg: 'rgba(69,99,172,0.1)',   iconColor: 'var(--color-brand-primary)' },
  { label: 'Total Attendees', value: '1,248',  delta: '+124 this week', icon: 'users',        iconBg: 'rgba(69,99,172,0.1)',   iconColor: 'var(--color-brand-primary)' },
  { label: 'Tickets Sold',    value: '847',    delta: '68% of target',  icon: 'ticket',       iconBg: 'rgba(225,170,43,0.12)', iconColor: '#92621A' },
  { label: 'Revenue',         value: '€23,450',delta: '+€3,200 / week', icon: 'euro',         iconBg: '#D1FAE5',               iconColor: '#065F46' },
];

const MOCK_EVENTS = [
  { name: 'Tech Summit 2026',        date: 'Jul 15', location: 'Paris',     reg: 450, cap: 500, status: 'success', label: 'Published' },
  { name: 'Digital Marketing Forum', date: 'Aug 3',  location: 'Lyon',      reg: 280, cap: 350, status: 'success', label: 'Published' },
  { name: 'Startup Pitch Night',     date: 'Aug 22', location: 'Paris',     reg: 0,   cap: 120, status: 'warning', label: 'Draft' },
  { name: 'Innovation Week',         date: 'Sep 10', location: 'Bordeaux',  reg: 0,   cap: 600, status: 'warning', label: 'Draft' },
  { name: 'AI & Future Conference',  date: 'Oct 5',  location: 'Paris',     reg: 890, cap: 900, status: 'info',    label: 'Live' },
];

function Dashboard() {
  return (
    <div style={{ flex: 1, overflow: 'auto', background: 'var(--color-bg-subtle)', display: 'flex', flexDirection: 'column' }}>

      {/* Top header */}
      <div style={{
        background: '#fff', borderBottom: '1px solid var(--color-border-default)',
        padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
      }}>
        <div>
          <div style={{ fontFamily: 'var(--primitive-font-family-heading)', fontWeight: 700, fontSize: 22, color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}>
            Good morning, Sophie
          </div>
          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 2, fontFamily: 'var(--primitive-font-family-body)' }}>
            Here's what's happening with your events today.
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button style={{
            background: 'none', border: '1px solid var(--color-border-default)',
            borderRadius: 8, padding: '8px 10px', cursor: 'pointer',
            color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center',
          }}>
            <EvIcon name="bell" size={18} />
          </button>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'var(--color-brand-primary)', color: '#fff',
            border: 'none', borderRadius: 8, padding: '9px 18px',
            fontFamily: 'var(--primitive-font-family-body)', fontSize: 14, fontWeight: 600,
            cursor: 'pointer', letterSpacing: '0.04em',
          }}>
            <EvIcon name="plus" size={16} />
            New Event
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 24, flex: 1 }}>

        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {MOCK_STATS.map(s => (
            <div key={s.label} style={{
              background: '#fff', borderRadius: 16, border: '1px solid var(--color-border-default)',
              padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: s.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <EvIcon name={s.icon} size={20} color={s.iconColor} />
                </div>
                <EvIcon name="arrow-up-right" size={16} color="var(--color-text-disabled)" />
              </div>
              <div style={{
                fontFamily: 'var(--primitive-font-family-heading)', fontWeight: 700,
                fontSize: 26, color: 'var(--color-text-primary)', letterSpacing: '-0.01em',
              }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', fontFamily: 'var(--primitive-font-family-body)', marginTop: 2 }}>{s.label}</div>
              <div style={{
                fontSize: 11, color: '#065F46', fontFamily: 'var(--primitive-font-family-body)',
                marginTop: 8, background: '#D1FAE5', borderRadius: 999,
                padding: '3px 9px', display: 'inline-block',
              }}>{s.delta}</div>
            </div>
          ))}
        </div>

        {/* Events table */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid var(--color-border-default)', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--color-border-default)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--primitive-font-family-heading)', fontWeight: 700, fontSize: 16, color: 'var(--color-text-primary)' }}>Upcoming Events</div>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: 'var(--color-brand-primary)', fontFamily: 'var(--primitive-font-family-body)', fontWeight: 600 }}>
              View all →
            </button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--color-bg-subtle)' }}>
                {['Event', 'Date', 'Location', 'Registrations', 'Status', ''].map(h => (
                  <th key={h} style={{
                    padding: '10px 24px', textAlign: 'left',
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
                    textTransform: 'uppercase', color: 'var(--color-text-disabled)',
                    fontFamily: 'var(--primitive-font-family-body)',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_EVENTS.map((ev, i) => (
                <tr key={ev.name} style={{ borderTop: i > 0 ? '1px solid var(--color-border-default)' : 'none' }}>
                  <td style={{ padding: '14px 24px' }}>
                    <div style={{ fontFamily: 'var(--primitive-font-family-body)', fontWeight: 600, fontSize: 14, color: 'var(--color-text-primary)' }}>
                      {ev.name}
                    </div>
                  </td>
                  <td style={{ padding: '14px 24px' }}>
                    <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', fontFamily: 'var(--primitive-font-family-body)' }}>{ev.date}</div>
                  </td>
                  <td style={{ padding: '14px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'var(--color-text-secondary)', fontFamily: 'var(--primitive-font-family-body)' }}>
                      <EvIcon name="map-pin" size={13} />
                      {ev.location}
                    </div>
                  </td>
                  <td style={{ padding: '14px 24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--primitive-font-family-body)' }}>
                        {ev.reg > 0 ? ev.reg.toLocaleString() : '—'}
                        <span style={{ fontWeight: 400, color: 'var(--color-text-disabled)', fontSize: 12 }}> / {ev.cap}</span>
                      </div>
                      {ev.reg > 0 && (
                        <div style={{ height: 4, borderRadius: 2, background: 'var(--color-bg-muted)', width: 80, overflow: 'hidden' }}>
                          <div style={{ height: '100%', borderRadius: 2, background: 'var(--color-brand-primary)', width: `${Math.round(ev.reg / ev.cap * 100)}%` }} />
                        </div>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '14px 24px' }}>
                    <Badge variant={ev.status}>{ev.label}</Badge>
                  </td>
                  <td style={{ padding: '14px 24px' }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-disabled)', padding: 4, display: 'flex' }}>
                      <EvIcon name="more-horizontal" size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

window.Dashboard = Dashboard;
