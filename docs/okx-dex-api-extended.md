# OKX DEX API 文档（行情/代币/余额/交易历史/兑换聚合器/链上网关）

> 说明
> - 格式对齐 `docs/okx-dex-api.md`：每个接口包含文档链接、接口路径、请求方法、请求参数、响应字段。
> - 字段类型以官方文档为准；未特别说明均为 `String`/`Number`/`Boolean`/`Array`/`Object`。
> - 某些页面示例较长，此处省略长示例，聚焦参数与返回结构（如需完整示例可补充）。

---

## 一、综合币价 API

### 获取综合币价

获取多个第三方数据源加权后的代币综合价格，支持批量（≤100）。

**文档链接**: `https://web3.okx.com/zh-hans/build/dev-docs/dex-api/dex-index-price`

**接口路径**: `https://web3.okx.com/api/v5/dex/index/current-price`  
**请求方法**: POST

**请求参数**:
| 参数名 | 类型 | 必填 | 描述 |
|------|------|------|------|
| chainIndex | String | 是 | 链唯一标识 |
| tokenContractAddress | String | 是 | 代币地址；`""` 代表查询对应链主币 |

**响应字段**:
| 字段名 | 类型 | 描述 |
|------|------|------|
| price | String | 美元计价价格 |
| time | String | 毫秒时间戳 |
| chainIndex | String | 链唯一标识 |
| tokenContractAddress | String | 代币地址 |

---

### 获取历史综合币价

查询指定代币历史综合价格（分页/游标/时间段/粒度）。

**文档链接**: `https://web3.okx.com/zh-hans/build/dev-docs/dex-api/dex-historical-index-price`

**接口路径**: `https://web3.okx.com/api/v5/dex/index/historical-price`  
**请求方法**: GET

**请求参数**:
| 参数名 | 类型 | 必填 | 描述 |
|------|------|------|------|
| chainIndex | String | 是 | 链唯一标识 |
| tokenContractAddress | String | 否 | 代币地址；`""` 代表主币 |
| limit | String | 否 | 默认 50，最大 200 |
| cursor | String | 否 | 游标 |
| begin | String | 否 | 开始毫秒时间戳 |
| end | String | 否 | 结束毫秒时间戳 |
| period | String | 否 | `1m/5m/30m/1h/1d(默认)` |

**响应字段**:
| 字段名 | 类型 | 描述 |
|------|------|------|
| prices | Array | 历史价格列表 |
| > time | String | 整分钟时间戳 |
| > price | String | 美元价格（18 位精度）|
| cursor | String | 游标 |

---

## 二、代币 API

### 代币搜索

按代币符号或合约地址搜索，名称/符号返回最多 100 条；地址返回精确匹配。

**文档链接**: `https://web3.okx.com/zh-hans/build/dev-docs/dex-api/dex-market-token-search`

**接口路径**: `https://web3.okx.com/api/v6/dex/market/token/search`  
**请求方法**: GET

**请求参数**:
| 参数名 | 类型 | 必填 | 描述 |
|------|------|------|------|
| chains | String | 是 | 链唯一标识，支持多链逗号分隔（如 `1,10`）。更多见官方链表 |
| search | String | 是 | 搜索关键词，支持代币合约地址或 symbol |

**响应字段**:
| 字段名 | 类型 | 描述 |
|------|------|------|
| chainIndex | String | 区块链唯一标识 |
| tokenName | String | 代币名称 |
| tokenSymbol | String | 代币符号 |
| tokenLogoUrl | String | 代币图标 URL |
| tokenContractAddress | String | 代币合约地址 |
| decimal | String | 代币精度 |
| explorerUrl | String | 区块浏览器链接 |
| change | String | 24h 价格变动比例 |
| holders | String | 持有人数 |
| liquidity | String | 流动性（24h）|
| marketCap | String | 市值 |
| price | String | 价格 |
| tagList | Object | 标签对象 |
| > communityRecognized | Boolean | 是否被前十大 CEX 上线或社区验证 |

