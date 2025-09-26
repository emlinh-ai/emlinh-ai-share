# @emlinh-ai/types

## 介绍

`@emlinh-ai/types` 提供了一套全面的预定义类型和模式，以确保 EmLinh AI 生态系统中各服务之间的数据一致性。

### 主要特性

- ✅ **TypeScript 类型**: 为 User、Message、Conversation、Context、Session 提供完整的类型定义
- ✅ **Zod 模式**: 为所有数据结构提供验证模式
- ✅ **类型安全**: 确保整个系统的类型安全
- ✅ **一致的 API**: 为所有服务提供一致的接口

## 🚀 安装

```bash
npm install @emlinh-ai/types
```

## 📖 基本用法

```typescript
import { UserSchema, type User } from '@emlinh-ai/types';

// 使用 Zod 验证数据
const userData = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  email: 'user@example.com',
  name: 'John Doe',
  role: 'user',
};

try {
  const validUser = UserSchema.parse(userData);
  console.log('Valid user:', validUser);
} catch (error) {
  console.error('Validation error:', error);
}
```

## 📚 文档

- [API 参考](/api) - 所有类型和模式的详细信息
- [示例](/examples) - 实际使用示例
- [GitHub 仓库](https://github.com/emlinh-ai/emlinh-ai-share) - 源代码和问题

## 🤝 贡献

我们欢迎所有贡献！请阅读我们的[贡献指南](https://github.com/emlinh-ai/emlinh-ai-share/blob/main/CONTRIBUTING.md)了解更多详情。

## 📄 许可证

MIT 许可证 - 查看 [LICENSE](https://github.com/emlinh-ai/emlinh-ai-share/blob/main/LICENSE) 了解更多详情。