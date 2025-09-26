# @emlinh/ai-shared

Thư viện TypeScript types và Zod schemas được chia sẻ cho hệ thống AI của EmLinh.

## 🚀 Cài đặt

```bash
npm install @emlinh/ai-shared
# hoặc
yarn add @emlinh/ai-shared
# hoặc
pnpm add @emlinh/ai-shared
```

## 📖 Sử dụng

### Import Types và Schemas

```typescript
import {
  // User types
  User,
  CreateUser,
  UpdateUser,
  UserSchema,
  CreateUserSchema,
  UpdateUserSchema,
  
  // Message types
  Message,
  CreateMessage,
  MessageContent,
  MessageSchema,
  CreateMessageSchema,
  
  // Conversation types
  Conversation,
  CreateConversation,
  ConversationSchema,
  
  // Context types
  Context,
  ContextPayload,
  ContextSchema,
  
  // Session types
  Session,
  SessionSchema,
} from '@emlinh/ai-shared';
```

### Validation với Zod

```typescript
import { UserSchema, CreateUserSchema } from '@emlinh/ai-shared';

// Validate user data
const userData = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  email: 'user@example.com',
  name: 'John Doe',
  role: 'user',
  // ... other fields
};

try {
  const validUser = UserSchema.parse(userData);
  console.log('Valid user:', validUser);
} catch (error) {
  console.error('Validation error:', error);
}

// Validate user creation payload
const createUserData = {
  email: 'newuser@example.com',
  name: 'Jane Doe',
  role: 'user',
};

const newUser = CreateUserSchema.parse(createUserData);
```

### TypeScript Types

```typescript
import type { User, Message, Conversation } from '@emlinh/ai-shared';

function processUser(user: User) {
  // TypeScript sẽ provide type safety và autocomplete
  console.log(`User ${user.name} has role ${user.role}`);
}

function createMessage(data: CreateMessage): Message {
  // Implementation
  return {
    ...data,
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
```

## 📚 API Reference

### Core Types

#### User
- `User`: Complete user entity
- `CreateUser`: Data needed to create a user (omits auto-generated fields)
- `UpdateUser`: Partial user data for updates
- `UserRole`: `'admin' | 'user' | 'moderator'`
- `UserPreferences`: User settings and preferences

#### Message
- `Message`: Complete message entity
- `CreateMessage`: Data needed to create a message
- `MessageContent`: Union type for different content types (text, image, file, code, system)
- `MessageStatus`: `'pending' | 'sent' | 'delivered' | 'read' | 'failed'`
- `MessageContentType`: `'text' | 'image' | 'file' | 'code' | 'system'`

#### Conversation
- `Conversation`: Complete conversation entity
- `CreateConversation`: Data needed to create a conversation
- `ConversationStatus`: `'active' | 'archived' | 'deleted'`
- `ConversationType`: `'chat' | 'assistant' | 'group'`

#### Context
- `Context`: Complete context entity
- `ContextPayload`: Data for context API requests
- `ContextSource`: `'file' | 'web' | 'database' | 'api' | 'user_input' | 'system'`
- `ContextDataType`: `'text' | 'code' | 'image' | 'document' | 'structured'`

#### Session
- `Session`: Complete session entity
- `SessionStatus`: `'active' | 'expired' | 'terminated'`

### Zod Schemas

Tất cả types đều có corresponding Zod schemas để validation:
- `UserSchema`, `CreateUserSchema`, `UpdateUserSchema`
- `MessageSchema`, `CreateMessageSchema`, `UpdateMessageSchema`
- `ConversationSchema`, `CreateConversationSchema`, `UpdateConversationSchema`
- `ContextSchema`, `ContextPayloadSchema`
- `SessionSchema`, `CreateSessionSchema`, `UpdateSessionSchema`

## 🛠️ Development

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

### Documentation

```bash
npm run docs:dev  # Development server
npm run docs:build  # Build documentation
```

## 📄 License

MIT

## 🤝 Contributing

Vui lòng đọc contribution guidelines trước khi submit PR.

## 📞 Support

Nếu bạn gặp vấn đề hoặc có câu hỏi, vui lòng tạo issue trên GitHub repository.