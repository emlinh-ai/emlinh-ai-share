# Examples

## Overview

This document provides practical examples of how to use `@emlinh-ai/types` in various scenarios.

## User Management

### Creating a New User

```typescript
import { CreateUserSchema, type User } from '@emlinh-ai/types';

async function createUser(userData: unknown): Promise<User> {
  // Validate input data
  const validatedData = CreateUserSchema.parse(userData);
  
  // Create user with validated data
  const newUser: User = {
    ...validatedData,
    id: generateUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  // Save to database
  await saveUserToDatabase(newUser);
  
  return newUser;
}

// Usage
const userData = {
  email: 'john@example.com',
  name: 'John Doe',
  role: 'user',
  preferences: {
    theme: 'dark',
    language: 'en',
    notifications: true,
  },
};

const user = await createUser(userData);
```

### Updating a User

```typescript
import { UpdateUserSchema, UserSchema } from '@emlinh-ai/types';

async function updateUser(userId: string, updateData: unknown): Promise<User> {
  // Validate update data
  const validatedUpdate = UpdateUserSchema.parse(updateData);
  
  // Get current user
  const currentUser = await getUserFromDatabase(userId);
  
  // Merge changes
  const updatedUser: User = {
    ...currentUser,
    ...validatedUpdate,
    updatedAt: new Date(),
  };
  
  // Validate final user object
  const validUser = UserSchema.parse(updatedUser);
  
  // Save to database
  await saveUserToDatabase(validUser);
  
  return validUser;
}
```

## Message Handling

### Creating a Text Message

```typescript
import { CreateMessageSchema, type Message } from '@emlinh-ai/types';

async function createTextMessage(
  conversationId: string,
  userId: string,
  text: string
): Promise<Message> {
  const messageData = {
    conversationId,
    userId,
    content: {
      type: 'text' as const,
      text,
    },
    status: 'pending' as const,
  };
  
  // Validate message data
  const validatedData = CreateMessageSchema.parse(messageData);
  
  const message: Message = {
    ...validatedData,
    id: generateUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  return message;
}
```

### Creating an Image Message

```typescript
import { CreateMessageSchema } from '@emlinh-ai/types';

async function createImageMessage(
  conversationId: string,
  userId: string,
  imageUrl: string,
  caption?: string
): Promise<Message> {
  const messageData = {
    conversationId,
    userId,
    content: {
      type: 'image' as const,
      url: imageUrl,
      caption,
      metadata: {
        size: await getImageSize(imageUrl),
        format: getImageFormat(imageUrl),
      },
    },
    status: 'pending' as const,
  };
  
  const validatedData = CreateMessageSchema.parse(messageData);
  
  const message: Message = {
    ...validatedData,
    id: generateUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  return message;
}
```

### Creating a Code Message

```typescript
import { CreateMessageSchema } from '@emlinh-ai/types';

async function createCodeMessage(
  conversationId: string,
  userId: string,
  code: string,
  language: string
): Promise<Message> {
  const messageData = {
    conversationId,
    userId,
    content: {
      type: 'code' as const,
      code,
      language,
      metadata: {
        lineCount: code.split('\n').length,
        size: code.length,
      },
    },
    status: 'pending' as const,
  };
  
  const validatedData = CreateMessageSchema.parse(messageData);
  
  const message: Message = {
    ...validatedData,
    id: generateUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  return message;
}
```

## Conversation Management

### Creating a New Conversation

```typescript
import { CreateConversationSchema } from '@emlinh-ai/types';

async function createConversation(
  title: string,
  participants: string[],
  type: 'chat' | 'assistant' | 'group' = 'chat'
): Promise<Conversation> {
  const conversationData = {
    title,
    participants,
    type,
    status: 'active' as const,
  };
  
  const validatedData = CreateConversationSchema.parse(conversationData);
  
  const conversation: Conversation = {
    ...validatedData,
    id: generateUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  return conversation;
}
```

### Updating a Conversation

