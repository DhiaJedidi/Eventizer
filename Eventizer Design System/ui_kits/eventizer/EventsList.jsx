/* Eventizer UI Kit — Events List View */

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

const ALL_EVENTS = [
  { id: 1, name: 'Tech Summit 2026',        date: 'Jul 15, 2026', location: 'Paris Convention Centre',   reg: 450, cap: 500, status: 'success', label: 'Published', category: 'Technology', hue: '#4563AC' },
  { id: 2, name: 'Digital Marketing Forum', date: 'Aug 3, 2026',  location: 'Bourse de Commerce, Lyon',  reg: 280, cap: 350, status: 'success', label: 'Published', category: 'Marketing',  hue: '#E1AA2B' },
  { id: 3, name: 'Startup Pitch Night',     date: 'Aug 22, 2026', location: 'Station F, Paris',          reg: 0,   cap: 120, status: 'warning', label: 'Draft',     category: 'Startup',    hue: '#2D7D5A' },
  { id: 4, name: 'Innovation Week',         date: 'Sep 10, 2026', location: 'Bordeaux',                  reg: 0,   cap: 600, status: 'warning', label: 'Draft',     category: 'Innovation', hue: '#C7493A' },
  { id: 5, name: 'AI & Future Conference',  date: 'Oct 5, 2026',  location: 'Palais des Congrès, Paris', reg: 890, cap: 900, status: 'info',    label: 'Live',      category: 'Technology', hue: '#7B5EA7' },
  { id: 6, name: 'Eventizer Forum 2026',    date: 'Nov 12, 2026', location: 'Cité des Sciences, Paris',  reg: 0,   cap: 1200,status: 'warning', label: 'Draft',     category: 'Community',  hue: '#2496A8' },
];

function EventsList() {
  const [search, setSearch]   = React.useState('');
  const [filter, setFilter]   = React.useState('all');
  const [viewMode, setView]   = React.useState('grid');

  const filtered = ALL_EVENTS.filter(ev => {
    if (search && !ev.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === 'published' && ev.label !== 'Published') return false;
    if (filter === 'draft'     && ev.label !== 'Draft')     return false;
    if (filter === 'live'      && ev.label !== 'Live')      return false;
    return true;
  });

  return (
    <div style={{ flex: 1, overflow: 'auto', background: 'var(--color-bg-subtle)', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{
        background: '#fff', borderBottom: '1px solid var(--color-border-default)',
        padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
      }}>
        <div>
          <div style={{ fontFamily: 'var(--primitive-font-family-heading)', fontWeight: 700, fontSize: 22, color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}>My Events</div>
          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 2, fontFamily: 'var(--primitive-font-family-body)' }}>
            {ALL_EVENTS.length} events total
          </div>
        </div>
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

      {/* Filter bar */}
      <div style={{
        background: '#fff', borderBottom: '1px solid var(--color-border-default)',
        padding: '10px 32px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border-default)',
          borderRadius: 8, padding: '7px 12px', flexShrink: 0, width: 260,
        }}>
          <EvIcon name="search" size={15} color="var(--color-text-disabled)" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search events…"
            style={{
              border: 'none', background: 'transparent', outline: 'none',
              fontSize: 13, color: 'var(--color-text-primary)',
              fontFamily: 'var(--primitive-font-family-body)', width: '100%',
            }}
          />
        </div>

        {['all', 'published', 'draft', 'live'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              border: 'none', padding: '6px 14px', borderRadius: 20, cursor: 'pointer',
              fontFamily: 'var(--primitive-font-family-body)', fontSize: 13,
              fontWeight: filter === f ? 600 : 400,
              background: filter === f ? 'rgba(69,99,172,0.1)' : 'transparent',
              color: filter === f ? 'var(--color-brand-primary)' : 'var(--color-text-secondary)',
              transition: 'all 0.15s',
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
          {[['grid', 'grid'], ['list', 'list']].map(([v, icon]) => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                border: '1px solid var(--color-border-default)', padding: '7px', borderRadius: 7,
                background: viewMode === v ? 'var(--color-bg-muted)' : '#fff',
                cursor: 'pointer',
                color: viewMode === v ? 'var(--color-text-primary)' : 'var(--color-text-disabled)',
                display: 'flex', alignItems: 'center',
              }}
            >
              <EvIcon name={icon} size={16} />
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 32px', flex: 1 }}>
        {viewMode === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {filtered.map(ev => (
              <div key={ev.id} style={{
                background: '#fff', borderRadius: 16, border: '1px solid var(--color-border-default)',
                overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', cursor: 'pointer',
              }}>
                <div style={{ height: 80, background: ev.hue, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.88 }}>
                  <EvIcon name="calendar" size={28} color="rgba(255,255,255,0.7)" />
                </div>
                <div style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <Badge variant={ev.status}>{ev.label}</Badge>
                    <span style={{ fontSize: 11, color: 'var(--color-text-disabled)', fontFamily: 'var(--primitive-font-family-body)' }}>{ev.category}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--primitive-font-family-heading)', fontWeight: 700, fontSize: 15, color: 'var(--color-text-primary)', marginBottom: 8, lineHeight: 1.3 }}>{ev.name}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--color-text-secondary)', fontFamily: 'var(--primitive-font-family-body)' }}>
                      <EvIcon name="clock" size={12} />{ev.date}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--color-text-secondary)', fontFamily: 'var(--primitive-font-family-body)' }}>
                      <EvIcon name="map-pin" size={12} />{ev.location}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--color-text-secondary)', fontFamily: 'var(--primitive-font-family-body)' }}>
                      <EvIcon name="users" size={12} />{ev.reg > 0 ? `${ev.reg} / ${ev.cap}` : `0 / ${ev.cap}`}
                    </div>
                    <div style={{ display: 'flex', gap: 2 }}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-disabled)', padding: 4, display: 'flex' }}><EvIcon name="eye" size={14} /></button>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-disabled)', padding: 4, display: 'flex' }}><EvIcon name="edit" size={14} /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid var(--color-border-default)', overflow: 'hidden' }}>
            {filtered.map((ev, i) => (
              <div key={ev.id} style={{
                display: 'flex', alignItems: 'center', padding: '14px 24px', gap: 16,
                borderTop: i > 0 ? '1px solid var(--color-border-default)' : 'none',
                cursor: 'pointer',
              }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: ev.hue, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, opacity: 0.88 }}>
                  <EvIcon name="calendar" size={18} color="rgba(255,255,255,0.8)" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--primitive-font-family-body)', fontWeight: 600, fontSize: 14, color: 'var(--color-text-primary)' }}>{ev.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', fontFamily: 'var(--primitive-font-family-body)', marginTop: 2 }}>{ev.date} · {ev.location}</div>
                </div>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', fontFamily: 'var(--primitive-font-family-body)' }}>{ev.reg > 0 ? `${ev.reg} attendees` : 'No registrations'}</div>
                <Badge variant={ev.status}>{ev.label}</Badge>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-disabled)', padding: 4, display: 'flex' }}>
                  <EvIcon name="more-horizontal" size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

window.EventsList = EventsList;
