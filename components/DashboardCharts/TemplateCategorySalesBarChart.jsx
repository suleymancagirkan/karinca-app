'use client'

import React from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts'

const data = [
  { name: 'E-ticaret', value: 1860 },
  { name: 'Kurumsal', value: 1520 },
  { name: 'Blog', value: 940 },
  { name: 'Portfolyo', value: 1120 },
  { name: 'SaaS', value: 2040 },
]

export default function TemplateCategorySalesBarChart() {
  return (
    <div className="w-full h-[240px] sm:h-[280px] md:h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" className="dark:stroke-neutral-800" />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'currentColor' }} stroke="#e5e5e5" className="text-neutral-500 dark:text-neutral-400 dark:stroke-neutral-800" />
          <YAxis tick={{ fontSize: 11, fill: 'currentColor' }} stroke="#e5e5e5" className="text-neutral-500 dark:text-neutral-400 dark:stroke-neutral-800" />
          <Tooltip contentStyle={{ background: 'rgb(23 23 23)', border: '1px solid rgb(38 38 38)', borderRadius: 12, color: 'white' }} cursor={{ fill: 'rgba(163,163,163,0.15)' }} />
          <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#22c55e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
