# Polymarket API 文档 (CLOB/Gamma Markets/Orderbook/Pricing)

> 说明
> - 格式对齐 `docs/okx-dex-api-extended.md`: 每个接口包含文档链接, 接口路径, 请求方法, 请求参数, 响应字段.
> - Polymarket 是一个去中心化预测市场, 基于 Polygon 网络, 使用 USDC 作为交易代币.
> - 所有交易通过 Central Limit Order Book (CLOB) 进行链下撮合, 链上结算.

---

## 术语表

| 术语 | 定义 |
|------|------|
| Token | 代表市场 Yes/No 结果的份额, 价格在 $0-$1 之间浮动. 市场结算时, 正确预测的 Token 可兑换为 $1 USDC |
| Market | 单个事件结果. 对应一对 CLOB Token IDs (Yes/No), 市场地址, Question ID 和 Condition ID |
| Event | 一组相关市场的集合, 按主题或类别分组 |
| SLUG | 市场或事件的人类可读标识符, 可在 URL 中找到 |
| Negative Risk (negrisk) | 一组市场(Event)中只有一个市场可以结算为 Yes |
| CLOB | Central Limit Order Book, 链下订单撮合系统 |

---

## API 端点

| 类型 | 端点 | 用途 |
|------|------|------|
| REST | `https://clob.polymarket.com/` | CLOB REST API |
| Data-API | `https://data-api.polymarket.com/` | 用户数据, 持仓, 链上活动 |
| Gamma API | `https://gamma-api.polymarket.com/` | 市场和事件查询 |
| WebSocket | `wss://ws-subscriptions-clob.polymarket.com/ws/` | CLOB WSS 订阅 |
| RTDS | `wss://ws-live-data.polymarket.com/` | 实时数据流 (价格, 评论) |

---

## 一, 认证 API

### L1 认证 (私钥认证)

最高级别认证, 通过 Polygon 私钥签名. 用于下单和创建/撤销 API Key.

**L1 Header**:
| Header | 必填 | 描述 |
|------|------|------|
| POLY_ADDRESS | 是 | Polygon 地址 |
| POLY_SIGNATURE | 是 | CLOB EIP-712 签名 |
| POLY_TIMESTAMP | 是 | 当前 UNIX 时间戳 |
| POLY_NONCE | 是 | Nonce, 默认 0 |

---

### L2 认证 (API Key 认证)

用于认证 API 请求, 如下单/取消订单, 查询订单和成交.

**L2 Header**:
| Header | 必填 | 描述 |
|------|------|------|
| POLY_ADDRESS | 是 | Polygon 地址 |
| POLY_SIGNATURE | 是 | 请求的 HMAC 签名 |
| POLY_TIMESTAMP | 是 | 当前 UNIX 时间戳 |
| POLY_API_KEY | 是 | Polymarket API Key |
| POLY_PASSPHRASE | 是 | Polymarket API Key 密码 |

---

### 创建 API Key

**文档链接**: `https://docs.polymarket.com/developers/CLOB/authentication`

**接口路径**: `https://clob.polymarket.com/auth/api-key`
**请求方法**: POST
**认证**: L1 Header

---

### 派生 API Key

**接口路径**: `https://clob.polymarket.com/auth/derive-api-key`
**请求方法**: GET
**认证**: L1 Header

---

### 获取 API Keys

**接口路径**: `https://clob.polymarket.com/auth/api-keys`
**请求方法**: GET
**认证**: L2 Header

---

### 删除 API Key

**接口路径**: `https://clob.polymarket.com/auth/api-key`
**请求方法**: DELETE
**认证**: L2 Header

---

## 二, CLOB Markets API

### 获取市场列表 (CLOB)

获取可用的 CLOB 市场列表 (分页).

**文档链接**: `https://docs.polymarket.com/developers/CLOB/markets/get-markets`

**接口路径**: `https://clob.polymarket.com/markets`
**请求方法**: GET

**请求参数**:
| 参数名 | 类型 | 必填 | 描述 |
|------|------|------|------|
| next_cursor | String | 否 | 分页游标, 用于遍历分页响应 |

