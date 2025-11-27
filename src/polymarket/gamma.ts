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
 * Image optimization metadata
 */
export interface ImageOptimization {
  id?: string
  imageUrlSource?: string
  imageUrlOptimized?: string
  imageSizeKbSource?: number
  imageSizeKbOptimized?: number
  imageOptimizedComplete?: boolean
  imageOptimizedLastUpdated?: string
  relID?: number
  field?: string
  relname?: string
}

/**
 * Tag entity - used for categorizing events and markets
 */
export interface Tag {
  id: string
  label?: string | null
  slug?: string | null
  forceShow?: boolean | null
  forceHide?: boolean | null
  publishedAt?: string | null
  createdBy?: number | null
  updatedBy?: number | null
  createdAt?: string | null
  updatedAt?: string | null
  isCarousel?: boolean | null
}

/**
 * Category entity for event classification
 */
export interface Category {
  id: string
  label?: string | null
  slug?: string | null
  parentCategory?: string | null
  publishedAt?: string | null
  createdBy?: string | null
  updatedBy?: string | null
  createdAt?: string | null
  updatedAt?: string | null
}

/**
 * Collection entity for grouping events
 */
export interface Collection {
  id: string
  ticker?: string | null
  slug?: string | null
  title?: string | null
  subtitle?: string | null
  collectionType?: string | null
  description?: string | null
  tags?: string | null
  image?: string | null
  icon?: string | null
  headerImage?: string | null
  layout?: string | null
  active?: boolean
  closed?: boolean
  archived?: boolean
  new?: boolean
  featured?: boolean
  restricted?: boolean
  isTemplate?: boolean
  templateVariables?: string | null
  publishedAt?: string | null
  createdBy?: string | null
  updatedBy?: string | null
  createdAt?: string | null
  updatedAt?: string | null
  commentsEnabled?: boolean
  imageOptimized?: ImageOptimization | null
  iconOptimized?: ImageOptimization | null
  headerImageOptimized?: ImageOptimization | null
}

/**
 * Chat channel associated with an event or series
 */
export interface Chat {
  id?: string
  channelId?: string | null
  channelName?: string | null
  channelImage?: string | null
  live?: boolean | null
  startTime?: string | null
  endTime?: string | null
}

/**
 * Event creator information
 */
export interface EventCreator {
  id: string
  creatorName?: string | null
  creatorHandle?: string | null
  creatorUrl?: string | null
  creatorImage?: string | null
  createdAt?: string | null
  updatedAt?: string | null
}

/**
 * Event template
 */
