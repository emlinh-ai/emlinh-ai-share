# Examples

## User Management

### Tạo User mới

```typescript
import { CreateUserSchema, type User } from '@emlinh-ai/types';

async function createUser(userData: unknown): Promise<User> {
  // Validate input data
  const validData = CreateUserSchema.parse(userData);
  
  // Create user in database
  const newUser = await db.users.create({
    ...validData,
    id: generateUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  
  return newUser;
}

// Usage
const userData = {
  email: 'john@example.com',
  name: 'John Doe',
  role: 'user',
  preferences: {
    language: 'en',
    theme: 'dark',
  }
};

const user = await createUser(userData);
```

### Update User Profile

```typescript
import { UpdateUserSchema, UserSchema } from '@emlinh-ai/types';

async function updateUserProfile(userId: string, updates: unknown) {
  // Validate update data
  const validUpdates = UpdateUserSchema.parse(updates);
  
  // Update in database
  const updatedUser = await db.users.update(userId, {
    ...validUpdates,
    updatedAt: new Date(),
  });
  
  // Validate final result
  return UserSchema.parse(updatedUser);
}

// Usage
await updateUserProfile('user-123', {
  name: 'John Smith',
  profile: {
    bio: 'Software Developer',
    location: 'Vietnam',
  }
});
```

## Message Handling

### Tạo Text Message

```typescript
import { CreateMessageSchema, type Message } from '@emlinh-ai/types';

async function sendTextMessage(data: {
  conversationId: string;
  userId: string;
  text: string;
}): Promise<Message> {
  const messageData = CreateMessageSchema.parse({
    conversationId: data.conversationId,
    userId: data.userId,
    role: 'user',
    content: {
      type: 'text',
      text: data.text,
    },
    status: 'pending',
  });
  
  const message = await db.messages.create({
    ...messageData,
    id: generateUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  
  return message;
}
```

### Xử lý File Upload Message

```typescript
import { CreateMessageSchema } from '@emlinh-ai/types';

async function sendFileMessage(data: {
  conversationId: string;
  userId: string;
  file: File;
}) {
  // Upload file first
  const fileUrl = await uploadFile(data.file);
  
  const messageData = CreateMessageSchema.parse({
    conversationId: data.conversationId,
    userId: data.userId,
    role: 'user',
    content: {
      type: 'file',
      attachment: {
        filename: data.file.name,
        url: fileUrl,
        size: data.file.size,
        mimeType: data.file.type,
      },
    },
    status: 'sent',
  });
  
  return await db.messages.create({
    ...messageData,
    id: generateUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}
```

### Code Block Message

```typescript
import { CreateMessageSchema } from '@emlinh-ai/types';

async function sendCodeMessage(data: {
  conversationId: string;
  userId: string;
  code: string;
  language: string;
  filename?: string;
}) {
  const messageData = CreateMessageSchema.parse({
    conversationId: data.conversationId,
    userId: data.userId,
    role: 'user',
    content: {
      type: 'code',
      code: {
        language: data.language,
        code: data.code,
        filename: data.filename,
      },
    },
    status: 'sent',
  });
  
  return await createMessage(messageData);
}
```

## Conversation Management

### Tạo Conversation mới

```typescript
import { CreateConversationSchema } from '@emlinh-ai/types';

async function createConversation(data: {
  title: string;
  userId: string;
  type?: 'chat' | 'assistant' | 'group';
}) {
  const conversationData = CreateConversationSchema.parse({
    title: data.title,
    userId: data.userId,
    status: 'active',
    type: data.type || 'chat',
    settings: {
      model: 'gpt-4',
      temperature: 0.7,
    },
  });
  
  return await db.conversations.create({
    ...conversationData,
    id: generateUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}
```

### Update Conversation Settings

```typescript
import { UpdateConversationSchema } from '@emlinh-ai/types';

async function updateConversationSettings(
  conversationId: string,
  settings: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
    systemPrompt?: string;
  }
) {
  const updates = UpdateConversationSchema.parse({
    settings: {
      ...settings,
    },
    updatedAt: new Date(),
  });
  
  return await db.conversations.update(conversationId, updates);
}
```

## Context Processing

### Tạo File Context

```typescript
import { CreateContextSchema } from '@emlinh-ai/types';

async function createFileContext(filePath: string, content: string) {
  const fileStats = await fs.stat(filePath);
  
  const contextData = CreateContextSchema.parse({
    source: 'file',
    dataType: 'text',
    content: content,
    metadata: {
      source: 'file',
      filePath: filePath,
      fileSize: fileStats.size,
      lastModified: fileStats.mtime,
    },
  });
  
  return await db.contexts.create({
    ...contextData,
    id: generateUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}
```

### Search Context

```typescript
import { ContextSearchQuerySchema } from '@emlinh-ai/types';

async function searchContext(query: {
  query: string;
  sources?: string[];
  limit?: number;
  minRelevance?: number;
}) {
  const searchQuery = ContextSearchQuerySchema.parse({
    query: query.query,
    sources: query.sources || ['file', 'web', 'database'],
    limit: query.limit || 10,
    minRelevance: query.minRelevance || 0.5,
  });
  
  return await contextSearchService.search(searchQuery);
}
```

## Session Management

### Tạo User Session

```typescript
import { CreateSessionSchema } from '@emlinh-ai/types';

async function createUserSession(data: {
  userId: string;
  userAgent?: string;
  ipAddress?: string;
}) {
  const sessionData = CreateSessionSchema.parse({
    userId: data.userId,
    status: 'active',
    metadata: {
      userAgent: data.userAgent,
      ipAddress: data.ipAddress,
      lastActivity: new Date(),
    },
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  });
  
  return await db.sessions.create({
    ...sessionData,
    id: generateUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}
```

## Error Handling

### Validation Error Handling

```typescript
import { z } from 'zod';
import { UserSchema } from '@emlinh-ai/types';

function handleUserValidation(userData: unknown) {
  try {
    const user = UserSchema.parse(userData);
    return { success: true, data: user };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      };
    }
    throw error;
  }
}
```

### Safe Parsing

```typescript
import { CreateUserSchema } from '@emlinh-ai/types';

function safeCreateUser(userData: unknown) {
  const result = CreateUserSchema.safeParse(userData);
  
  if (!result.success) {
    console.error('Validation failed:', result.error.errors);
    return null;
  }
  
  return result.data;
}
```

## API Integration

### Express.js Middleware

```typescript
import { Request, Response, NextFunction } from 'express';
import { CreateUserSchema } from '@emlinh-ai/types';

function validateCreateUser(req: Request, res: Response, next: NextFunction) {
  try {
    req.body = CreateUserSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors,
      });
    }
    next(error);
  }
}

// Usage
app.post('/users', validateCreateUser, async (req, res) => {
  const user = await createUser(req.body);
  res.json(user);
});
```

### Next.js API Route

```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import { CreateMessageSchema } from '@emlinh-ai/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const messageData = CreateMessageSchema.parse(req.body);
    const message = await createMessage(messageData);
    res.status(201).json(message);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Invalid request data',
        details: error.errors,
      });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}
```