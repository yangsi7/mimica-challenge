import { 
  ProcessedMetrics, 
  RegionMetric, 
  VariantDistribution, 
  VariantMetric, 
  Bottleneck, 
  StepMetric 
} from './types'

/**
 * Base path for data files
 */
const DATA_BASE_PATH = '/data'

/**
 * Fetch JSON data from public directory
 */
async function fetchJSON<T>(filename: string): Promise<T> {
  try {
    const response = await fetch(`${DATA_BASE_PATH}/${filename}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch ${filename}: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`Error loading ${filename}:`, error)
    throw error
  }
}

/**
 * Load region metrics from processed JSON
 */
export async function fetchRegionMetrics(): Promise<RegionMetric[]> {
  return fetchJSON<RegionMetric[]>('processed_region_metrics.json')
}

/**
 * Load variant distribution from processed JSON
 */
export async function fetchVariantDistribution(): Promise<VariantDistribution[]> {
  return fetchJSON<VariantDistribution[]>('processed_variant_distribution.json')
}

/**
 * Load variant metrics from processed JSON
 */
export async function fetchVariantMetrics(): Promise<VariantMetric[]> {
  return fetchJSON<VariantMetric[]>('processed_variant_metrics.json')
}

/**
 * Load top bottlenecks from processed JSON
 */
export async function fetchBottlenecks(): Promise<Bottleneck[]> {
  return fetchJSON<Bottleneck[]>('processed_top_bottlenecks.json')
}

/**
 * Load step metrics from processed JSON
 */
export async function fetchStepMetrics(): Promise<StepMetric[]> {
  return fetchJSON<StepMetric[]>('processed_step_metrics.json')
}

/**
 * Load all processed metrics
 */
export async function fetchAllMetrics(): Promise<ProcessedMetrics> {
  const [
    regionMetrics,
    variantDistribution,
    variantMetrics,
    bottlenecks,
    stepMetrics
  ] = await Promise.all([
    fetchRegionMetrics(),
    fetchVariantDistribution(),
    fetchVariantMetrics(),
    fetchBottlenecks(),
    fetchStepMetrics()
  ])

  return {
    regionMetrics,
    variantDistribution,
    variantMetrics,
    bottlenecks,
    stepMetrics
  }
}

/**
 * Filter metrics by selected region
 */
export function filterMetricsByRegion<T extends { region: string }>(
  metrics: T[],
  selectedRegion: string | null
): T[] {
  if (!selectedRegion) return metrics
  return metrics.filter(metric => metric.region === selectedRegion)
}

/**
 * Filter metrics by selected variant
 */
export function filterMetricsByVariant<T extends { variant: string }>(
  metrics: T[],
  selectedVariant: string | null
): T[] {
  if (!selectedVariant) return metrics
  return metrics.filter(metric => metric.variant === selectedVariant)
}

/**
 * Get variant counts for a specific region
 */
export function getVariantCountsForRegion(
  distribution: VariantDistribution[],
  region: string
): Record<string, number> {
  const regionData = distribution.find(d => d.region === region)
  if (!regionData) return {}
  
  const { region: _, ...variants } = regionData
  return variants
}

/**
 * Format duration in seconds to human-readable string
 */
export function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds.toFixed(1)}s`
  }
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}m ${remainingSeconds.toFixed(0)}s`
}

/**
 * Calculate percentage change between two values
 */
export function calculatePercentageChange(oldValue: number, newValue: number): number {
  if (oldValue === 0) return 0
  return ((newValue - oldValue) / oldValue) * 100
}