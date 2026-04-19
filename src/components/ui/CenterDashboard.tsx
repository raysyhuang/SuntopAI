'use client'

import { useTheme } from '@/components/ThemeProvider'
import { Activity, Bell, CheckCircle2, Gauge, TrendingUp } from 'lucide-react'

type Status = 'active' | 'prep' | 'done' | 'alert'

interface Dict {
  title: string
  status: string
  patientLabel: string
  alertsLabel: string
  statuses: Record<Status, string>
  alerts: string[]
  stationCount: string
  stationLabel: string
  riskLoop: string[]
  proof: Array<{ value: string; label: string }>
  operationsLabel: string
  operations: Array<{ label: string; value: string }>
}

interface CenterDashboardProps {
  dict: Dict
}

const machines: Array<{
  id: string
  patient: string
  progress: number
  time: string
  bp: string
  status: Status
}> = [
  { id: 'M-01', patient: 'P-2341', progress: 68, time: '02:42 / 04:00', bp: '128/82', status: 'active' },
  { id: 'M-02', patient: 'P-1087', progress: 35, time: '01:24 / 04:00', bp: '134/78', status: 'active' },
  { id: 'M-03', patient: 'P-3056', progress: 52, time: '02:05 / 04:00', bp: '98/60',  status: 'alert' },
  { id: 'M-04', patient: 'P-4429', progress: 100, time: '04:00 / 04:00', bp: '122/74', status: 'done' },
  { id: 'M-05', patient: 'P-2118', progress: 12, time: '00:30 / 04:00', bp: '126/80', status: 'active' },
  { id: 'M-06', patient: '—',      progress: 0,  time: '—',             bp: '—',      status: 'prep' },
]

const statusStyles: Record<Status, { lightText: string; darkText: string; dot: string }> = {
  active: { lightText: 'text-accent-700', darkText: 'text-accent-300', dot: 'bg-accent-500' },
  prep:   { lightText: 'text-ink-500',    darkText: 'text-neutral-400', dot: 'bg-ink-300' },
  done:   { lightText: 'text-ink-600',    darkText: 'text-neutral-300', dot: 'bg-ink-400' },
  alert:  { lightText: 'text-amber-700',  darkText: 'text-amber-300',  dot: 'bg-amber-400' },
}

const wallCells: Status[] = [
  'active', 'active', 'done', 'active', 'alert', 'active', 'prep', 'active',
  'done', 'active', 'active', 'prep', 'active', 'alert', 'active', 'done',
  'active', 'active', 'prep', 'active', 'done', 'active', 'active', 'prep',
]

