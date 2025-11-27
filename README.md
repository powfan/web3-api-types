# @dex-cex/web3-api-types

Web3 API TypeScript type definitions.

## Structure

```
src/
├── index.ts
└── polymarket/
    ├── index.ts
    ├── gamma.ts      # Gamma API (market metadata)
    └── clob.ts       # CLOB API (trading) - TODO
```

## Usage

```typescript
import type { Team, TeamsInput, TeamsOutput } from '@web3-api-types/polymarket/gamma'
```

## APIs

### Polymarket

- **Gamma API**: https://gamma-api.polymarket.com - Market metadata, events, sports
- **CLOB API**: https://clob.polymarket.com - Order book trading
