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

// ============ Endpoints: /teams ============

export interface TeamsInput {
  limit?: number
  offset?: number
  order?: string
  ascending?: boolean
  league?: string[]
  name?: string[]
  abbreviation?: string[]
}

export type TeamsOutput = Team[]

// ============ Endpoints: /sports ============

export interface SportsInput {}

export type SportsOutput = SportMetadata[]
