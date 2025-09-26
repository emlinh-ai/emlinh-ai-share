# @emlinh-ai/types

## Introduction

`@emlinh-ai/types` provides a comprehensive set of predefined types and schemas to ensure data consistency across services in the EmLinh AI ecosystem.

### Key Features

- ✅ **TypeScript Types**: Complete type definitions for User, Message, Conversation, Context, Session
- ✅ **Zod Schemas**: Validation schemas for all data structures
- ✅ **Type Safety**: Ensures type safety across the entire system
- ✅ **Consistent API**: Provides consistent interface for all services

## 🚀 Installation

```bash
npm install @emlinh-ai/types
```

## 📖 Basic Usage

```typescript
import { UserSchema, type User } from '@emlinh-ai/types';

// Validate data with Zod
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

## 📚 Documentation

- [API Reference](/api) - Detailed information about all types and schemas
- [Examples](/examples) - Real-world usage examples
- [GitHub Repository](https://github.com/emlinh-ai/emlinh-ai-share) - Source code and issues

## 🤝 Contributing

We welcome all contributions! Please read our [Contributing Guide](https://github.com/emlinh-ai/emlinh-ai-share/blob/main/CONTRIBUTING.md) for more details.

## 📄 License

MIT License - see [LICENSE](https://github.com/emlinh-ai/emlinh-ai-share/blob/main/LICENSE) for more details.