---

### 代币基础信息

**文档链接**: `https://web3.okx.com/zh-hans/build/dev-docs/dex-api/dex-market-token-basic-info`

**接口路径**: `https://web3.okx.com/api/v6/dex/market/token/basic-info`  
**请求方法**: POST

**请求参数**:
| 参数名 | 类型 | 必填 | 描述 |
|------|------|------|------|
| chainIndex | String | 是 | 链唯一标识 |
| tokenContractAddress | String | 是 | 代币合约地址 |

**响应字段**:
| 字段名 | 类型 | 描述 |
|------|------|------|
| chainIndex | String | 链标识 |
| tokenName | String | 名称 |
| tokenSymbol | String | 符号 |
| tokenLogoUrl | String | 图标 |
| decimal | String | 精度 |
| tagList | Object | 标签对象 |
| > communityRecognized | Boolean | 是否被前十大 CEX 上线或社区验证 |

---

### 代币交易信息

批量返回价格、成交、流通、持有人、流动性等（≤100）。

**文档链接**: `https://web3.okx.com/zh-hans/build/dev-docs/dex-api/dex-market-token-price-info`

**接口路径**: `https://web3.okx.com/api/v6/dex/market/price-info`  
**请求方法**: POST

**请求参数**:
| 参数名 | 类型 | 必填 | 描述 |
|------|------|------|------|
| chainIndex | String | 是 | 链唯一标识 |
| tokenContractAddress | String | 是 | 支持逗号分隔批量（≤100）|

**响应字段**:
| 字段名 | 类型 | 描述 |
|------|------|------|
| time | String | 毫秒时间戳 |
| price | String | 最新价 |
| marketCap | String | 市值 |
| priceChange5M/1H/4H/24H | String | 涨跌百分比 |
| volume5M/1H/4H/24H | String | 成交量 |
| txs5M/1H/4H/24H | String | 交易笔数 |
| maxPrice/minPrice | String | 24h 高/低 |
| tradeNum | String | 24h 交易数量 |
| circSupply | String | 流通量 |
| liquidity | String | 池内流动性 |
| holders | String | 持有人数 |

---

### 代币榜单

按价格波动/成交量/市值排序，指定时间范围，最多 100 条。

**文档链接**: `https://web3.okx.com/zh-hans/build/dev-docs/dex-api/dex-market-token-ranking`

**接口路径**: `https://web3.okx.com/api/v6/dex/market/token/toplist`  
**请求方法**: GET

**请求参数**:
| 参数名 | 类型 | 必填 | 描述 |
|------|------|------|------|
| chains | String | 是 | 多链逗号分隔 |
| sortBy | String | 是 | `2`价格波动 `5`成交量 `6`市值 |
| timeFrame | String | 是 | `1`5m `2`1h `3`4h `4`24h |

**响应字段**:
| 字段名 | 类型 | 描述 |
|------|------|------|
| chainIndex | String | 链标识 |
| tokenSymbol | String | 代币符号 |
| tokenLogoUrl | String | 代币图标 URL |
| tokenContractAddress | String | 代币合约地址 |
| marketCap | String | 市值 |
| volume | String | 交易额(USD) |
| firstTradeTime | String | 首次交易时间 |
| change | String | 价格变动比例 |
| liquidity | String | 流动性 |
| price | String | 价格 |
| holders | String | 持币地址数 |
| uniqueTraders | String | 独立交易地址数 |
| txsBuy | String | 买入笔数 |
| txsSell | String | 卖出笔数 |
| txs | String | 总交易笔数 |

---

### 代币持有人信息（Top 20）

**文档链接**: `https://web3.okx.com/zh-hans/build/dev-docs/dex-api/dex-market-token-holder`

**接口路径**: `https://web3.okx.com/api/v5/dex/market/token/holder`  
**请求方法**: GET

