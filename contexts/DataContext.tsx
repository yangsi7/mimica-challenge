'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { ProcessedMetrics, FilterState, MetricsContextValue } from '@/lib/types'
import { fetchAllMetrics } from '@/lib/data'

const DataContext = createContext<MetricsContextValue | undefined>(undefined)

interface DataProviderProps {
  children: ReactNode
}

export function DataProvider({ children }: DataProviderProps) {
  const [metrics, setMetrics] = useState<ProcessedMetrics>({
    regionMetrics: [],
    variantDistribution: [],
    variantMetrics: [],
    bottlenecks: [],
    stepMetrics: []
  })
  
  const [filters, setFilters] = useState<FilterState>({
    selectedRegion: null,
    selectedVariant: null
  })
  
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true)
        const data = await fetchAllMetrics()
        setMetrics(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load metrics'))
        console.error('Error loading metrics:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const setSelectedRegion = (region: string | null) => {
    setFilters(prev => ({
      ...prev,
      selectedRegion: region
    }))
  }

  const setSelectedVariant = (variant: string | null) => {
    setFilters(prev => ({
      ...prev,
      selectedVariant: variant
    }))
  }

  const value: MetricsContextValue = {
    metrics,
    filters,
    setSelectedRegion,
    setSelectedVariant,
    isLoading,
    error
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}

export function useMetrics() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useMetrics must be used within a DataProvider')
  }
  return context
}