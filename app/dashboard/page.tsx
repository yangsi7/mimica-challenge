'use client'

import { useMetrics } from '@/contexts/DataContext'
import { RegionChart } from '@/components/charts/RegionChart'
import { VariantChart } from '@/components/charts/VariantChart'
import { BottleneckTable } from '@/components/tables/BottleneckTable'
import { SummaryCards } from '@/components/cards/SummaryCards'

export default function DashboardPage() {
  const { isLoading, error } = useMetrics()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-text-secondary">Loading analytics data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-red-600">Error loading data: {error.message}</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <section>
        <SummaryCards />
      </section>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Region Comparison Chart */}
        <section className="card">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Performance by Region
          </h2>
          <div className="chart-container">
            <RegionChart />
          </div>
        </section>

        {/* Variant Distribution Chart */}
        <section className="card">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Process Variants Distribution
          </h2>
          <div className="chart-container">
            <VariantChart />
          </div>
        </section>
      </div>

      {/* Bottleneck Analysis Table */}
      <section className="card">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          Process Bottlenecks
        </h2>
        <BottleneckTable />
      </section>
    </div>
  )
}