**请求参数**:
| 参数名 | 类型 | 必填 | 描述 |
|------|------|------|------|
| chainIndex | String | 是 | 链唯一标识 |
| tokenContractAddress | String | 是 | 合约地址 |

**响应字段**:
| 字段名 | 类型 | 描述 |
|------|------|------|
| holdAmount | String | 持仓数量 |
| holderWalletAddress | String | 钱包地址 |

---

## 三、余额 API

### 获取总估值

返回地址下代币与 DeFi 资产总余额（USD）。

**文档链接**: `https://web3.okx.com/zh-hans/build/dev-docs/dex-api/dex-balance-total-value`

**接口路径**: `https://web3.okx.com/api/v6/dex/balance/total-value-by-address`  
**请求方法**: GET

**请求参数**:
| 参数名 | 类型 | 必填 | 描述 |
|------|------|------|------|
| address | String | 是 | 地址 |
| chains | String | 是 | 多链逗号分隔（≤50）|
| assetType | String | 否 | `0`全部(默认) `1`仅代币 `2`仅 DeFi |
| excludeRiskToken | Boolean | 否 | 过滤风险空投/貔貅代币（默认 true）|

**响应字段**:
| 字段名 | 类型 | 描述 |
|------|------|------|
| totalValue | String | 总估值（USD）|

---

### 获取资产明细

查询地址在多链/指定链的代币余额列表。

**文档链接**: `https://web3.okx.com/zh-hans/build/dev-docs/dex-api/dex-balance-total-token-balances`

**接口路径**: `https://web3.okx.com/api/v6/dex/balance/all-token-balances-by-address`  
**请求方法**: GET

**请求参数**:
| 参数名 | 类型 | 必填 | 描述 |
|------|------|------|------|
| address | String | 是 | 地址 |
| chains | String | 是 | 多链逗号分隔（≤50）|
| excludeRiskToken | String | 否 | `0`过滤(默认) `1`不过滤 |

**响应字段**:
| 字段名 | 类型 | 描述 |
|------|------|------|
| tokenAssets[] | Array | 代币余额条目 |
| > chainIndex | String | 链标识 |
| > tokenContractAddress | String | 合约地址（主币为空字符串）|
| > address | String | 地址 |
| > symbol | String | 短名 |
| > balance | String | 数量（按精度换算）|
| > rawBalance | String | 原始数量（不支持链为空）|
| > tokenPrice | String | 单价（USD）|
| > isRiskToken | Boolean | 是否风险/貔貅 |

---

### 获取特定代币余额

批量查询地址对指定代币（含主币）的余额。

**文档链接**: `https://web3.okx.com/zh-hans/build/dev-docs/dex-api/dex-balance-specific-token-balance`

**接口路径**: `https://web3.okx.com/api/v6/dex/balance/token-balances-by-address`  
**请求方法**: POST

**请求参数**:
| 参数名 | 类型 | 必填 | 描述 |
|------|------|------|------|
| address | String | 是 | 地址 |
| tokenContractAddresses | Array | 是 | 列表项含 `chainIndex` 与 `tokenContractAddress`（主币传 `""`）|
| excludeRiskToken | String | 否 | `0`过滤(默认) `1`不过滤 |

**响应字段**:
| 字段名 | 类型 | 描述 |
|------|------|------|
| tokenAssets[] | Array | 代币余额列表 |
| > chainIndex | String | 链标识 |
| > tokenContractAddress | String | 代币地址, 主币为空字符串 |
| > address | String | 地址 |
| > symbol | String | 代币简称 |
| > balance | String | 代币数量 |
| > rawBalance | String | 原始数量(不支持链为空) |
| > tokenPrice | String | 单价(USD) |
| > isRiskToken | Boolean | 是否风险/貔貅 |

---

## 四、交易历史 API

### 获取交易历史（地址维度）

查询地址 6 个月内的交易历史，按时间倒序。

