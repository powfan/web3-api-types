// ============ Entities ============

export interface Team {
  id: number
  name: string | null
  league: string | null
  record: string | null
  logo: string | null
  abbreviation: string | null
  alias: string | null
  createdAt: string | null
  updatedAt: string | null
}

export interface SportMetadata {
  sport: string
  image: string
  resolution: string
  ordering: string
  tags: string
  series: string
}

/**
 * Tag entity - used for categorizing events and markets
 */
export interface Tag {
  id: string
  label: string
  slug: string
  forceShow?: boolean
  publishedAt?: string
  createdAt?: string
  updatedAt?: string
  isCarousel?: boolean
}

/**
 * CLOB Reward configuration for markets
 */
export interface ClobReward {
  id: string
  conditionId: string
  assetAddress: string
  rewardsAmount: number
  rewardsDailyRate: number
  startDate: string
  endDate: string
}

/**
 * Series entity - groups related events (e.g., NBA, NFL)
 */
export interface Series {
  id: string
  ticker: string
  slug: string
  title: string
  seriesType: string
  recurrence: string
  image: string
  icon: string
  layout: string
  active: boolean
  closed: boolean
  archived: boolean
  new: boolean
  featured: boolean
  restricted: boolean
  publishedAt?: string
  createdBy?: string
  updatedBy?: string
  createdAt: string
  updatedAt: string
  commentsEnabled?: boolean
  competitive?: string
  volume24hr?: number
  startDate?: string
  commentCount?: number
}

/**
 * Market entity - represents a trading market with binary outcomes
 * Maps to a pair of CLOB token IDs, market address, question ID, and condition ID
 */
export interface Market {
  id: string
  question: string
  conditionId: string
  slug: string
  resolutionSource?: string
  endDate: string
  category?: string
  liquidity?: string
  startDate?: string
  fee?: string
  image: string
  icon: string
  description: string
  outcomes: string // JSON array string e.g. "[\"Yes\", \"No\"]"
  outcomePrices: string // JSON array string e.g. "[\"0.5\", \"0.5\"]"
  volume: string
  active: boolean
  marketType?: string
  closed: boolean
  marketMakerAddress?: string
  updatedBy?: number
  createdAt: string
  updatedAt: string
  closedTime?: string | null
  wideFormat?: boolean
  new: boolean
  sentDiscord?: boolean
  featured: boolean
  submitted_by?: string
  twitterCardImage?: string
  twitterCardLocation?: string
  twitterCardLastRefreshed?: string
  archived: boolean
  resolvedBy?: string
  restricted: boolean
  groupItemTitle?: string
  groupItemThreshold?: string
  questionID?: string
  umaEndDate?: string
  enableOrderBook?: boolean
  orderPriceMinTickSize?: number
  orderMinSize?: number
  umaResolutionStatus?: string
  volumeNum: number
  liquidityNum?: number
  endDateIso: string
  startDateIso?: string
  hasReviewedDates?: boolean
  readyForCron?: boolean
  volume24hr: number
  volume1wk: number
  volume1mo: number
  volume1yr: number
  clobTokenIds?: string // JSON array string
  umaBond?: string
  umaReward?: string
  volume24hrClob?: number
  volume1wkClob?: number
  volume1moClob?: number
  volume1yrClob?: number
  volumeClob?: number
  liquidityClob?: number
  fpmmLive?: boolean
  volume24hrAmm?: number
  volume1wkAmm?: number
  volume1moAmm?: number
  volume1yrAmm?: number
  volumeAmm?: number
  liquidityAmm?: number
  acceptingOrders?: boolean
  negRisk?: boolean
  negRiskMarketID?: string
  negRiskRequestID?: string
  ready?: boolean
  funded?: boolean
  acceptingOrdersTimestamp?: string
  cyom: boolean
  competitive?: number
  pagerDutyNotificationEnabled?: boolean
  approved?: boolean
  clobRewards?: ClobReward[]
  rewardsMinSize?: number
  rewardsMaxSpread?: number
  spread?: number
  automaticallyResolved?: boolean
  oneDayPriceChange?: number
  oneHourPriceChange?: number
  oneWeekPriceChange?: number
  oneMonthPriceChange?: number
  oneYearPriceChange?: number
  lastTradePrice?: number
  bestBid?: number
  bestAsk?: number
  automaticallyActive?: boolean
  clearBookOnStart?: boolean
  seriesColor?: string
  manualActivation?: boolean
  negRiskOther?: boolean
  umaResolutionStatuses?: string // JSON array string
  pendingDeployment?: boolean
  deploying?: boolean
  rfqEnabled?: boolean
  holdingRewardsEnabled?: boolean
  feesEnabled?: boolean
  creator?: string
  events?: EventSummary[]
}

