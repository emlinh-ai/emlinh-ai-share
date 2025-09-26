# API Reference - Tiếng Việt

## Tổng quan

`@emlinh-ai/types` cung cấp các types và schemas cho hệ thống AI của EmLinh. Tất cả types đều được export từ entry point chính.

## Import

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
} from '@emlinh-ai/types';
```

## Core Types

### User Types

#### `User`
Đại diện cho một user hoàn chỉnh trong hệ thống.

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}
```

#### `CreateUser`
Dữ liệu cần thiết để tạo user mới (loại bỏ các field tự động tạo).

```typescript
type CreateUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
```

#### `UpdateUser`
Dữ liệu partial để cập nhật user.

```typescript
type UpdateUser = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;
```

#### `UserRole`
Các vai trò có thể có của user.

```typescript
type UserRole = 'admin' | 'user' | 'moderator';
```

### Message Types

#### `Message`
Đại diện cho một message hoàn chỉnh.

```typescript
interface Message {
  id: string;
  conversationId: string;
  userId: string;
  content: MessageContent;
  status: MessageStatus;
  createdAt: Date;
  updatedAt: Date;
}
```

#### `MessageContent`
Union type cho các loại nội dung message khác nhau.

```typescript
type MessageContent = 
  | TextContent 
  | ImageContent 
  | FileContent 
  | CodeContent 
  | SystemContent;
```

#### `MessageStatus`
Trạng thái của message.

```typescript
type MessageStatus = 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
```

### Conversation Types

#### `Conversation`
Đại diện cho một cuộc hội thoại hoàn chỉnh.

```typescript
interface Conversation {
  id: string;
  title: string;
  participants: string[];
  type: ConversationType;
  status: ConversationStatus;
  createdAt: Date;
  updatedAt: Date;
}
```

#### `ConversationType`
Loại cuộc hội thoại.

```typescript
type ConversationType = 'chat' | 'assistant' | 'group';
```

#### `ConversationStatus`
Trạng thái cuộc hội thoại.

```typescript
type ConversationStatus = 'active' | 'archived' | 'deleted';
```

### Context Types

#### `Context`
Đại diện cho context data.

```typescript
interface Context {
  id: string;
  source: ContextSource;
  dataType: ContextDataType;
  content: string;
  metadata: Record<string, any>;
  createdAt: Date;
}
```

#### `ContextSource`
Nguồn của context data.

```typescript
type ContextSource = 'file' | 'web' | 'database' | 'api' | 'user_input' | 'system';
```

#### `ContextDataType`
Loại dữ liệu context.

```typescript
type ContextDataType = 'text' | 'code' | 'image' | 'document' | 'structured';
```

### Session Types

#### `Session`
Đại diện cho một session.

```typescript
interface Session {
  id: string;
  userId: string;
  status: SessionStatus;
  createdAt: Date;
  expiresAt: Date;
}
```

#### `SessionStatus`
Trạng thái session.

```typescript
type SessionStatus = 'active' | 'expired' | 'terminated';
```

## Zod Schemas

Tất cả types đều có corresponding Zod schemas để validation:

### User Schemas
- `UserSchema` - Validate User object
- `CreateUserSchema` - Validate CreateUser data
- `UpdateUserSchema` - Validate UpdateUser data

### Message Schemas
- `MessageSchema` - Validate Message object
- `CreateMessageSchema` - Validate CreateMessage data

### Conversation Schemas
- `ConversationSchema` - Validate Conversation object
- `CreateConversationSchema` - Validate CreateConversation data

### Context Schemas
- `ContextSchema` - Validate Context object
- `ContextPayloadSchema` - Validate ContextPayload data

### Session Schemas
- `SessionSchema` - Validate Session object

## Sử dụng Validation

```typescript
import { UserSchema } from '@emlinh-ai/types';

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
```