**文档链接**: `https://web3.okx.com/zh-hans/build/dev-docs/dex-api/dex-tx-history-transactions-by-address`

**接口路径**: `https://web3.okx.com/api/v6/dex/post-transaction/transactions-by-address`  
**请求方法**: GET

**请求参数**:
| 参数名 | 类型 | 必填 | 描述 |
|------|------|------|------|
| address | String | 是 | 账户地址 |
| chains | String | 是 | 多链逗号分隔（≤50）|
| tokenContractAddress | String | 否 | `""` 主币；不传主币+所有代币 |
| begin/end | String | 否 | 时间范围（毫秒）|
| cursor | String | 否 | 游标 |
| limit | String | 否 | 多链≤20，单链≤100 |

**响应字段**:
| 字段名 | 类型 | 描述 |
|------|------|------|
| transactions[] | Array | 交易列表 |
| > chainIndex | String | 链 ID |
| > txHash | String | 交易哈希 |
| > itype | String | 层级类型: `0`外层主币转移 `1`合约内层主币转移 `2`token 转移 |
| > methodId | String | 合约调用函数 |
| > nonce | String | 发起者此地址的第几笔交易 |
| > txTime | String | 毫秒时间戳 |
| > from[] | Array | 输入明细, 含 address, amount |
| > to[] | Array | 输出明细, 含 address, amount |
| > tokenContractAddress | String | 代币合约地址 |
| > amount | String | 交易数量 |
| > symbol | String | 币种简称 |
| > txFee | String | 手续费 |
| > txStatus | String | `success`/`fail`/`pending` |
| > hitBlacklist | Boolean | 是否命中黑名单 |
| cursor | String | 游标 |

---

### 获取特定交易（txHash）

拆解交易与内部交易，返回多维度详情。

**文档链接**: `https://web3.okx.com/zh-hans/build/dev-docs/dex-api/dex-tx-history-specific-transaction-detail-by-txhash`

**接口路径**: `https://web3.okx.com/api/v6/dex/post-transaction/transaction-detail-by-txhash`  
**请求方法**: GET

**请求参数**:
| 参数名 | 类型 | 必填 | 描述 |
|------|------|------|------|
| chainIndex | String | 是 | 链标识 |
| txHash | String | 是 | 交易哈希 |
| itype | String | 否 | 参见上文 `itype` 定义 |

**响应字段**:
| 字段名 | 类型 | 描述 |
|------|------|------|
| chainIndex | String | 链标识 |
| height | String | 区块高度 |
| txTime | String | 毫秒时间戳 |
| txhash | String | 交易哈希 |
| txStatus | String | `1`pending `2`success `3`fail |
| gasLimit | String | gas 限额 |
| gasUsed | String | gas 消耗 |
| gasPrice | String | gas 价格 |
| txFee | String | 手续费 |
| nonce | String | nonce |
| amount | String | 交易数量 |
| symbol | String | 币种简称 |
| methodId | String | 合约方法 |
| fromDetails[] | Array | 输入详情: address, vinIndex, preVoutIndex, txhash, isContract, amount |
| toDetails[] | Array | 输出详情: address, voutIndex, isContract, amount |
| internalTransactionDetails[] | Array | 内部交易: from, to, isFromContract, isToContract, amount, txStatus |
| tokenTransferDetails[] | Array | 代币转账: from, to, isFromContract, isToContract, tokenContractAddress, symbol, amount |
| l1OriginHash | String | L1 来源哈希 |

---

## 五、兑换聚合器 API

### 获取币种列表

**文档链接**: `https://web3.okx.com/zh-hans/build/dev-docs/dex-api/dex-get-tokens`

**接口路径**: `https://web3.okx.com/api/v6/dex/aggregator/all-tokens`  
**请求方法**: GET

**请求参数**:
| 参数名 | 类型 | 必填 | 描述 |
|------|------|------|------|
| chainIndex | String | 是 | 链标识 |
| chainId | String | 是 | 链 ID（即将废弃）|