**响应字段**:
| 字段名 | 类型 | 描述 |
|------|------|------|
| limit | Number | 单页结果限制 |
| count | Number | 结果数量 |
| next_cursor | String | 下一页游标 (base64 编码). `LTE=` 表示结束, `""` 表示开始 |
| data | Market[] | 市场列表 |

**Market 对象**:
| 字段名 | 类型 | 描述 |
|------|------|------|
| condition_id | String | 市场 ID, 也是 CTF Condition ID |
| question_id | String | 问题 ID, 用于派生 condition_id |
| tokens | Token[2] | 二元 Token 对 (Yes/No) |
| rewards | Rewards | 奖励相关数据 |
| minimum_order_size | String | 最小订单大小 |
| minimum_tick_size | String | 最小价格精度 (隐含概率单位) |
| category | String | 市场分类 |
| end_date_iso | String | 市场结束日期 (ISO 格式) |
| game_start_time | String | 比赛开始时间 (用于触发延迟) |
| question | String | 问题描述 |
| market_slug | String | 市场 slug |
| active | Boolean | 是否活跃 |
| closed | Boolean | 是否关闭 |
| seconds_delay | Integer | 比赛中交易延迟秒数 |
| fpmm | String | Polygon 上关联的 FPMM 地址 |

**Token 对象**:
| 字段名 | 类型 | 描述 |
|------|------|------|
| token_id | String | ERC1155 Token ID |
| outcome | String | 人类可读结果 (Yes/No) |

**Rewards 对象**:
| 字段名 | 类型 | 描述 |
|------|------|------|
| min_size | Number | 计分最小订单大小 |
| max_spread | Number | 计分最大点差 |
| event_start_date | String | 事件开始日期 |
| event_end_date | String | 事件结束日期 |
| in_game_multiplier | Number | 比赛中奖励乘数 |
| reward_epoch | Number | 当前奖励周期 |

---

## 三, 订单 API

### 下单 (单笔)

创建并提交订单. 所有订单都是限价单, 但也支持市价单 (设置可成交价格即可).

**文档链接**: `https://docs.polymarket.com/developers/CLOB/orders/create-order`

**接口路径**: `https://clob.polymarket.com/order`
**请求方法**: POST
**认证**: L2 Header

**请求参数**:
| 参数名 | 类型 | 必填 | 描述 |
|------|------|------|------|
| order | Order | 是 | 签名的订单对象 |
| owner | String | 是 | 订单所有者的 API Key |
| orderType | String | 是 | 订单类型: `FOK`, `GTC`, `GTD` |

**Order 对象**:
| 字段名 | 类型 | 必填 | 描述 |
|------|------|------|------|
| salt | Integer | 是 | 随机盐值, 用于创建唯一订单 |
| maker | String | 是 | Maker 地址 (资金方) |
| signer | String | 是 | 签名地址 |
| taker | String | 是 | Taker 地址 (运营商) |
| tokenId | String | 是 | 交易的 ERC1155 Token ID |
| makerAmount | String | 是 | Maker 愿意支出的最大金额 |
| takerAmount | String | 是 | Taker 将支付给 Maker 的最小金额 |
| expiration | String | 是 | Unix 过期时间戳 |
| nonce | String | 是 | Maker 的交易所 Nonce |
| feeRateBps | String | 是 | 手续费率 (基点) |
| side | String | 是 | 买/卖枚举索引 |
| signatureType | Integer | 是 | 签名类型枚举索引 |
| signature | String | 是 | 十六进制编码签名 |

**订单类型**:
| 类型 | 描述 |
|------|------|
| FOK | Fill-Or-Kill: 必须立即全部成交, 否则取消 |
| FAK | Fill-And-Kill: 立即成交尽可能多的数量, 剩余取消 |
| GTC | Good-Til-Cancelled: 有效直到成交或取消 |
| GTD | Good-Til-Date: 有效直到指定日期 (UTC 秒时间戳) |

**响应字段**:
| 字段名 | 类型 | 描述 |
|------|------|------|
| success | Boolean | 是否成功 |
| errorMsg | String | 错误消息 (如果失败) |
| orderId | String | 订单 ID |
| orderHashes | String[] | 结算交易哈希 (如果立即成交) |

