# @emlinh/ai-shared

Thư viện TypeScript types và Zod schemas được chia sẻ cho hệ thống AI của EmLinh.

## Giới thiệu

`@emlinh/ai-shared` cung cấp một bộ types và schemas được định nghĩa sẵn để đảm bảo tính nhất quán trong việc xử lý dữ liệu across các services trong hệ thống AI.

### Tính năng chính

- ✅ **Type Safety**: TypeScript types đầy đủ cho tất cả entities
- ✅ **Runtime Validation**: Zod schemas để validate dữ liệu runtime
- ✅ **Consistent API**: Cấu trúc dữ liệu nhất quán across services
- ✅ **Auto-completion**: IntelliSense support trong IDE
- ✅ **Tree-shakable**: Chỉ import những gì bạn cần

## Cài đặt

```bash
npm install @emlinh/ai-shared
```

## Quick Start

```typescript
import { UserSchema, type User } from '@emlinh/ai-shared';

// Validate dữ liệu với Zod
const userData = UserSchema.parse({
  id: '123e4567-e89b-12d3-a456-426614174000',
  email: 'user@example.com',
  name: 'John Doe',
  role: 'user',
});

// Sử dụng TypeScript types
function processUser(user: User) {
  console.log(`Processing user: ${user.name}`);
}
```

## Core Entities

### User
Quản lý thông tin người dùng, roles và preferences.

### Message
Xử lý các loại message khác nhau: text, image, file, code, system.

### Conversation
Quản lý conversations với settings và metadata.

### Context
Xử lý context data từ nhiều nguồn khác nhau.

### Session
Quản lý user sessions và authentication state.

## Tài liệu chi tiết

- [API Reference](/api) - Chi tiết về tất cả types và schemas
- [Examples](/examples) - Ví dụ sử dụng thực tế