**响应字段**:
| 字段名 | 类型 | 描述 |
|------|------|------|
| decimals | String | 精度 |
| tokenContractAddress | String | 合约地址 |
| tokenLogoUrl | String | 图标 URL |
| tokenName | String | 名称 |
| tokenSymbol | String | 短名 |

---

### 获取流动性列表

**文档链接**: `https://web3.okx.com/zh-hans/build/dev-docs/dex-api/dex-get-liquidity`

**接口路径**: `https://web3.okx.com/api/v6/dex/aggregator/get-liquidity`  
**请求方法**: GET

**请求参数**:
| 参数名 | 类型 | 必填 | 描述 |
|------|------|------|------|
| chainIndex | String | 是 | 链标识 |

**响应字段**:
| 字段名 | 类型 | 描述 |
|------|------|------|
| id | String | 流动性池 ID |
| name | String | 名称 |
| logo | String | 协议图标 URL |

---

### 交易授权（Approve）

**文档链接**: `https://web3.okx.com/zh-hans/build/dev-docs/dex-api/dex-approve-transaction`

**接口路径**: `https://web3.okx.com/api/v6/dex/aggregator/approve-transaction`  
**请求方法**: GET

**请求参数**:
| 参数名 | 类型 | 必填 | 描述 |
|------|------|------|------|
| chainIndex | String | 是 | 链标识 |
| tokenContractAddress | String | 是 | 代币合约地址 |
| approveAmount | String | 是 | 授权数量, 按精度编码 |

**响应字段**:
| 字段名 | 类型 | 描述 |
|------|------|------|
| data | String | Call data |
| dexContractAddress | String | Approve 合约地址 |
| gasLimit | String | Gas 限额建议 |
| gasPrice | String | Gas 价格(wei) |

---

### 获取兑换价格（Quote）

**文档链接**: `https://web3.okx.com/zh-hans/build/dev-docs/dex-api/dex-get-quote`

**接口路径**: `https://web3.okx.com/api/v6/dex/aggregator/quote`  
**请求方法**: GET

**请求参数**:
| 参数名 | 类型 | 必填 | 描述 |
|------|------|------|------|
| chainIndex | String | 是 | 链标识 |
| amount | String | 是 | 交易数量, exactIn 为卖出数量, exactOut 为买入数量, 按精度编码 |
| swapMode | String | 是 | `exactIn` 或 `exactOut` |
| fromTokenAddress | String | 是 | 卖出代币地址 |
| toTokenAddress | String | 是 | 买入代币地址 |
| dexIds | String | 否 | 指定 DEX ID, 逗号分隔 |
| directRoute | Boolean | 否 | 仅使用单一流动性池路径 |
| priceImpactProtectionPercent | String | 否 | 价格影响保护百分比, 默认 90 |
| feePercent | String | 否 | 分佣百分比, Solana 最大 10, 其他链最大 3 |

**响应字段**:
| 字段名 | 类型 | 描述 |
|------|------|------|
| chainIndex | String | 链标识 |
| dexRouterList[] | Array | 询价路径集合, 含 dexProtocol/fromToken/toToken 等 |
| fromTokenAmount | String | 卖出数量 |
| toTokenAmount | String | 买入数量 |
| tradeFee | String | 网络费用(USD) |
| estimateGasFee | String | 预估 gas(最小单位) |
| router | String | 主路径描述 |
| routerPercent | String | 本路径资产占比 |
| subRouterList[] | Array | 子路径集合 |
| dexProtocol | Array | 路径中使用的 DEX 协议列表, 含 dexName/percent |
| fromToken | Object | 询价币信息: tokenContractAddress/tokenSymbol/tokenUnitPrice/decimal/isHoneyPot/taxRate |
| toToken | Object | 目标币信息: 同上 |
| quoteCompareList[] | Array | 路径对比, 含 dexName/dexLogo/tradeFee/amountOut/priceImpactPercent |