export function CenterDashboard({ dict }: CenterDashboardProps) {
  const { theme } = useTheme()
  const isLight = theme === 'light'

  const baseBg = isLight ? 'bg-white' : 'bg-slate-900/60'
  const baseBorder = isLight ? 'border-ink-100' : 'border-slate-800/70'
  const hairline = isLight ? 'border-ink-100' : 'border-slate-800'
  const heading = isLight ? 'text-ink-900' : 'text-white'
  const muted = isLight ? 'text-ink-400' : 'text-neutral-500'
  const label = isLight ? 'text-ink-600' : 'text-neutral-300'
  const cellBg = isLight ? 'bg-ink-50/60' : 'bg-slate-950/40'

  return (
    <div
      className={`rounded-lg border overflow-hidden ${baseBg} ${baseBorder} ${
        isLight ? 'shadow-stripe-lg' : 'shadow-stripe-md'
      }`}
    >
      {/* Top bar */}
      <div className={`flex items-center justify-between gap-4 px-5 py-3 border-b ${hairline}`}>
        <div className="flex items-center gap-3">
          <div
            className={`h-6 w-6 rounded flex items-center justify-center ${
              isLight ? 'bg-accent-50 border border-accent-100' : 'bg-accent-900/30 border border-accent-800/40'
            }`}
            aria-hidden="true"
          >
            <Activity className={`h-3.5 w-3.5 ${isLight ? 'text-accent-700' : 'text-accent-300'}`} />
          </div>
          <span className={`text-sm font-medium ${heading}`}>{dict.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 rounded-full bg-accent-500 animate-pulse motion-reduce:animate-none"
            aria-hidden="true"
          />
          <span className={`text-[11px] tabular-nums ${muted}`}>{dict.status}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.45fr_1fr]">
        {/* Machine grid */}
        <div className={`p-5 grid grid-cols-2 md:grid-cols-3 gap-3 lg:border-r ${hairline}`}>
          <div className={`col-span-2 md:col-span-3 rounded-md p-3.5 border ${baseBorder} ${cellBg}`}>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-3">
              <div>
                <div className={`text-[10px] uppercase tracking-[0.14em] ${muted}`}>{dict.stationLabel}</div>
                <div className={`font-display font-light text-3xl tabular-nums ${heading}`} style={{ letterSpacing: 0 }}>
                  {dict.stationCount}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {dict.riskLoop.map((stage) => (
                  <span
                    key={stage}
                    className={`rounded-sm border px-2 py-1 text-[10px] font-medium ${baseBorder} ${label}`}
                  >
                    {stage}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-8 sm:grid-cols-12 gap-1.5" aria-hidden="true">
              {wallCells.map((status, index) => (
                <span
                  key={`${status}-${index}`}
                  className={`h-2 rounded-sm ${statusStyles[status].dot} ${
                    status === 'prep' ? 'opacity-35' : status === 'done' ? 'opacity-55' : 'opacity-90'
                  }`}
                />
              ))}
            </div>
          </div>

          {machines.map((m) => {
            const s = statusStyles[m.status]
            const statusText = isLight ? s.lightText : s.darkText
            return (
              <div key={m.id} className={`rounded-md p-3 ${cellBg} border ${baseBorder}`}>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[11px] tabular-nums font-medium ${label}`}>{m.id}</span>
                  <div className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} aria-hidden="true" />
                    <span className={`text-[10px] font-medium ${statusText}`}>{dict.statuses[m.status]}</span>
                  </div>
                </div>
                <div className={`text-[10px] ${muted}`}>{dict.patientLabel}</div>
                <div className={`font-display font-light tabular-nums text-base mb-2 ${heading}`} style={{ letterSpacing: 0 }}>
                  {m.patient}
                </div>

                <div className={`h-1 rounded-full mb-2 ${isLight ? 'bg-ink-100' : 'bg-slate-800'} overflow-hidden`}>
                  <div
                    className={`h-full rounded-full ${
                      m.status === 'alert' ? 'bg-amber-400' : m.status === 'done' ? 'bg-accent-600/60' : 'bg-accent-500'
                    }`}
                    style={{ width: `${m.progress}%` }}
                  />
                </div>

                <div className={`flex justify-between text-[10px] tabular-nums ${muted}`}>
                  <span>{m.time}</span>
                  <span>{m.bp}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Alerts side panel */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Bell className={`h-3.5 w-3.5 ${isLight ? 'text-amber-600' : 'text-amber-300'}`} aria-hidden="true" />
            <span className={`text-xs font-medium uppercase tracking-[0.14em] ${muted}`}>
              {dict.alertsLabel}
            </span>
          </div>
          <ul className="space-y-3">
            {dict.alerts.map((alert, i) => {
              const isWarn = i === 0
              const Icon = isWarn ? Bell : CheckCircle2
              return (
                <li key={alert} className={`flex items-start gap-3 pb-3 ${i < dict.alerts.length - 1 ? `border-b ${hairline}` : ''}`}>
                  <Icon
                    className={`h-3.5 w-3.5 mt-0.5 flex-shrink-0 ${
                      isWarn
                        ? (isLight ? 'text-amber-600' : 'text-amber-300')
                        : (isLight ? 'text-accent-700' : 'text-accent-300')
                    }`}
                    aria-hidden="true"
                  />
                  <span className={`text-xs leading-relaxed ${label}`}>{alert}</span>
                </li>
              )
            })}
          </ul>

          <div className={`mt-5 pt-5 border-t ${hairline}`}>
            <div className="grid grid-cols-3 gap-2">
              {dict.proof.map((item) => (
                <div key={item.label} className={`rounded-md border ${baseBorder} ${cellBg} p-2.5`}>
                  <div className={`font-display font-light text-xl tabular-nums ${heading}`} style={{ letterSpacing: 0 }}>
                    {item.value}
                  </div>
                  <div className={`mt-1 text-[10px] leading-snug ${muted}`}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`mt-5 rounded-md border ${baseBorder} ${cellBg} p-3.5`}>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className={`h-3.5 w-3.5 ${isLight ? 'text-accent-700' : 'text-accent-300'}`} aria-hidden="true" />
              <span className={`text-xs font-medium ${label}`}>{dict.operationsLabel}</span>
            </div>
            <div className="space-y-2.5">
              {dict.operations.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3">
                  <span className={`text-[11px] ${muted}`}>{item.label}</span>
                  <span className={`text-xs font-medium tabular-nums ${heading}`}>{item.value}</span>
                </div>
              ))}
            </div>
            <div className={`mt-3 flex items-center gap-2 border-t ${hairline} pt-3`}>
              <Gauge className={`h-3.5 w-3.5 ${muted}`} aria-hidden="true" />
              <div className={`h-1.5 flex-1 rounded-full overflow-hidden ${isLight ? 'bg-ink-100' : 'bg-slate-800'}`}>
                <div className="h-full w-[86%] rounded-full bg-accent-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
