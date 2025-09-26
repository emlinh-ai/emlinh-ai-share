# API 参考

## 概述

`@emlinh-ai/types` 为 AI 应用程序提供了全面的 TypeScript 类型和 Zod 模式。本文档详细介绍了所有可用的类型、模式及其用法。

## 核心类型

### User

表示系统中的用户。

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

表示对话中的消息。

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

不同消息内容类型的联合类型：

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

表示用户之间的对话。

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

表示 AI 处理的上下文信息。

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

表示用户会话。

```typescript
interface Session {
  id: string;
  userId: string;
  status: 'active' | 'expired' | 'terminated';
  expiresAt: Date;
  createdAt: Date;
}
```

## Zod 模式

所有类型都有相应的 Zod 模式用于验证：

### User 模式

```typescript
import { 
  UserSchema,
  CreateUserSchema,
  UpdateUserSchema,
  UserPreferencesSchema 
} from '@emlinh-ai/types';

// 验证完整的用户对象
const user = UserSchema.parse(userData);

// 验证用户创建数据
const createData = CreateUserSchema.parse(inputData);

// 验证用户更新数据
const updateData = UpdateUserSchema.parse(updateInput);

// 验证用户偏好设置
const preferences = UserPreferencesSchema.parse(prefsData);
```

### Message 模式

```typescript
import { 
  MessageSchema,
  CreateMessageSchema,
  UpdateMessageSchema,
  MessageContentSchema 
} from '@emlinh-ai/types';

// 验证完整的消息
const message = MessageSchema.parse(messageData);

// 验证消息创建数据
const createData = CreateMessageSchema.parse(inputData);

// 验证消息内容
const content = MessageContentSchema.parse(contentData);
```

### Conversation 模式

```typescript
import { 
  ConversationSchema,
  CreateConversationSchema,
  UpdateConversationSchema 
} from '@emlinh-ai/types';

// 验证完整的对话
const conversation = ConversationSchema.parse(conversationData);

// 验证对话创建数据
const createData = CreateConversationSchema.parse(inputData);
```

### Context 模式

```typescript
import { 
  ContextSchema,
  CreateContextSchema,
  ContextSearchQuerySchema 
} from '@emlinh-ai/types';

// 验证完整的上下文
const context = ContextSchema.parse(contextData);

// 验证上下文创建数据
const createData = CreateContextSchema.parse(inputData);

// 验证搜索查询
const query = ContextSearchQuerySchema.parse({ query: '搜索词' });
```

### Session 模式

```typescript
import { 
  SessionSchema,
  CreateSessionSchema,
  UpdateSessionSchema 
} from '@emlinh-ai/types';

// 验证完整的会话
const session = SessionSchema.parse(sessionData);

// 验证会话创建数据
const createData = CreateSessionSchema.parse(inputData);
```

## 验证示例

### 基本验证

```typescript
import { UserSchema } from '@emlinh-ai/types';

try {
  const validUser = UserSchema.parse(userData);
  console.log('用户有效:', validUser);
} catch (error) {
  console.error('验证失败:', error);
}
```

### 安全解析

```typescript
import { CreateUserSchema } from '@emlinh-ai/types';

const result = CreateUserSchema.safeParse(userData);

if (result.success) {
  console.log('有效数据:', result.data);
} else {
  console.error('验证错误:', result.error.errors);
}
```

### 部分验证

```typescript
import { UpdateUserSchema } from '@emlinh-ai/types';

// 只验证提供的字段
const partialUpdate = UpdateUserSchema.parse({
  name: '新名称',
  // 其他字段是可选的
});
```

## 类型守卫

使用类型守卫在运行时缩小类型：

```typescript
import { Message } from '@emlinh-ai/types';

function isTextMessage(message: Message): message is Message & { content: { type: 'text' } } {
  return message.content.type === 'text';
}

function isImageMessage(message: Message): message is Message & { content: { type: 'image' } } {
  return message.content.type === 'image';
}

// 使用方法
if (isTextMessage(message)) {
  // TypeScript 知道 message.content.text 存在
  console.log(message.content.text);
}
```

## 实用类型

### 提取特定内容类型

```typescript
import { MessageContent } from '@emlinh-ai/types';

type TextMessage = Extract<MessageContent, { type: 'text' }>;
type ImageMessage = Extract<MessageContent, { type: 'image' }>;
type CodeMessage = Extract<MessageContent, { type: 'code' }>;
```

### 创建类型数组

```typescript
import { User, Message } from '@emlinh-ai/types';

type UserList = User[];
type MessageList = Message[];
```

## 错误处理

### Zod 错误结构

```typescript
import { ZodError } from 'zod';

try {
  UserSchema.parse(invalidData);
} catch (error) {
  if (error instanceof ZodError) {
    error.errors.forEach(err => {
      console.log(`字段: ${err.path.join('.')}`);
      console.log(`错误: ${err.message}`);
      console.log(`代码: ${err.code}`);
    });
  }
}
```

### 自定义错误消息

```typescript
import { z } from 'zod';

const CustomUserSchema = z.object({
  email: z.string().email('请提供有效的电子邮件地址'),
  name: z.string().min(2, '姓名至少需要2个字符'),
  role: z.enum(['admin', 'user', 'moderator'], {
    errorMap: () => ({ message: '角色必须是 admin、user 或 moderator' })
  })
});
```

## 最佳实践

### 1. 始终验证输入数据

```typescript
import { CreateUserSchema } from '@emlinh-ai/types';

async function createUser(input: unknown) {
  // 处理前始终验证
  const validatedData = CreateUserSchema.parse(input);
  
  // 现在可以安全地使用 validatedData
  return await saveUser(validatedData);
}
```

### 2. 使用类型守卫进行运行时检查

```typescript
import { Message } from '@emlinh-ai/types';

function processMessage(message: Message) {
  if (isTextMessage(message)) {
    return processTextMessage(message.content.text);
  } else if (isImageMessage(message)) {
    return processImageMessage(message.content.url);
  }
  // 处理其他类型...
}
```

### 3. 利用 TypeScript 的类型系统

```typescript
import { User, UserRole } from '@emlinh-ai/types';

function getUsersByRole(users: User[], role: UserRole): User[] {
  return users.filter(user => user.role === role);
}

// TypeScript 将确保角色有效
const admins = getUsersByRole(users, 'admin'); // ✅ 有效
const invalid = getUsersByRole(users, 'invalid'); // ❌ TypeScript 错误
```

### 4. 优雅地处理验证错误

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