**订单状态**:
| 状态 | 描述 |
|------|------|
| matched | 订单已下单并与现有挂单成交 |
| live | 订单已下单并挂在订单簿上 |
| delayed | 订单可成交, 但受延迟限制 |
| unmatched | 订单可成交, 但延迟失败, 下单成功 |

---

## 四, Orderbook API

### 获取订单簿摘要

获取指定 Token 的订单簿摘要.

**文档链接**: `https://docs.polymarket.com/api-reference/orderbook/get-order-book-summary`

**接口路径**: `https://clob.polymarket.com/book`
**请求方法**: GET

**请求参数**:
| 参数名 | 类型 | 必填 | 描述 |
|------|------|------|------|
| token_id | String | 是 | Token 唯一标识符 |

**响应字段**:
| 字段名 | 类型 | 描述 |
|------|------|------|
| market | String | 市场标识符 |
| asset_id | String | 资产标识符 |
| timestamp | String | 订单簿快照时间戳 |
| hash | String | 订单簿状态哈希 |
| bids | Object[] | 买单数组 |
| > price | String | 价格档位 |
| > size | String | 该价格档位的总数量 |
| asks | Object[] | 卖单数组 |
| > price | String | 价格档位 |
| > size | String | 该价格档位的总数量 |
| min_order_size | String | 该市场的最小订单大小 |
| tick_size | String | 最小价格增量 |
| neg_risk | Boolean | 是否启用负风险 |

---

## 五, Pricing API

### 获取多个市场价格

批量获取多个 Token 的市场价格.

**文档链接**: `https://docs.polymarket.com/api-reference/pricing/get-multiple-market-prices`

**接口路径**: `https://clob.polymarket.com/prices`
**请求方法**: GET

**响应字段**:
```json
{
  "token_id_1": {
    "BUY": "0.50",
    "SELL": "0.51"
  },
  "token_id_2": {
    "BUY": "0.25",
    "SELL": "0.26"
  }
}
```

---

## 六, Gamma Markets API

### 获取市场列表 (Gamma)

获取市场列表, 支持多种过滤和排序选项.

**文档链接**: `https://docs.polymarket.com/developers/gamma-markets-api/get-markets`

**接口路径**: `https://gamma-api.polymarket.com/markets`
**请求方法**: GET

> 注意: 只有 `enableOrderBook` 为 `true` 的市场才能通过 CLOB 交易.

**请求参数**:
| 参数名 | 类型 | 必填 | 描述 |
|------|------|------|------|
| limit | Integer | 否 | 结果数量限制 (≥0) |
| offset | Integer | 否 | 偏移量 (≥0) |
| order | String | 否 | 排序字段, 逗号分隔 |
| ascending | Boolean | 否 | 是否升序 |
| id | Integer[] | 否 | 市场 ID 过滤 |
| slug | String[] | 否 | Slug 过滤 |
| clob_token_ids | String[] | 否 | CLOB Token ID 过滤 |
| condition_ids | String[] | 否 | Condition ID 过滤 |
| liquidity_num_min | Number | 否 | 最小流动性 |
| liquidity_num_max | Number | 否 | 最大流动性 |
| volume_num_min | Number | 否 | 最小交易量 |
| volume_num_max | Number | 否 | 最大交易量 |
| start_date_min | DateTime | 否 | 最早开始日期 |
| start_date_max | DateTime | 否 | 最晚开始日期 |
| end_date_min | DateTime | 否 | 最早结束日期 |
| end_date_max | DateTime | 否 | 最晚结束日期 |
| closed | Boolean | 否 | 是否已关闭 |