---

### 获取 Solana 兑换交易指令

**文档链接**: `https://web3.okx.com/zh-hans/build/dev-docs/dex-api/dex-solana-swap-instruction`

**接口路径**: `https://web3.okx.com/api/v6/dex/aggregator/swap-instruction`  
**请求方法**: GET

**请求参数**:
| 参数名 | 类型 | 必填 | 描述 |
|------|------|------|------|
| chainIndex | String | 是 | 链标识, Solana 为 `501` |
| amount | String | 是 | 询价数量, 按精度编码 |
| fromTokenAddress | String | 是 | 源代币地址 |
| toTokenAddress | String | 是 | 目标代币地址 |
| slippagePercent | String | 是 | 滑点百分比 |
| autoSlippage | Boolean | 否 | 自动滑点 |
| maxAutoSlippagePercent | String | 否 | 自动滑点上限 |
| userWalletAddress | String | 是 | 用户地址 |
| swapReceiverAddress | String | 否 | 收款地址 |
| feePercent | String | 否 | 分佣百分比 |
| fromTokenReferrerWalletAddress | String | 否 | fromToken 分佣地址 |
| toTokenReferrerWalletAddress | String | 否 | toToken 分佣地址 |
| positiveSlippagePercent | String | 否 | 正滑点分佣百分比(白名单) |
| positiveSlippageFeeAddress | String | 否 | 正滑点分佣地址 |
| dexIds | String | 否 | 指定 DEX |
| excludeDexIds | String | 否 | 排除 DEX |
| disableRFQ | String | 否 | 禁用 RFQ 流动性 |
| directRoute | Boolean | 否 | 仅单池直达路径 |
| priceImpactProtectionPercent | String | 否 | 价格影响保护 |
| computeUnitPrice | String | 否 | Solana 优先费价格 |
| computeUnitLimit | String | 否 | Solana 计算单元上限 |

**响应字段**:
| 字段名 | 类型 | 描述 |
|------|------|------|
| addressLookupTableAccount[] | Array | 地址查找表账户 |
| instructionLists[] | Array | 指令数据: data/accounts/programId 等 |
| routerResult | Object | 路由结果, 结构同 Quote, 含 dexRouterList 等 |
| tx | Object | 交易信息: from/to/minReceiveAmount/slippagePercent |

---

### 兑换（Swap）

**文档链接**: `https://web3.okx.com/zh-hans/build/dev-docs/dex-api/dex-swap`

**接口路径**: `https://web3.okx.com/api/v6/dex/aggregator/swap`  
**请求方法**: GET

**请求参数**:
| 参数名 | 类型 | 必填 | 描述 |
|------|------|------|------|
| chainIndex | String | 是 | 链标识 |
| amount | String | 是 | 交易数量, exactIn 或 exactOut 模式, 按精度编码 |
| swapMode | String | 是 | `exactIn` 或 `exactOut` |
| fromTokenAddress | String | 是 | 卖出代币地址 |
| toTokenAddress | String | 是 | 买入代币地址 |
| slippagePercent | String | 是 | 滑点百分比 |
| userWalletAddress | String | 是 | 用户地址 |
| swapReceiverAddress | String | 否 | 收款地址 |
| feePercent | String | 否 | 分佣百分比 |
| fromTokenReferrerWalletAddress | String | 否 | fromToken 分佣地址 |
| toTokenReferrerWalletAddress | String | 否 | toToken 分佣地址 |
| positiveSlippagePercent | String | 否 | 正滑点分佣百分比(白名单) |
| positiveSlippageFeeAddress | String | 否 | 正滑点分佣地址(白名单) |
| gaslimit | String | 否 | EVM gas 限额 |
| gasLevel | String | 否 | EVM gas 价格等级 `average|fast|slow` |
| dexIds | String | 否 | 指定 DEX, 逗号分隔 |
| excludeDexIds | String | 否 | 排除 DEX, 逗号分隔 |
| disableRFQ | String | 否 | 禁用 RFQ 流动性 |
| directRoute | Boolean | 否 | 仅单池直达路径 |
| priceImpactProtectionPercent | String | 否 | 价格影响保护百分比 |
| callDataMemo | String | 否 | 自定义上链 memo (0x 前缀 64bytes) |
| computeUnitPrice | String | 否 | Solana 优先费价格 |
| computeUnitLimit | String | 否 | Solana 计算单元上限 |
| tips | String | 否 | Solana Jito tips (SOL) |
| autoSlippage | Boolean | 否 | 自动滑点 |
| maxAutoslippagePercent | String | 否 | 自动滑点上限 |

