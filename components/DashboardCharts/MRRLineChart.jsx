'use client'

import React from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart
} from 'recharts'

const data = [
  { name: 'Oca', value: 24 },
  { name: 'Şub', value: 28 },
  { name: 'Mar', value: 26 },
  { name: 'Nis', value: 32 },
  { name: 'May', value: 35 },
  { name: 'Haz', value: 31 },
  { name: 'Tem', value: 38 },
  { name: 'Ağu', value: 36 },
  { name: 'Eyl', value: 40 },
  { name: 'Eki', value: 42 },
  { name: 'Kas', value: 39 },
  { name: 'Ara', value: 44 },
]

export default function MRRLineChart() {
  return (
    <div className="w-full h-[220px] sm:h-[260px] md:h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" className="dark:stroke-neutral-800" />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'currentColor' }} stroke="#e5e5e5" className="text-neutral-500 dark:text-neutral-400 dark:stroke-neutral-800" />
          <YAxis tick={{ fontSize: 11, fill: 'currentColor' }} stroke="#e5e5e5" className="text-neutral-500 dark:text-neutral-400 dark:stroke-neutral-800" />
          <Tooltip contentStyle={{ background: 'rgb(23 23 23)', border: '1px solid rgb(38 38 38)', borderRadius: 12, color: 'white' }} cursor={{ stroke: '#a3a3a3', strokeDasharray: '4 4' }} />
          <Area type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={3} fill="url(#revGradient)" />
          <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={0} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
