# API Reference

## Overview

`@emlinh-ai/types` provides comprehensive TypeScript types and Zod schemas for AI applications. This document details all available types, schemas, and their usage.

## Core Types

### User

Represents a user in the system.

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'moderator';
  avatar?: string;
  preferences?: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}
```

#### UserPreferences

```typescript
interface UserPreferences {
  theme?: 'light' | 'dark' | 'auto';
  language?: string;
  notifications?: boolean;
  timezone?: string;
}
```

### Message

Represents a message in a conversation.

```typescript
interface Message {
  id: string;
  conversationId: string;
  userId: string;
  content: MessageContent;
  status: 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}
```

#### MessageContent

Union type for different message content types:

```typescript
type MessageContent = 
  | TextContent 
  | ImageContent 
  | CodeContent 
  | FileContent;
```

##### TextContent

```typescript
interface TextContent {
  type: 'text';
  text: string;
}
```

##### ImageContent

```typescript
interface ImageContent {
  type: 'image';
  url: string;
  caption?: string;
  metadata?: {
    size?: number;
    format?: string;
    width?: number;
    height?: number;
  };
}
```

##### CodeContent

```typescript
interface CodeContent {
  type: 'code';
  code: string;
  language: string;
  metadata?: {
    lineCount?: number;
    size?: number;
  };
}
```

##### FileContent

```typescript
interface FileContent {
  type: 'file';
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}
```

### Conversation

Represents a conversation between users.

```typescript
interface Conversation {
  id: string;
  title: string;
  participants: string[];
  type: 'chat' | 'assistant' | 'group';
  status: 'active' | 'archived' | 'deleted';
  createdAt: Date;
  updatedAt: Date;
}
```

### Context

Represents contextual information for AI processing.

```typescript
interface Context {
  id: string;
  source: 'file' | 'web' | 'database' | 'user';
  dataType: 'text' | 'image' | 'audio' | 'video' | 'document';
  content: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}
```

### Session

Represents a user session.

```typescript
interface Session {
  id: string;
  userId: string;
  status: 'active' | 'expired' | 'terminated';
  expiresAt: Date;
  createdAt: Date;
}
```

## Zod Schemas

All types have corresponding Zod schemas for validation:

### User Schemas

```typescript
import { 
  UserSchema,
  CreateUserSchema,
  UpdateUserSchema,
  UserPreferencesSchema 
} from '@emlinh-ai/types';

// Validate a complete user object
const user = UserSchema.parse(userData);

// Validate user creation data
const createData = CreateUserSchema.parse(inputData);

// Validate user update data
const updateData = UpdateUserSchema.parse(updateInput);

// Validate user preferences
const preferences = UserPreferencesSchema.parse(prefsData);
```

### Message Schemas

```typescript
import { 
  MessageSchema,
  CreateMessageSchema,
  UpdateMessageSchema,
  MessageContentSchema 
} from '@emlinh-ai/types';

// Validate a complete message
const message = MessageSchema.parse(messageData);

// Validate message creation data
const createData = CreateMessageSchema.parse(inputData);

// Validate message content
const content = MessageContentSchema.parse(contentData);
```

### Conversation Schemas

```typescript
import { 
  ConversationSchema,
  CreateConversationSchema,
  UpdateConversationSchema 
} from '@emlinh-ai/types';

// Validate a complete conversation
const conversation = ConversationSchema.parse(conversationData);

// Validate conversation creation data
const createData = CreateConversationSchema.parse(inputData);
```

### Context Schemas

```typescript
import { 
  ContextSchema,
  CreateContextSchema,
  ContextSearchQuerySchema 
} from '@emlinh-ai/types';

// Validate a complete context
const context = ContextSchema.parse(contextData);

// Validate context creation data
const createData = CreateContextSchema.parse(inputData);

// Validate search query
const query = ContextSearchQuerySchema.parse({ query: 'search term' });
```

### Session Schemas

```typescript
import { 
  SessionSchema,
  CreateSessionSchema,
  UpdateSessionSchema 
} from '@emlinh-ai/types';