**响应字段**:
| 字段名 | 类型 | 描述 |
|------|------|------|
| routerResult | Object | 询价路径结果, 结构同 Quote |
| tx | Object | 交易发送数据 |
| > data | String | Call data |
| > from | String | 发送地址 |
| > to | String | Router 地址 |
| > gas | String | gas 限额估计 |
| > gasPrice | String | gas 价格(wei) |
| > maxPriorityFeePerGas | String | EIP-1559 优先费 |
| > value | String | 主币数额(wei) |
| > maxSpendAmount | String | 最大支出(ExactOut) |
| > minReceiveAmount | String | 最小接收 |
| > slippagePercent | String | 滑点 |
| > signatureData[] | Array | 额外签名数据(如 Jito tips) |

---

### 查询交易状态（Swap History）

**文档链接**: `https://web3.okx.com/zh-hans/build/dev-docs/dex-api/dex-swap-history`

**接口路径**: `https://web3.okx.com/api/v6/dex/aggregator/history`  
**请求方法**: GET

**请求参数**: `chainIndex/chainId/txHash/isFromMyProject`。

**响应字段**:
| 字段名 | 类型 | 描述 |
|------|------|------|
| chainIndex | String | 链标识 |
| txHash | String | 交易哈希 |
| height | String | 区块高度 |
| txTime | String | 毫秒时间戳 |
| status | String | `pending`/`success`/`fail` |
| txType | String | `Approve` `Wrap` `Unwrap` `Swap` |
| fromAddress | String | 发送地址 |
| dexrouter | String | 交互地址 |
| toAddress | String | 接收地址 |
| fromTokenDetails | Object | 询价详情: symbol/amount/tokenAddress |
| toTokenDetails | Object | 兑换详情: symbol/amount/tokenAddress |
| referralAmount | String | 分佣金额 |
| errorMsg | String | 错误信息 |
| gasLimit | String | gas 限额 |
| gasUsed | String | gas 消耗 |
| gasPrice | String | gas 价格 |
| txFee | String | 手续费(主币数量) |

---

## 六、交易上链 API（Onchain Gateway）

### 获取 Gas Price

动态获取不同链的预估 gas 价格（EVM/Tron/EIP-1559、Solana priorityFee）。

**文档链接**: `https://web3.okx.com/zh-hans/build/dev-docs/dex-api/dex-onchain-gateway-api-gas-price`

**接口路径**: `https://web3.okx.com/api/v6/dex/pre-transaction/gas-price`  
**请求方法**: GET

**请求参数**: `chainIndex`。

**响应字段（EVM/Tron）**: `normal/min/max/supporteip1559/eip1559Protocol{baseFee,proposePriorityFee,safePriorityFee,fastPriorityFee}`。  
**响应字段（Solana）**: `priorityFee{proposePriorityFee/safePriorityFee/fastPriorityFee/extremePriorityFee}`。

---

### 获取 Gas Limit

预执行交易，返回预估 Gaslimit。

**文档链接**: `https://web3.okx.com/zh-hans/build/dev-docs/dex-api/dex-onchain-gateway-api-gas-limit`

**接口路径**: `https://web3.okx.com/api/v6/dex/pre-transaction/gas-limit`  
**请求方法**: POST

