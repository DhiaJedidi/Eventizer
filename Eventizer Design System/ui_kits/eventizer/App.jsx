/* Eventizer UI Kit — Root App */

function PlaceholderPage({ title, icon }) {
  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg-subtle)' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--color-text-disabled)', marginBottom: 14 }}>
          <EvIcon name={icon} size={36} />
        </div>
        <div style={{ fontFamily: 'var(--primitive-font-family-heading)', fontWeight: 700, fontSize: 18, color: 'var(--color-text-secondary)', marginBottom: 6 }}>{title}</div>
        <div style={{ fontFamily: 'var(--primitive-font-family-body)', fontSize: 13, color: 'var(--color-text-disabled)' }}>This section is coming soon.</div>
      </div>
    </div>
  );
}

function App() {
  const [page, setPage] = React.useState('dashboard');

  function renderPage() {
    switch (page) {
      case 'dashboard': return <Dashboard />;
      case 'events':    return <EventsList />;
      case 'attendees': return <PlaceholderPage title="Attendees" icon="users" />;
      case 'analytics': return <PlaceholderPage title="Analytics" icon="bar-chart-2" />;
      case 'settings':  return <PlaceholderPage title="Settings"  icon="settings" />;
      default:          return <Dashboard />;
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--color-bg-subtle)' }}>
      <Sidebar active={page} onNavigate={setPage} />
      {renderPage()}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
