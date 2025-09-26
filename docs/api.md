# API Reference

## User Types

### User

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  preferences: UserPreferences;
  profile: UserProfile;
  createdAt: Date;
  updatedAt: Date;
  lastActiveAt?: Date;
}
```

### UserRole

```typescript
type UserRole = 'admin' | 'user' | 'moderator';
```

### UserPreferences

```typescript
interface UserPreferences {
  language: string; // default: 'vi'
  theme: string; // default: 'light'
  notifications: boolean; // default: true
  autoSave: boolean; // default: true
}
```

### UserProfile

```typescript
interface UserProfile {
  bio?: string;
  location?: string;
  website?: string;
  company?: string;
  socialLinks?: Record<string, string>;
}
```

### CreateUser

Omits auto-generated fields: `id`, `createdAt`, `updatedAt`, `lastActiveAt`

### UpdateUser

Partial update, omits: `id`, `createdAt`

## Message Types

### Message

```typescript
interface Message {
  id: string;
  conversationId: string;
  userId: string;
  role: 'user' | 'assistant' | 'system';
  content: MessageContent;
  status: MessageStatus;
  metadata: MessageMetadata;
  createdAt: Date;
  updatedAt: Date;
}
```

### MessageContent

Discriminated union based on `type`:

```typescript
type MessageContent = 
  | { type: 'text'; text: string }
  | { type: 'image'; imageUrl: string; alt?: string }
  | { type: 'file'; attachment: FileAttachment }
  | { type: 'code'; code: CodeBlock }
  | { type: 'system'; message: string; action?: string };
```

### MessageStatus

```typescript
type MessageStatus = 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
```

### FileAttachment

```typescript
interface FileAttachment {
  filename: string;
  url: string;
  size: number;
  mimeType: string;
}
```

### CodeBlock

```typescript
interface CodeBlock {
  language: string;
  code: string;
  filename?: string;
}
```

### MessageMetadata

```typescript
interface MessageMetadata {
  edited: boolean; // default: false
  editedAt?: Date;
  mentions: string[]; // default: []
  reactions: Record<string, string[]>; // default: {}
  parentMessageId?: string;
  threadId?: string;
}
```

## Conversation Types

### Conversation

```typescript
interface Conversation {
  id: string;
  title: string;
  description?: string;
  userId: string;
  status: ConversationStatus;
  type: ConversationType;
  settings: ConversationSettings;
  metadata: ConversationMetadata;
  createdAt: Date;
  updatedAt: Date;
}
```

### ConversationStatus

```typescript
type ConversationStatus = 'active' | 'archived' | 'deleted';
```

### ConversationType

```typescript
type ConversationType = 'chat' | 'assistant' | 'group';
```

### ConversationSettings

```typescript
interface ConversationSettings {
  model: string; // default: 'gpt-4'
  temperature: number; // default: 0.7, range: 0-2
  maxTokens: number; // default: 2048, range: 1-8192
  systemPrompt?: string;
  autoSave: boolean; // default: true
  notifications: boolean; // default: true
}
```

### ConversationMetadata

```typescript
interface ConversationMetadata {
  tags: string[]; // default: []
  category?: string;
  priority: number; // default: 0, range: 0-10
  isStarred: boolean; // default: false
  isPinned: boolean; // default: false
  messageCount: number; // default: 0
  lastMessageAt?: Date;
  totalTokens: number; // default: 0
}
```

## Context Types

### Context

```typescript
interface Context {
  id: string;
  source: ContextSource;
  dataType: ContextDataType;
  content: string;
  metadata: ContextMetadata;
  chunks?: ContextChunk[];
  relevanceScore?: number; // range: 0-1
  createdAt: Date;
  updatedAt: Date;
}
```

### ContextSource

```typescript
type ContextSource = 'file' | 'web' | 'database' | 'api' | 'user_input' | 'system';
```

### ContextDataType

```typescript
type ContextDataType = 'text' | 'code' | 'image' | 'document' | 'structured';
```

### ContextMetadata

Discriminated union based on `source`:

```typescript
type ContextMetadata = 
  | { source: 'file'; filePath: string; fileSize: number; lastModified: Date }
  | { source: 'web'; url: string; title?: string; domain: string; scrapedAt: Date }
  | { source: 'database'; table: string; query: string; executedAt: Date }
  | { source: 'api'; endpoint: string; method: string; responseTime: number; calledAt: Date }
  | { source: 'user_input'; inputMethod: string; sessionId: string; timestamp: Date }
  | { source: 'system'; component: string; version: string; generatedAt: Date };
```

### ContextChunk

```typescript
interface ContextChunk {
  id: string;
  content: string;
  startIndex: number;
  endIndex: number;
  relevanceScore?: number; // range: 0-1
}
```

### ContextPayload

```typescript
interface ContextPayload {
  query: string;
  sources?: ContextSource[]; // default: all sources
  dataTypes?: ContextDataType[]; // default: all types
  limit?: number; // default: 10, range: 1-100
  minRelevance?: number; // default: 0.5, range: 0-1
  includeChunks?: boolean; // default: false
}
```

## Session Types

### Session

```typescript
interface Session {
  id: string;
  userId: string;
  status: SessionStatus;
  metadata: SessionMetadata;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
}
```

### SessionStatus

```typescript
type SessionStatus = 'active' | 'expired' | 'terminated';
```

### SessionMetadata

```typescript
interface SessionMetadata {
  userAgent?: string;
  ipAddress?: string;
  location?: string;
  device?: string;
  lastActivity: Date;
}
```

## Zod Schemas

Tất cả types đều có corresponding Zod schemas:

- `UserSchema`, `CreateUserSchema`, `UpdateUserSchema`
- `MessageSchema`, `CreateMessageSchema`, `UpdateMessageSchema`  
- `ConversationSchema`, `CreateConversationSchema`, `UpdateConversationSchema`
- `ContextSchema`, `ContextPayloadSchema`, `ContextSearchQuerySchema`
- `SessionSchema`, `CreateSessionSchema`, `UpdateSessionSchema`

### Schema Usage

```typescript
import { UserSchema } from '@emlinh-ai/types';

// Parse và validate
const user = UserSchema.parse(userData);

// Safe parse (không throw error)
const result = UserSchema.safeParse(userData);
if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error);
}
```