**请求参数**: `chainIndex/fromAddress/toAddress/txAmount(主币时可用,代币时=0)/extJson.inputData`。

**响应字段**: `gasLimit`。

---

### 模拟交易（企业）

仅企业客户开放，返回意图、资产变动、风险与耗气等。

**文档链接**: `https://web3.okx.com/zh-hans/build/dev-docs/dex-api/dex-onchain-gateway-api-simulate-transaction`

**接口路径**: `https://web3.okx.com/api/v6/dex/pre-transaction/simulate`  
**请求方法**: POST

**请求参数**:
| 参数名 | 类型 | 必填 | 描述 |
|------|------|------|------|
| fromAddress | String | 是 | From 地址(钱包) |
| toAddress | String | 是 | To 地址, 兑换为 Router, 授权为代币地址 |
| chainIndex | String | 是 | 链标识(EVM/SOL/SUI 支持) |
| txAmount | String | 否 | 主币交易数额, 代币交易填 `0`(最小单位) |
| extJson.inputData | String | 是 | calldata, 要求 base58 编码 |
| priorityFee | String | 否 | Solana 优先费 |
| gasPrice | String | 否 | gas 价格 |

**响应字段**:
| 字段名 | 类型 | 描述 |
|------|------|------|
| intention | String | 交易意图 `Swap`/`Token Approval` |
| assetChange[] | Array | 资产变动, 含 assetType/name/symbol/decimals/address/imageUrl/rawValue |
| gasUsed | String | Gas 消耗 |
| failReason | String | 失败原因 |
| risks[] | Array | 风险列表, 含 address/addressType |

---

### 广播交易（企业）

**文档链接**: `https://web3.okx.com/zh-hans/build/dev-docs/dex-api/dex-onchain-gateway-api-broadcast-transaction`

**接口路径**: `https://web3.okx.com/api/v6/dex/pre-transaction/broadcast-transaction`  
**请求方法**: POST

**请求参数**: `signedTx/chainIndex/address`。

**响应字段**: `orderId`（交易唯一标识）。

---

### 获取广播订单列表（企业）

查询从广播接口发出的订单列表，按时间倒序。

**文档链接**: `https://web3.okx.com/zh-hans/build/dev-docs/dex-api/dex-onchain-gateway-api-orders`

**接口路径**: `https://web3.okx.com/api/v6/dex/post-transaction/orders`  
**请求方法**: GET

**请求参数**:
| 参数名 | 类型 | 必填 | 描述 |
|------|------|------|------|
| address | String | 是 | 地址 |
| chainIndex | String | 是 | 链唯一标识 |
| txStatus | String | 否 | 交易状态：`1`排队中 `2`成功 `3`失败 |
| orderId | String | 否 | 广播返回的订单唯一标识 |
| cursor | String | 否 | 游标 |
| limit | String | 否 | 默认 20，最大 100 |

**响应字段**:
| 字段名 | 类型 | 描述 |
|------|------|------|
| cursor | String | 游标 |
| orders[] | Array | 订单列表 |
| > chainIndex | String | 链唯一标识 |
| > address | String | 地址 |
| > orderId | String | 订单 Id |
| > txStatus | String | `1/2/3`（排队/成功/失败）|
| > failReason | String | 失败原因（若有）|
| > txHash | String | 交易哈希 |

---

## 附：分组与格式建议（可选）

- 分组顺序：行情 → 代币 → 余额 → 交易历史 → 兑换聚合器 → 链上网关（与产品使用路径一致）。
- 表头统一：Parameter/Type/Required/Description；中文场景下使用“参数名/类型/必填/描述”。
- 字段精度：金额字段一律按最小单位或注明是否已按 `decimals` 换算；主币地址为空字符串的规则保持一致说明。
- 示例策略：默认省略超长示例，使用 `curl` 最小化可运行片段；如需完整示例可单独建立 `examples/`。
