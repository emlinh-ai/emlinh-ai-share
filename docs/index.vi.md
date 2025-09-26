# @emlinh-ai/types

## Giới thiệu

`@emlinh-ai/types` cung cấp một bộ types và schemas được định nghĩa sẵn để đảm bảo tính nhất quán trong việc xử lý dữ liệu across các services trong hệ thống AI.

### Tính năng chính

- ✅ **TypeScript Types**: Định nghĩa đầy đủ các types cho User, Message, Conversation, Context, Session
- ✅ **Zod Schemas**: Validation schemas cho tất cả data structures
- ✅ **Type Safety**: Đảm bảo type safety across toàn bộ hệ thống
- ✅ **Consistent API**: Cung cấp consistent interface cho tất cả services

## 🚀 Cài đặt

```bash
npm install @emlinh-ai/types
```

## 📖 Sử dụng cơ bản

```typescript
import { UserSchema, type User } from '@emlinh-ai/types';

// Validate dữ liệu với Zod
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

## 📚 Tài liệu

- [API Reference](/api) - Chi tiết về tất cả types và schemas
- [Examples](/examples) - Ví dụ sử dụng thực tế
- [GitHub Repository](https://github.com/emlinh-ai/emlinh-ai-share) - Source code và issues

## 🤝 Đóng góp

Chúng tôi hoan nghênh mọi đóng góp! Vui lòng đọc [Contributing Guide](https://github.com/emlinh-ai/emlinh-ai-share/blob/main/CONTRIBUTING.md) để biết thêm chi tiết.

## 📄 License

MIT License - xem [LICENSE](https://github.com/emlinh-ai/emlinh-ai-share/blob/main/LICENSE) để biết thêm chi tiết.