/**
 * Simplified Event reference embedded in Market responses
 */
export interface EventSummary {
  id: string
  ticker: string
  slug: string
  title: string
  description: string
  startDate: string
  creationDate: string
  endDate: string
  image: string
  icon: string
  active: boolean
  closed: boolean
  archived: boolean
  featured: boolean
  restricted: boolean
  liquidity: number
  volume: number
  openInterest: number
  sortBy?: string
  category?: string
  published_at?: string
  createdAt: string
  updatedAt: string
  competitive?: number
  volume24hr?: number
  volume1wk?: number
  volume1mo?: number
  volume1yr?: number
  liquidityAmm?: number
  liquidityClob?: number
  commentCount?: number
  cyom?: boolean
  closedTime?: string | null
  showAllOutcomes?: boolean
  showMarketImages?: boolean
  enableNegRisk?: boolean
  negRiskAugmented?: boolean
  pendingDeployment?: boolean
  deploying?: boolean
}

/**
 * Event entity - contains a group of related markets
 * An event with 1 market produces a Single Market Prediction (SMP)
 * An event with 2+ markets produces a Group Market Prediction (GMP)
 */
export interface Event {
  id: string
  ticker: string
  slug: string
  title: string
  description: string
  resolutionSource?: string
  startDate: string
  creationDate: string
  endDate: string
  image: string
  icon: string
  active: boolean
  closed: boolean
  archived: boolean
  new: boolean
  featured: boolean
  restricted: boolean
  liquidity: number
  volume: number
  openInterest: number
  sortBy?: string
  category?: string
  subcategory?: string
  published_at?: string
  createdAt: string
  updatedAt: string
  updatedBy?: number
  competitive?: number
  commentsEnabled?: boolean
  gmpChartMode?: string
  volume24hr?: number
  volume1wk?: number
  volume1mo?: number
  volume1yr?: number
  liquidityAmm?: number
  liquidityClob?: number
  enableOrderBook?: boolean
  commentCount?: number
  markets: Market[]
  series?: Series[]
  tags?: Tag[]
  cyom?: boolean
  closedTime?: string | null
  showAllOutcomes?: boolean
  showMarketImages?: boolean
  enableNegRisk?: boolean
  automaticallyActive?: boolean
  seriesSlug?: string
  negRisk?: boolean
  negRiskMarketID?: string
  negRiskAugmented?: boolean
  pendingDeployment?: boolean
  deploying?: boolean
}

// ============ Common Query Parameters ============

/**
 * Common pagination and ordering parameters shared across endpoints
 */
export interface PaginationParams {
  limit?: number
  offset?: number
  order?: string
  ascending?: boolean
}

// ============ Endpoints: /teams ============

export interface TeamsInput extends PaginationParams {
  league?: string[]
  name?: string[]
  abbreviation?: string[]
}

export type TeamsOutput = Team[]

// ============ Endpoints: /sports ============

export interface SportsInput {}

export type SportsOutput = SportMetadata[]

// ============ Endpoints: /events ============