```typescript
import { UpdateConversationSchema } from '@emlinh-ai/types';

async function updateConversation(
  conversationId: string,
  updates: {
    title?: string;
    participants?: string[];
    status?: 'active' | 'archived' | 'deleted';
  }
): Promise<Conversation> {
  const validatedUpdates = UpdateConversationSchema.parse(updates);
  
  const currentConversation = await getConversationFromDatabase(conversationId);
  
  const updatedConversation: Conversation = {
    ...currentConversation,
    ...validatedUpdates,
    updatedAt: new Date(),
  };
  
  return updatedConversation;
}
```

## Context Management

### Creating Context from File

```typescript
import { CreateContextSchema } from '@emlinh-ai/types';

async function createFileContext(
  filePath: string,
  content: string
): Promise<Context> {
  const contextData = {
    source: 'file' as const,
    dataType: 'text' as const,
    content,
    metadata: {
      filePath,
      size: content.length,
      encoding: 'utf-8',
    },
  };
  
  const validatedData = CreateContextSchema.parse(contextData);
  
  const context: Context = {
    ...validatedData,
    id: generateUUID(),
    createdAt: new Date(),
  };
  
  return context;
}
```

### Creating Context from Web

```typescript
import { ContextSearchQuerySchema } from '@emlinh-ai/types';

async function createWebContext(
  url: string,
  content: string,
  searchQuery?: string
): Promise<Context> {
  const contextData = {
    source: 'web' as const,
    dataType: 'text' as const,
    content,
    metadata: {
      url,
      searchQuery,
      fetchedAt: new Date().toISOString(),
    },
  };
  
  // Validate search query if provided
  if (searchQuery) {
    ContextSearchQuerySchema.parse({ query: searchQuery });
  }
  
  const context: Context = {
    ...contextData,
    id: generateUUID(),
    createdAt: new Date(),
  };
  
  return context;
}
```

## Session Management

### Creating a New Session

```typescript
import { CreateSessionSchema } from '@emlinh-ai/types';

async function createSession(userId: string): Promise<Session> {
  const sessionData = {
    userId,
    status: 'active' as const,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  };
  
  const validatedData = CreateSessionSchema.parse(sessionData);
  
  const session: Session = {
    ...validatedData,
    id: generateUUID(),
    createdAt: new Date(),
  };
  
  return session;
}
```

## Validation Examples

### Validate User Input

```typescript
import { UserSchema } from '@emlinh-ai/types';

function validateUserInput(input: unknown): boolean {
  try {
    UserSchema.parse(input);
    return true;
  } catch (error) {
    console.error('Validation failed:', error);
    return false;
  }
}
```

### Validate with Custom Error Handling

```typescript
import { CreateUserSchema } from '@emlinh-ai/types';
import { ZodError } from 'zod';

function validateCreateUser(input: unknown) {
  try {
    return {
      success: true,
      data: CreateUserSchema.parse(input),
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      };
    }
    
    return {
      success: false,
      errors: [{ field: 'unknown', message: 'Validation failed' }],
    };
  }
}
```

### Validate Array Data

```typescript
import { CreateMessageSchema } from '@emlinh-ai/types';
import { z } from 'zod';

const MessagesArraySchema = z.array(CreateMessageSchema);

function validateMessages(messages: unknown[]) {
  try {
    const validMessages = MessagesArraySchema.parse(messages);
    return { success: true, data: validMessages };
  } catch (error) {
    return { success: false, error };
  }
}
```

## Utility Functions

### Generate UUID

```typescript
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
```

### Type Guards

```typescript
import { Message, MessageContent } from '@emlinh-ai/types';

function isTextMessage(message: Message): message is Message & { content: { type: 'text' } } {
  return message.content.type === 'text';
}

function isImageMessage(message: Message): message is Message & { content: { type: 'image' } } {
  return message.content.type === 'image';
}

function isCodeMessage(message: Message): message is Message & { content: { type: 'code' } } {
  return message.content.type === 'code';
}
```