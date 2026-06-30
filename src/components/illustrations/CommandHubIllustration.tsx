/**
 * Command Hub dashboard — a coded SVG/CSS product illustration (no image files).
 * Decorative (aria-hidden); the real screenshot replaces it at launch via Payload.
 * `detailed` adds extra rows + a seating map for the larger Platform browser view.
 */
export function CommandHubIllustration({ detailed = false }: { detailed?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-xl border border-white/8 bg-white/[0.03] shadow-2xl"
    >
      {/* Window chrome */}
      <div className="flex h-9 items-center border-b border-white/6 bg-white/[0.04] px-4">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-tl-red" />
          <span className="h-3 w-3 rounded-full bg-tl-amber" />
          <span className="h-3 w-3 rounded-full bg-tl-green" />
        </div>
        <span className="mx-auto text-xs font-medium text-white/40">Eventizer Command Hub</span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 animate-pulse-dot rounded-full bg-tl-green" />
          <span className="text-[10px] font-bold uppercase tracking-wideish text-tl-green">Live</span>
        </span>
      </div>

      {/* Body — sidebar + main */}
      <div className="grid grid-cols-[34%_1fr]">
        {/* Sidebar */}
        <div className="border-r border-white/5 bg-white/[0.02] p-3">
          <NavRow label="Vue générale" active />
          <NavRow label="Inscriptions" />
          <NavRow label="Paiements" />
          <NavRow label="Hébergement" />
          <NavRow label="Transferts" />
          <NavRow label="Rapports" />
        </div>

        {/* Main */}
        <div className="space-y-4 p-4">
          {/* KPI cards */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="rounded-lg border border-gold/15 bg-gold/[0.08] p-3">
              <p className="font-heading text-lg font-extrabold text-white">847</p>
              <p className="text-[10px] text-white/45">Inscrits</p>
              <p className="mt-1 text-[10px] font-semibold text-success">▲ 12%</p>
            </div>
            <div className="rounded-lg border border-cobalt/15 bg-cobalt/[0.08] p-3">
              <p className="font-heading text-lg font-extrabold text-white">$124k</p>
              <p className="text-[10px] text-white/45">Paiements</p>
              <div className="mt-2 h-1 w-full rounded-full bg-white/10">
                <div className="h-1 w-[85%] rounded-full bg-gold" />
              </div>
            </div>
            <div className="rounded-lg border border-white/8 bg-white/[0.03] p-3">
              <p className="font-heading text-lg font-extrabold text-white">2j 14h</p>
              <p className="text-[10px] text-white/45">Avant l’événement</p>
              <span className="mt-1 inline-block h-1.5 w-1.5 animate-pulse-dot rounded-full bg-gold" />
            </div>
          </div>

          {/* Bar chart */}
          <div className="rounded-lg border border-white/6 bg-white/[0.02] p-3">
            <p className="mb-2 text-[10px] font-semibold text-white/55">Inscriptions par jour</p>
            <div className="flex h-20 items-end justify-between gap-1.5">
              {[
                { h: 'h-8', d: 'Lun' },
                { h: 'h-12', d: 'Mar' },
                { h: 'h-10', d: 'Mer' },
                { h: 'h-16', d: 'Jeu' },
                { h: 'h-14', d: 'Ven' },
                { h: 'h-12', d: 'Sam' },
                { h: 'h-20', d: 'Dim', gold: true },
              ].map((bar) => (
                <div key={bar.d} className="flex flex-1 flex-col items-center gap-1">
                  <div className={`w-full rounded-sm ${bar.h} ${bar.gold ? 'bg-gold' : 'bg-white/15'}`} />
                  <span className="text-[8px] text-white/30">{bar.d}</span>
                </div>
              ))}
            </div>
          </div>

          {detailed ? (
            /* Seating map (Platform only) */
            <div className="rounded-lg border border-white/6 bg-white/[0.02] p-3">
              <p className="mb-2 text-[10px] font-semibold text-white/55">Plan de salle — temps réel</p>
              <div className="grid grid-cols-12 gap-1">
                {Array.from({ length: 36 }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-full rounded-[1px] ${
                      i % 7 === 0 ? 'bg-gold/70' : i % 3 === 0 ? 'bg-cobalt/50' : 'bg-white/12'
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {/* Activity feed */}
          <div className="space-y-2">
            <p className="text-[10px] font-semibold text-white/55">Activité récente</p>
            <FeedRow dot="success" text="Marie D. — confirmée" time="il y a 2min" />
            <FeedRow dot="success" text="Paiement reçu — 450 TND" time="il y a 5min" />
            <FeedRow dot="cobalt" text="Chambre 214 attribuée" time="il y a 8min" />
            {detailed ? (
              <>
                <FeedRow dot="success" text="QR scanné — Entrée principale" time="il y a 11min" />
                <FeedRow dot="gold" text="SMS envoyé — 320 destinataires" time="il y a 14min" />
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

function NavRow({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <div
      className={`mb-0.5 flex items-center gap-2 rounded-md px-2.5 py-2 text-[11px] ${
        active
          ? 'border-l-2 border-gold bg-white/[0.05] font-semibold text-white'
          : 'text-white/45'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-gold' : 'bg-white/25'}`} />
      {label}
    </div>
  )
}

function FeedRow({
  dot,
  text,
  time,
}: {
  dot: 'success' | 'cobalt' | 'gold'
  text: string
  time: string
}) {
  const dotColor = dot === 'success' ? 'bg-success' : dot === 'cobalt' ? 'bg-cobalt' : 'bg-gold'
  return (
    <div className="flex items-center gap-2 rounded-md border border-white/5 bg-white/[0.02] px-2.5 py-1.5">
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotColor}`} />
      <span className="flex-1 truncate text-[10px] text-white/70">{text}</span>
      <span className="text-[9px] text-white/30">{time}</span>
    </div>
  )
}
