# 示例

## 概述

本文档提供了在各种场景中如何使用 `@emlinh-ai/types` 的实际示例。

## 用户管理

### 创建新用户

```typescript
import { CreateUserSchema, type User } from '@emlinh-ai/types';

async function createUser(userData: unknown): Promise<User> {
  // 验证输入数据
  const validatedData = CreateUserSchema.parse(userData);
  
  // 使用验证后的数据创建用户
  const newUser: User = {
    ...validatedData,
    id: generateUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  // 保存到数据库
  await saveUserToDatabase(newUser);
  
  return newUser;
}

// 使用方法
const userData = {
  email: 'john@example.com',
  name: 'John Doe',
  role: 'user',
  preferences: {
    theme: 'dark',
    language: 'zh',
    notifications: true,
  },
};

const user = await createUser(userData);
```

### 更新用户

```typescript
import { UpdateUserSchema, UserSchema } from '@emlinh-ai/types';

async function updateUser(userId: string, updateData: unknown): Promise<User> {
  // 验证更新数据
  const validatedUpdate = UpdateUserSchema.parse(updateData);
  
  // 获取当前用户
  const currentUser = await getUserFromDatabase(userId);
  
  // 合并更改
  const updatedUser: User = {
    ...currentUser,
    ...validatedUpdate,
    updatedAt: new Date(),
  };
  
  // 验证最终用户对象
  const validUser = UserSchema.parse(updatedUser);
  
  // 保存到数据库
  await saveUserToDatabase(validUser);
  
  return validUser;
}
```

## 消息处理

### 创建文本消息

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
  
  // 验证消息数据
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

### 创建图片消息

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

### 创建代码消息

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

## 对话管理

### 创建新对话

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

### 更新对话

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

## 上下文管理

### 从文件创建上下文

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

### 从网络创建上下文

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
  
  // 如果提供了搜索查询，则验证
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

## 会话管理

### 创建新会话

```typescript
import { CreateSessionSchema } from '@emlinh-ai/types';

async function createSession(userId: string): Promise<Session> {
  const sessionData = {
    userId,
    status: 'active' as const,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24小时
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

## 验证示例

### 验证用户输入

```typescript
import { UserSchema } from '@emlinh-ai/types';

function validateUserInput(input: unknown): boolean {
  try {
    UserSchema.parse(input);
    return true;
  } catch (error) {
    console.error('验证失败:', error);
    return false;
  }
}
```

### 自定义错误处理验证

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
      errors: [{ field: 'unknown', message: '验证失败' }],
    };
  }
}
```

### 验证数组数据

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

## 实用函数

### 生成UUID

```typescript
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
```

### 类型守卫

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