**响应字段** (主要字段):
| 字段名 | 类型 | 描述 |
|------|------|------|
| id | String | 市场 ID |
| question | String | 问题描述 |
| conditionId | String | Condition ID |
| slug | String | URL Slug |
| endDate | DateTime | 结束日期 |
| category | String | 分类 |
| liquidity | String | 流动性 |
| outcomes | String | 结果选项 |
| outcomePrices | String | 结果价格 |
| volume | String | 总交易量 |
| active | Boolean | 是否活跃 |
| closed | Boolean | 是否关闭 |
| enableOrderBook | Boolean | 是否启用订单簿 |
| orderPriceMinTickSize | Number | 最小价格精度 |
| orderMinSize | Number | 最小订单大小 |
| volume24hr | Number | 24 小时交易量 |
| volume1wk | Number | 1 周交易量 |
| volume1mo | Number | 1 月交易量 |
| clobTokenIds | String | CLOB Token IDs |
| liquidityClob | Number | CLOB 流动性 |
| makerBaseFee | Integer | Maker 基础费率 |
| takerBaseFee | Integer | Taker 基础费率 |
| bestBid | Number | 最佳买价 |
| bestAsk | Number | 最佳卖价 |
| lastTradePrice | Number | 最后成交价 |
| oneDayPriceChange | Number | 24 小时价格变动 |
| oneWeekPriceChange | Number | 1 周价格变动 |

---

### 获取事件列表

获取事件列表, 支持多种过滤和排序选项.

**文档链接**: `https://docs.polymarket.com/developers/gamma-markets-api/get-events`

**接口路径**: `https://gamma-api.polymarket.com/events`
**请求方法**: GET

**请求参数**:
| 参数名 | 类型 | 必填 | 描述 |
|------|------|------|------|
| limit | Integer | 否 | 结果数量限制 |
| offset | Integer | 否 | 偏移量 |
| order | String | 否 | 排序字段 |
| ascending | Boolean | 否 | 是否升序 |
| id | Integer[] | 否 | 事件 ID 过滤 |
| slug | String[] | 否 | Slug 过滤 |
| active | Boolean | 否 | 是否活跃 |
| closed | Boolean | 否 | 是否关闭 |
| archived | Boolean | 否 | 是否归档 |

**响应字段** (主要字段):
| 字段名 | 类型 | 描述 |
|------|------|------|
| id | String | 事件 ID |
| ticker | String | 事件代号 |
| slug | String | URL Slug |
| title | String | 标题 |
| description | String | 描述 |
| startDate | DateTime | 开始日期 |
| endDate | DateTime | 结束日期 |
| active | Boolean | 是否活跃 |
| closed | Boolean | 是否关闭 |
| liquidity | Number | 流动性 |
| volume | Number | 交易量 |
| openInterest | Number | 未平仓量 |
| negRisk | Boolean | 是否负风险 |
| negRiskMarketID | String | 负风险市场 ID |
| markets | Market[] | 包含的市场列表 |

---

## 七, SDK 客户端

Polymarket 提供官方 SDK 客户端:

| 语言 | 库名 | GitHub |
|------|------|------|
| TypeScript | clob-client | https://github.com/Polymarket/clob-client |
| Python | py-clob-client | https://github.com/Polymarket/py-clob-client |
| Golang | go-order-utils | https://github.com/Polymarket/go-order-utils |

**Python 初始化示例**:
```python
from py_clob_client.client import ClobClient

host = "https://clob.polymarket.com"
key = "<private_key>"
chain_id = 137  # Polygon

# EOA 直接交易
client = ClobClient(host, key=key, chain_id=chain_id)

# Email/Magic 账户 (signature_type=1)
client = ClobClient(host, key=key, chain_id=chain_id,
                    signature_type=1, funder=POLYMARKET_PROXY_ADDRESS)

# 浏览器钱包 (signature_type=2)
client = ClobClient(host, key=key, chain_id=chain_id,
                    signature_type=2, funder=POLYMARKET_PROXY_ADDRESS)
```

**TypeScript 初始化示例**:
```typescript
import { ClobClient } from "@polymarket/clob-client";

const host = "https://clob.polymarket.com";
const key = "<private_key>";
const chainId = 137;

const client = new ClobClient(host, chainId, wallet);
```

---

## 附: 分组与格式建议

- 分组顺序: 认证 -> CLOB Markets -> 订单 -> Orderbook -> Pricing -> Gamma Markets
- 认证: L1 (私钥) 用于创建 API Key 和签名订单; L2 (API Key) 用于其他操作
- Token ID: 每个市场有两个 Token (Yes/No), 通过 `clobTokenIds` 或 `tokens` 字段获取
- 价格: 以隐含概率表示 (0-1), 例如 0.50 表示 50 美分
- 网络: Polygon (Chain ID: 137), 使用 USDC 作为结算代币