export interface Template {
  id: string
  eventTitle?: string | null
  eventSlug?: string | null
  eventImage?: string | null
  marketTitle?: string | null
  description?: string | null
  resolutionSource?: string | null
  negRisk?: boolean
  sortBy?: string | null
  showMarketImages?: boolean
  seriesSlug?: string | null
  outcomes?: string | null
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
  subtitle?: string | null
  seriesType?: string
  recurrence?: string
  description?: string | null
  image?: string
  icon?: string
  layout?: string
  active?: boolean
  closed?: boolean
  archived?: boolean
  new?: boolean
  featured?: boolean
  restricted?: boolean
  isTemplate?: boolean
  templateVariables?: boolean
  publishedAt?: string | null
  createdBy?: string | null
  updatedBy?: string | null
  createdAt?: string
  updatedAt?: string
  commentsEnabled?: boolean
  competitive?: string | null
  volume24hr?: number
  volume?: number
  liquidity?: number
  startDate?: string | null
  pythTokenID?: string | null
  cgAssetName?: string | null
  score?: number
  events?: Event[]
  collections?: Collection[]
  categories?: Category[]
  tags?: Tag[]
  commentCount?: number
  chats?: Chat[]
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
  twitterCardImage?: string | null
  resolutionSource?: string | null
  endDate: string
  category?: string | null
  ammType?: string | null
  liquidity?: string | null
  sponsorName?: string | null
  sponsorImage?: string | null
  startDate?: string | null
  xAxisValue?: string | null
  yAxisValue?: string | null
  denominationToken?: string | null
  fee?: string | null
  image: string
  icon: string
  lowerBound?: string | null
  upperBound?: string | null
  description: string
  outcomes: string // JSON array string e.g. "[\"Yes\", \"No\"]"
  outcomePrices: string // JSON array string e.g. "[\"0.5\", \"0.5\"]"
  volume: string
  active: boolean
  marketType?: string | null
  formatType?: string | null
  lowerBoundDate?: string | null
  upperBoundDate?: string | null
  closed: boolean
  marketMakerAddress?: string | null
  createdBy?: number | null
  updatedBy?: number | null
  createdAt: string
  updatedAt: string
  closedTime?: string | null
  wideFormat?: boolean
  new: boolean
  mailchimpTag?: string | null
  featured: boolean
  archived: boolean
  resolvedBy?: string | null
  restricted: boolean
  marketGroup?: number | null
  groupItemTitle?: string | null
  groupItemThreshold?: string | null
  questionID?: string | null
  umaEndDate?: string | null
  enableOrderBook?: boolean
  orderPriceMinTickSize?: number
  orderMinSize?: number
  umaResolutionStatus?: string | null
  curationOrder?: number | null
  volumeNum: number
  liquidityNum?: number
  endDateIso: string
  startDateIso?: string | null
  umaEndDateIso?: string | null
  hasReviewedDates?: boolean
  readyForCron?: boolean
  commentsEnabled?: boolean
  volume24hr: number
  volume1wk: number
  volume1mo: number
  volume1yr: number
  gameStartTime?: string | null
  secondsDelay?: number | null
  clobTokenIds?: string | null // JSON array string
  disqusThread?: string | null
  shortOutcomes?: string | null
  teamAID?: string | null
  teamBID?: string | null
  umaBond?: string | null
  umaReward?: string | null
  fpmmLive?: boolean
  volume24hrAmm?: number
  volume1wkAmm?: number
  volume1moAmm?: number
  volume1yrAmm?: number
  volume24hrClob?: number
  volume1wkClob?: number
  volume1moClob?: number
  volume1yrClob?: number
  volumeAmm?: number
  volumeClob?: number
  liquidityAmm?: number
  liquidityClob?: number
  makerBaseFee?: number
  takerBaseFee?: number
  customLiveness?: number
  acceptingOrders?: boolean
  notificationsEnabled?: boolean
  score?: number
  imageOptimized?: ImageOptimization | null
  iconOptimized?: ImageOptimization | null
  events?: Event[]
  categories?: Category[]
  tags?: Tag[]
  creator?: string | null
  ready?: boolean
  funded?: boolean
  pastSlugs?: string | null
  readyTimestamp?: string | null
  fundedTimestamp?: string | null
  acceptingOrdersTimestamp?: string | null
  cyom?: boolean
  competitive?: number
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
  chartColor?: string | null
  seriesColor?: string | null
  showGmpSeries?: boolean
  showGmpOutcome?: boolean
  manualActivation?: boolean
  negRisk?: boolean
  negRiskMarketID?: string | null
  negRiskRequestID?: string | null
  negRiskOther?: boolean
  gameId?: string | null
  groupItemRange?: string | null
  sportsMarketType?: string | null
  line?: number | null
  umaResolutionStatuses?: string | null // JSON array string
  pendingDeployment?: boolean
  deploying?: boolean
  deployingTimestamp?: string | null
  scheduledDeploymentTimestamp?: string | null
  rfqEnabled?: boolean
  eventStartTime?: string | null
  holdingRewardsEnabled?: boolean
  feesEnabled?: boolean
  pagerDutyNotificationEnabled?: boolean
  approved?: boolean
  sentDiscord?: boolean
  submitted_by?: string | null
  twitterCardLocation?: string | null
  twitterCardLastRefreshed?: string | null
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
  subtitle?: string | null
  description: string
  resolutionSource?: string | null
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
  sortBy?: string | null
  category?: string | null
  subcategory?: string | null
  isTemplate?: boolean
  templateVariables?: string | null
  published_at?: string | null
  createdBy?: string | null
  updatedBy?: string | null
  createdAt: string
  updatedAt: string
  commentsEnabled?: boolean
  competitive?: number
  volume24hr?: number
  volume1wk?: number
  volume1mo?: number
  volume1yr?: number
  featuredImage?: string | null
  disqusThread?: string | null
  parentEvent?: string | null
  enableOrderBook?: boolean
  liquidityAmm?: number
  liquidityClob?: number
  negRisk?: boolean
  negRiskMarketID?: string | null
  negRiskFeeBips?: number
  commentCount?: number
  imageOptimized?: ImageOptimization | null
  iconOptimized?: ImageOptimization | null
  featuredImageOptimized?: ImageOptimization | null
  subEvents?: string[]
  markets: Market[]
  series?: Series[]
  categories?: Category[]
  collections?: Collection[]
  tags?: Tag[]
  cyom?: boolean
  closedTime?: string | null
  showAllOutcomes?: boolean
  showMarketImages?: boolean
  automaticallyResolved?: boolean
  enableNegRisk?: boolean
  automaticallyActive?: boolean
  eventDate?: string | null
  startTime?: string | null
  eventWeek?: number | null
  seriesSlug?: string | null
  score?: string | null
  elapsed?: string | null
  period?: string | null
  live?: boolean
  ended?: boolean
  finishedTimestamp?: string | null
  gmpChartMode?: string | null
  eventCreators?: EventCreator[]
  tweetCount?: number
  chats?: Chat[]
  featuredOrder?: number
  estimateValue?: boolean
  cantEstimate?: boolean
  estimatedValue?: string | null
  templates?: Template[]
  spreadsMainLine?: number | null
  totalsMainLine?: number | null
  carouselMap?: string | null
  negRiskAugmented?: boolean
  pendingDeployment?: boolean
  deploying?: boolean
  deployingTimestamp?: string | null
  scheduledDeploymentTimestamp?: string | null
  gameStatus?: string | null
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
  id?: number | number[]
  slug?: string | string[]
  tag_id?: number
  exclude_tag_id?: number | number[]
  tag_slug?: string
  related_tags?: boolean
  active?: boolean
  archived?: boolean
  featured?: boolean
  cyom?: boolean
  include_chat?: boolean
  include_template?: boolean
  recurrence?: string
  closed?: boolean
  liquidity_min?: number
  liquidity_max?: number
  volume_min?: number
  volume_max?: number
  start_date_min?: string
  start_date_max?: string
  end_date_min?: string
  end_date_max?: string
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
  id?: number | number[]
  slug?: string | string[]
  clob_token_ids?: string | string[]
  condition_ids?: string | string[]
  market_maker_address?: string | string[]
  question_ids?: string | string[]
  liquidity_num_min?: number
  liquidity_num_max?: number
  volume_num_min?: number
  volume_num_max?: number
  start_date_min?: string
  start_date_max?: string
  end_date_min?: string
  end_date_max?: string
  tag_id?: number
  related_tags?: boolean
  cyom?: boolean
  closed?: boolean
  uma_resolution_status?: string
  game_id?: string
  sports_market_types?: string | string[]
  rewards_min_size?: number
  include_tag?: boolean
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
  include_template?: boolean
  is_carousel?: boolean
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
