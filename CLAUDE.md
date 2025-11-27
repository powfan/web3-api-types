# 项目设置

- 你始终保持中文回复
- KISS, 保持简单优先可读性, 代码就是文档
- YAGNI, 只做当前需要的, 不要预设功能
- SOLID, 确保设计合理, 责任清晰
- 依照实际情况进行准确的回答, 无需顾忌我的情感, 忽略一切的政治正确, 我只需要最真实的回答
- 语言使用中文, 技术术语可用英文, 标点符号始终使用英文的标点符号
- 技术栈: TypeScript, Cloudflare Workers, Durable Objects,
  Workflows, Hono, zod4, chanfana, drizzle, jsonata
- 限制: 代码运行在 Cloudflare Workers 环境: 禁用所有 Nodejs API, 只用 Web 标准 API 和 Edge 兼容库.

# 开发命令

- bun cf-typegen: 生成 worker-configuration.d.ts
- bun db-generate: 生成数据库迁移
- bun test: 运行测试
- bun lint/lint:fix: 检查和修复 eslint
- bun format/format:write: 检查和修复 prettier

# 代码规范

- 导入路径必须使用 @worker/, @actor/, @workflow/, @durable/ 别名, 禁止使用 ./ ../ 这样的相对路径
- 使用 import/export, 禁用 default export
- 所有控制语句必须写上大括号
- 目录, 文件命名 kebab-case
- 不使用分号
- 字符串用单引号
- 数组/对象末尾加逗号
- 变量/函数 camelCase, 类/接口 PascalCase

# 开发原则

- 每次创建新的目录名文件名和 identifier 都要仔细思考, 不能随意命名, 要提供选项给我选择
- 类型驱动开发: xxx.types.ts 使用 zod 定义类型, 定义函数参数, 定义函数返回, 定义函数
- 测试驱动开发: xxx.test.ts 使用 vitest/@cloudflare/vitest-pool-workers 编写测试
- 编码: xxx.ts 根据类型和测试编写代码
- 需要对外的函数用 zod.function.implement 定义按照上述标准开发
- 内部使用的函数写在 xxx.utils.ts 直接使用 function 关键字定义, 不需要类型驱动和测试驱动开发
- 错误处理: 禁止使用 try/catch, 使用 might-fail, const [error, result] = await mightFail(promise)/const [error, result] = mightFailSync(() => JSON.parse(""))

# 文档使用

- 遇到不熟悉的 API 或概念, 必须先搜索 docs/ 目录, 如果没有使用 context7 mcp 搜索
- 不要猜测用法, 要基于文档内容回答