export interface EventsInput extends PaginationParams {
  id?: string | string[]
  ticker?: string | string[]
  slug?: string | string[]
  title?: string
  active?: boolean
  closed?: boolean
  archived?: boolean
  new?: boolean
  featured?: boolean
  restricted?: boolean
  tag_id?: string | string[]
  tag_slug?: string
  exclude_tag_id?: string | string[]
  related_tags?: boolean
  start_date_min?: string
  start_date_max?: string
  end_date_min?: string
  end_date_max?: string
  liquidity_min?: number
  liquidity_max?: number
  volume_min?: number
  volume_max?: number
  competitive_min?: number
  competitive_max?: number
  category?: string | string[]
  cyom?: boolean
  include_chat?: boolean
  include_template?: boolean
  recurrence?: string
}

export type EventsOutput = Event[]

// ============ Endpoints: /events/:id ============

export interface EventByIdInput {
  id: string
}

export type EventByIdOutput = Event

// ============ Endpoints: /events/slug/:slug ============

export interface EventBySlugInput {
  slug: string
}

export type EventBySlugOutput = Event

// ============ Endpoints: /markets ============

export interface MarketsInput extends PaginationParams {
  id?: string | string[]
  condition_id?: string | string[]
  slug?: string | string[]
  active?: boolean
  closed?: boolean
  archived?: boolean
  new?: boolean
  featured?: boolean
  restricted?: boolean
  clob_token_ids?: string
  liquidity_min?: number
  liquidity_max?: number
  volume_min?: number
  volume_max?: number
  start_date_min?: string
  start_date_max?: string
  end_date_min?: string
  end_date_max?: string
  fee_min?: string
  fee_max?: string
}

export type MarketsOutput = Market[]

// ============ Endpoints: /markets/:id ============

export interface MarketByIdInput {
  id: string
}

export type MarketByIdOutput = Market

// ============ Endpoints: /markets/slug/:slug ============

export interface MarketBySlugInput {
  slug: string
}

export type MarketBySlugOutput = Market

// ============ Endpoints: /markets/condition/:conditionId ============

export interface MarketByConditionIdInput {
  conditionId: string
}

export type MarketByConditionIdOutput = Market

// ============ Endpoints: /tags ============

export interface TagsInput extends PaginationParams {
  id?: string | string[]
  slug?: string | string[]
  label?: string
}

export type TagsOutput = Tag[]

// ============ Endpoints: /series ============

export interface SeriesInput extends PaginationParams {
  id?: string | string[]
  slug?: string | string[]
  ticker?: string | string[]
  active?: boolean
  closed?: boolean
  archived?: boolean
}

export type SeriesOutput = Series[]

// ============ Endpoints: /series/:id ============

export interface SeriesByIdInput {
  id: string
}

export type SeriesByIdOutput = Series

// ============ Endpoints: /series/slug/:slug ============

export interface SeriesBySlugInput {
  slug: string
}

export type SeriesBySlugOutput = Series

// ============ API Client Configuration ============

/**
 * Gamma API base URL
 */
export const GAMMA_API_BASE_URL = 'https://gamma-api.polymarket.com'

/**
 * Gamma API endpoint paths
 */
export const GAMMA_ENDPOINTS = {
  events: '/events',
  eventById: (id: string) => `/events/${id}`,
  eventBySlug: (slug: string) => `/events/slug/${slug}`,
  markets: '/markets',
  marketById: (id: string) => `/markets/${id}`,
  marketBySlug: (slug: string) => `/markets/slug/${slug}`,
  marketByConditionId: (conditionId: string) => `/markets/condition/${conditionId}`,
  tags: '/tags',
  series: '/series',
  seriesById: (id: string) => `/series/${id}`,
  seriesBySlug: (slug: string) => `/series/slug/${slug}`,
  teams: '/teams',
  sports: '/sports',
} as const

/**
 * Helper type to parse JSON string fields in Market
 */
export interface ParsedMarketOutcomes {
  outcomes: string[]
  outcomePrices: string[]
  clobTokenIds?: string[]
}

/**
 * Helper function type to parse market outcomes
 */
export type ParseMarketOutcomes = (market: Market) => ParsedMarketOutcomes
