/**
 * TypeScript interfaces for the Mimica Analytics Platform
 * Based on the processed JSON data structures
 * Version: 1.0.0
 */

/**
 * Region metrics aggregated data
 * Represents performance metrics for each geographic region
 */
export interface RegionMetric {
  region: string;              // Geographic region (e.g., "APAC", "Americas", "EMEA", "LATAM", "NorthAmerica")
  avg_duration: number;        // Average transaction duration in seconds
  median_duration: number;     // Median transaction duration in seconds
  max_duration: number;        // Maximum transaction duration in seconds
  min_duration: number;        // Minimum transaction duration in seconds
  avg_step_count: number;      // Average number of steps per transaction
  transaction_count: number;   // Total number of transactions in this region
}

/**
 * Variant distribution by region
 * Shows how many transactions of each variant occur in each region
 */
export interface VariantDistribution {
  region: string;   // Geographic region
  A: number;        // Count of Variant A transactions
  B: number;        // Count of Variant B transactions
  C: number;        // Count of Variant C transactions
  D: number;        // Count of Variant D transactions
  E: number;        // Count of Variant E transactions
}

/**
 * Variant-specific metrics
 * Aggregated performance data for each process variant
 */
export interface VariantMetric {
  variant: string;             // Variant identifier (A, B, C, D, or E)
  avg_duration: number;        // Average duration for this variant in seconds
  median_duration: number;     // Median duration for this variant in seconds
  step_count: number;          // Number of steps in this variant
  transaction_count: number;   // Total transactions following this variant
}

/**
 * Bottleneck analysis data
 * Identifies process steps with highest impact on performance
 */
export interface Bottleneck {
  action_name: string;      // Name of the process step
  avg_duration: number;     // Average duration of this step in seconds
  median_duration: number;  // Median duration of this step in seconds
  count: number;            // Number of times this step was executed
}

/**
 * Step-level metrics (same structure as Bottleneck)
 * Detailed metrics for all process steps
 */
export interface StepMetric {
  action_name: string;      // Name of the process step
  avg_duration: number;     // Average duration of this step in seconds
  median_duration: number;  // Median duration of this step in seconds
  count: number;            // Number of times this step was executed
}

/**
 * Complete metrics collection
 * Used by the context provider to share data across components
 */
export interface ProcessedMetrics {
  regionMetrics: RegionMetric[];
  variantDistribution: VariantDistribution[];
  variantMetrics: VariantMetric[];
  bottlenecks: Bottleneck[];
  stepMetrics: StepMetric[];
}

/**
 * Filter state for interactive components
 */
export interface FilterState {
  selectedRegion: string | null;  // Currently selected region (null = all regions)
  selectedVariant: string | null; // Currently selected variant (null = all variants)
}

/**
 * Chart configuration types
 */
export interface ChartConfig {
  title: string;
  subtitle?: string;
  showLegend?: boolean;
  showGrid?: boolean;
  animate?: boolean;
  colors?: string[];
}

/**
 * Region names enum for type safety
 */
export enum Region {
  APAC = "APAC",
  Americas = "Americas",
  EMEA = "EMEA",
  LATAM = "LATAM",
  NorthAmerica = "NorthAmerica"
}

/**
 * Variant names enum for type safety
 */
export enum Variant {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E"
}

/**
 * Helper type for variant distribution keys
 */
export type VariantKey = keyof Omit<VariantDistribution, 'region'>;

/**
 * Context value type for the metrics provider
 */
export interface MetricsContextValue {
  metrics: ProcessedMetrics;
  filters: FilterState;
  setSelectedRegion: (region: string | null) => void;
  setSelectedVariant: (variant: string | null) => void;
  isLoading: boolean;
  error: Error | null;
}