// Validate a complete session
const session = SessionSchema.parse(sessionData);

// Validate session creation data
const createData = CreateSessionSchema.parse(inputData);
```

## Validation Examples

### Basic Validation

```typescript
import { UserSchema } from '@emlinh-ai/types';

try {
  const validUser = UserSchema.parse(userData);
  console.log('User is valid:', validUser);
} catch (error) {
  console.error('Validation failed:', error);
}
```

### Safe Parsing

```typescript
import { CreateUserSchema } from '@emlinh-ai/types';

const result = CreateUserSchema.safeParse(userData);

if (result.success) {
  console.log('Valid data:', result.data);
} else {
  console.error('Validation errors:', result.error.errors);
}
```

### Partial Validation

```typescript
import { UpdateUserSchema } from '@emlinh-ai/types';

// Only validate provided fields
const partialUpdate = UpdateUserSchema.parse({
  name: 'New Name',
  // Other fields are optional
});
```

## Type Guards

Use type guards to narrow types at runtime:

```typescript
import { Message } from '@emlinh-ai/types';

function isTextMessage(message: Message): message is Message & { content: { type: 'text' } } {
  return message.content.type === 'text';
}

function isImageMessage(message: Message): message is Message & { content: { type: 'image' } } {
  return message.content.type === 'image';
}

// Usage
if (isTextMessage(message)) {
  // TypeScript knows message.content.text exists
  console.log(message.content.text);
}
```

## Utility Types

### Extract specific content types

```typescript
import { MessageContent } from '@emlinh-ai/types';

type TextMessage = Extract<MessageContent, { type: 'text' }>;
type ImageMessage = Extract<MessageContent, { type: 'image' }>;
type CodeMessage = Extract<MessageContent, { type: 'code' }>;
```

### Create arrays of types

```typescript
import { User, Message } from '@emlinh-ai/types';

type UserList = User[];
type MessageList = Message[];
```

## Error Handling

### Zod Error Structure

```typescript
import { ZodError } from 'zod';

try {
  UserSchema.parse(invalidData);
} catch (error) {
  if (error instanceof ZodError) {
    error.errors.forEach(err => {
      console.log(`Field: ${err.path.join('.')}`);
      console.log(`Error: ${err.message}`);
      console.log(`Code: ${err.code}`);
    });
  }
}
```

### Custom Error Messages

```typescript
import { z } from 'zod';

const CustomUserSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  role: z.enum(['admin', 'user', 'moderator'], {
    errorMap: () => ({ message: 'Role must be admin, user, or moderator' })
  })
});
```

## Best Practices

### 1. Always Validate Input Data

```typescript
import { CreateUserSchema } from '@emlinh-ai/types';

async function createUser(input: unknown) {
  // Always validate before processing
  const validatedData = CreateUserSchema.parse(input);
  
  // Now you can safely use validatedData
  return await saveUser(validatedData);
}
```

### 2. Use Type Guards for Runtime Checks

```typescript
import { Message } from '@emlinh-ai/types';

function processMessage(message: Message) {
  if (isTextMessage(message)) {
    return processTextMessage(message.content.text);
  } else if (isImageMessage(message)) {
    return processImageMessage(message.content.url);
  }
  // Handle other types...
}
```

### 3. Leverage TypeScript's Type System

```typescript
import { User, UserRole } from '@emlinh-ai/types';

function getUsersByRole(users: User[], role: UserRole): User[] {
  return users.filter(user => user.role === role);
}

// TypeScript will ensure role is valid
const admins = getUsersByRole(users, 'admin'); // ✅ Valid
const invalid = getUsersByRole(users, 'invalid'); // ❌ TypeScript error
```

### 4. Handle Validation Errors Gracefully

```typescript
import { CreateMessageSchema } from '@emlinh-ai/types';

function createMessage(input: unknown) {
  const result = CreateMessageSchema.safeParse(input);
  
  if (!result.success) {
    return {
      success: false,
      errors: result.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }))
    };
  }
  
  return {
    success: true,
    data: result.data
  };
}
```